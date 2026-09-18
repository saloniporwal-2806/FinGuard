import { analyzeMessage } from "./messageAnalyzer.js";
import { analyzeLink } from "./linkAnalyzer.js";
import { analyzeTransaction } from "./transactionAnalyzer.js";

/**
 * AI Risk Engine: Centralized heuristic decision-support engine.
 * Consolidates multi-vector inputs into a single, transparent, explainable risk score (0-100).
 */
export function evaluateRisk({ message = "", url = "", transaction = null }) {
  const msgResult = analyzeMessage(message);
  const linkResult = analyzeLink(url);
  const txResult = transaction && transaction.amount ? analyzeTransaction(transaction) : null;

  // Collect all detected atomic signals
  const allSignals = [];

  if (msgResult.hasContent) {
    allSignals.push(...msgResult.signals);
  }
  if (linkResult.hasContent) {
    allSignals.push(...linkResult.signals);
  }
  if (txResult && txResult.signals) {
    allSignals.push(...txResult.signals);
  }

  const isOnlyLink = Boolean(url && !message && !transaction);
  const isOnlyMsg = Boolean(message && !url && !transaction);

  // Calculate raw sum of all contributions
  const rawSum = allSignals.reduce((acc, s) => acc + s.contribution, 0);

  // If no signals were triggered at all, assign a clean baseline score
  let finalScore = 0;
  if (linkResult.isVerifiedOfficial) {
    finalScore = 5;
  } else if (allSignals.length === 0) {
    // If a clean transaction was analyzed, it gets 12 (Low Risk)
    if (txResult && txResult.isValid) {
      finalScore = 12;
    } else {
      finalScore = 5;
    }
  } else {
    // Normalization / Capping at 100
    finalScore = Math.min(100, Math.max(10, rawSum));
  }

  // Determine Risk Level
  let level = "LOW RISK";
  let levelClass = "low"; // 'low' | 'medium' | 'high'
  let primaryRecommendation = "";
  let actionTitle = "";

  if (linkResult.isVerifiedOfficial) {
    level = "LOW RISK";
    levelClass = "low";
    actionTitle = "OFFICIAL VERIFIED DOMAIN";
    primaryRecommendation =
      "This link belongs to an authenticated, legitimate organization. Still, remember that official companies never ask for your UPI PIN or account passwords.";
  } else if (finalScore >= 70) {
    level = "HIGH RISK";
    levelClass = "high";
    actionTitle = isOnlyLink ? "DANGEROUS PHISHING LINK" : "PAUSE & VERIFY";
    primaryRecommendation = isOnlyLink
      ? "Do NOT open this website or enter any personal information. It displays strong indicators typical of phishing, fake login pages, or scam campaigns."
      : "Do not proceed until the sender, link, and recipient are verified through an official channel. Never share your OTP, UPI PIN, or banking passwords.";
  } else if (finalScore >= 40) {
    level = "MEDIUM RISK";
    levelClass = "medium";
    actionTitle = isOnlyLink ? "SUSPICIOUS UNVERIFIED LINK" : "VERIFY BEFORE PROCEEDING";
    primaryRecommendation = isOnlyLink
      ? "Exercise high caution with this website. It uses unusual domain extensions or suspicious lure keywords. Never enter passwords or OTPs."
      : "Verify the recipient and link before proceeding. Double-check recent messages and confirm the recipient's phone number or UPI handle.";
  } else {
    level = "LOW RISK";
    levelClass = "low";
    actionTitle = isOnlyLink ? "STANDARD WEB VIGILANCE" : "STANDARD VIGILANCE";
    primaryRecommendation = isOnlyLink
      ? "No obvious phishing markers detected, but always ensure the URL in your browser's address bar matches the exact official service before logging in."
      : "No major warning detected, but continue normal safety checks. Verify the amount and recipient name on the bank screen before authorization.";
  }

  // Generate Explainable "Why is this risky?" bullet points
  const explainableReasons = [];
  if (linkResult.isVerifiedOfficial) {
    explainableReasons.push({
      title: "Authenticated Official Registry",
      description: `The domain '${linkResult.hostname}' matches verified official registrar records for a trusted service.`,
      points: 5,
      severity: "low",
    });
  } else if (allSignals.length > 0) {
    allSignals.forEach((sig) => {
      explainableReasons.push({
        title: sig.category,
        description: sig.description,
        points: sig.contribution,
        severity: sig.severity,
      });
    });
  } else {
    explainableReasons.push({
      title: "Routine Baseline Match",
      description: "Details align with typical transaction amounts, verified recipients, and normal daytime hours.",
      points: finalScore,
      severity: "low",
    });
  }

  // Generate consistent mathematical breakdown so numbers add up cleanly
  // If rawSum > 100, normalize individual line items proportionally to ensure the sum equals finalScore
  let breakdown = [];
  if (allSignals.length > 0) {
    if (rawSum > 100) {
      let allocated = 0;
      breakdown = allSignals.map((sig, idx) => {
        if (idx === allSignals.length - 1) {
          return {
            name: sig.category,
            points: Math.max(1, finalScore - allocated),
          };
        }
        const scaled = Math.round((sig.contribution / rawSum) * finalScore);
        allocated += scaled;
        return {
          name: sig.category,
          points: scaled,
        };
      });
    } else {
      breakdown = allSignals.map((sig) => ({
        name: sig.category,
        points: sig.contribution,
      }));
    }
  } else {
    breakdown = [{ name: "Baseline Safety Assessment", points: finalScore }];
  }

  // Determine Related Literacy Topic
  let relatedTopicId = "scam-awareness";
  if (allSignals.some((s) => s.relatedTopic === "upi-safety")) {
    relatedTopicId = "upi-safety";
  } else if (allSignals.some((s) => s.relatedTopic === "link-safety")) {
    relatedTopicId = "link-safety";
  } else if (allSignals.some((s) => s.relatedTopic === "investment-awareness")) {
    relatedTopicId = "investment-awareness";
  } else if (allSignals.some((s) => s.relatedTopic === "loan-awareness")) {
    relatedTopicId = "loan-awareness";
  } else if (allSignals.some((s) => s.relatedTopic === "budgeting")) {
    relatedTopicId = "budgeting";
  } else if (allSignals.some((s) => s.relatedTopic === "privacy-credentials")) {
    relatedTopicId = "privacy-credentials";
  } else if (allSignals.some((s) => s.relatedTopic === "digital-payment-safety")) {
    relatedTopicId = "digital-payment-safety";
  }

  return {
    id: "scan_" + Date.now(),
    score: finalScore,
    level,
    levelClass,
    factorsCount: allSignals.length,
    actionTitle,
    recommendation: primaryRecommendation,
    reasons: explainableReasons,
    breakdown,
    totalSum: breakdown.reduce((a, b) => a + b.points, 0),
    relatedTopicId,
    timestamp: new Date().toISOString(),
    inputs: {
      message: message ? message.substring(0, 100) : "",
      url: url || "",
      transaction: txResult
        ? {
            amount: txResult.amount,
            recipient: txResult.recipient,
            category: txResult.category,
          }
        : null,
    },
  };
}
