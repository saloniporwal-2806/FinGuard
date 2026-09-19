import { BEHAVIOUR_BASELINE, KNOWN_RECIPIENTS } from "../data/sampleTransactions.js";

const SUSPICIOUS_UPI_KEYWORDS = [
  "lottery",
  "reward",
  "prize",
  "kyc",
  "refund",
  "cashback",
  "bonus",
  "helpdesk",
  "support",
  "claim",
  "urgent",
  "verification",
  "winner",
  "customer-care",
  "free-money",
  "airdrop",
];

/**
 * Behaviour Analyzer: Compares a pending transaction against user's historical profile.
 * Flags:
 * - Amount deviations (granular scaling from ₹100 up to ₹50,000+)
 * - Temporal anomalies (night transactions outside 10:00 - 21:00, e.g. 2:30 AM)
 * - Recipient familiarity (brand new / unverified recipient)
 * - Suspicious UPI handles, VPA patterns & keywords
 * - Geolocation / device location anomaly
 */
export function analyzeBehaviour(transaction) {
  if (!transaction || transaction.amount === undefined || transaction.amount === null) {
    return {
      riskScore: 0,
      signals: [],
      anomalies: [],
      hasContent: false,
    };
  }

  const amount = parseFloat(transaction.amount) || 0;
  const recipient = (transaction.recipient || "").trim();
  const recipientLower = recipient.toLowerCase();

  const isKnown = KNOWN_RECIPIENTS.some(
    (k) => k.toLowerCase() === recipientLower || recipientLower.includes(k.toLowerCase())
  );

  const isNewRecipient =
    transaction.isNewRecipient !== undefined ? transaction.isNewRecipient : !isKnown;

  const timeStr = transaction.time || "12:00"; // HH:mm format
  const locationAnomaly = Boolean(transaction.locationAnomaly);

  const signals = [];
  const anomalies = [];

  // 1. Amount Anomaly Check (Granular Multi-Tier Scaling)
  if (amount > 35000) {
    signals.push({
      category: "Critical Amount Surge",
      description: `Amount (₹${amount.toLocaleString("en-IN")}) is 17x+ higher than your customary maximum threshold (₹2,000)`,
      contribution: 45,
      severity: "critical",
      relatedTopic: "budgeting",
    });
    anomalies.push(`Extreme Amount (₹${amount.toLocaleString("en-IN")} vs normal max ₹2,000)`);
  } else if (amount > 15000) {
    signals.push({
      category: "Significant Amount Spike",
      description: `Amount (₹${amount.toLocaleString("en-IN")}) is 8x-17x above your typical spending benchmark (₹2,000)`,
      contribution: 35,
      severity: "high",
      relatedTopic: "budgeting",
    });
    anomalies.push(`High Amount Spike (₹${amount.toLocaleString("en-IN")})`);
  } else if (amount > 7500) {
    signals.push({
      category: "Elevated Amount Anomaly",
      description: `Amount (₹${amount.toLocaleString("en-IN")}) is 4x-7x above your normal spending baseline (₹2,000)`,
      contribution: 25,
      severity: "high",
      relatedTopic: "budgeting",
    });
    anomalies.push(`Elevated Amount (₹${amount.toLocaleString("en-IN")})`);
  } else if (amount > 2500) {
    signals.push({
      category: "Moderate Amount Deviation",
      description: `Amount (₹${amount.toLocaleString("en-IN")}) moderately exceeds customary spending envelope (₹2,000)`,
      contribution: 15,
      severity: "medium",
      relatedTopic: "budgeting",
    });
    anomalies.push(`Moderate deviation above ₹2,000`);
  } else if (amount > BEHAVIOUR_BASELINE.typicalMaxAmount) {
    signals.push({
      category: "Above Average Amount",
      description: `Amount (₹${amount.toLocaleString("en-IN")}) is slightly above your ₹2,000 standard benchmark`,
      contribution: 5,
      severity: "low",
      relatedTopic: "budgeting",
    });
    anomalies.push(`Slight deviation above ₹2,000`);
  }

  // 2. Suspicious UPI Recipient / Keywords Check
  const foundSuspiciousKeyword = SUSPICIOUS_UPI_KEYWORDS.find((kw) =>
    recipientLower.includes(kw)
  );

  if (foundSuspiciousKeyword) {
    signals.push({
      category: "High-Risk UPI Keyword",
      description: `Recipient identifier contains high-risk social engineering keyword '${foundSuspiciousKeyword}'`,
      contribution: 30,
      severity: "critical",
      relatedTopic: "upi-safety",
    });
    anomalies.push(`Suspicious keyword in UPI address: "${foundSuspiciousKeyword}"`);
  }

  // 3. Recipient Anomaly Check
  if (isNewRecipient) {
    signals.push({
      category: "Unfamiliar Recipient",
      description: `Recipient "${recipient || "Unknown"}" is not in your verified contacts or frequent transaction history`,
      contribution: 20,
      severity: "medium",
      relatedTopic: "upi-safety",
    });
    anomalies.push(`First-time recipient: ${recipient || "Unsaved entity"}`);
  }

  // 4. Time Anomaly Check
  // Normal activity hours: 10:00 to 21:00
  const [hourStr] = timeStr.split(":");
  const hour = parseInt(hourStr, 10) || 12;

  // Night hours: 23:00 (11 PM) to 06:00 (6 AM) -> High Risk
  // Off-peak hours: 06:00 to 09:59 or 21:01 to 22:59 -> Mild note
  if (hour >= 23 || hour < 6) {
    signals.push({
      category: "Unusual Time (Late Night)",
      description: `Transaction initiated at ${timeStr} (outside normal 10 AM - 9 PM window when alertness is lower)`,
      contribution: 20,
      severity: "high",
      relatedTopic: "digital-payment-safety",
    });
    anomalies.push(`High vulnerability time window (${timeStr})`);
  } else if (hour < 10 || hour > 21) {
    signals.push({
      category: "Off-Hours Activity",
      description: `Activity at ${timeStr} is slightly outside customary daytime envelope (10:00 - 21:00)`,
      contribution: 5,
      severity: "low",
      relatedTopic: "digital-payment-safety",
    });
    anomalies.push(`Off-peak hour (${timeStr})`);
  }

  // 5. Location Anomaly Check
  if (locationAnomaly) {
    signals.push({
      category: "Geographic/Device Shift",
      description: "Payment originated from an unfamiliar IP subnet or unverified city location",
      contribution: 15,
      severity: "high",
      relatedTopic: "privacy-credentials",
    });
    anomalies.push("Geographic location anomaly");
  }

  // 6. Compound Multiplier: High-Value + Unfamiliar Recipient
  if (amount > 20000 && isNewRecipient) {
    signals.push({
      category: "High-Stake Unverified Outflow",
      description: `Large transfer of ₹${amount.toLocaleString("en-IN")} directed to an unverified new entity`,
      contribution: 10,
      severity: "high",
      relatedTopic: "upi-safety",
    });
    anomalies.push("Compounding risk: High amount + Unverified recipient");
  }

  const rawSum = signals.reduce((acc, s) => acc + s.contribution, 0);
  const riskScore = Math.min(100, rawSum);

  return {
    riskScore,
    signals,
    anomalies,
    hasContent: true,
    summary:
      anomalies.length === 0
        ? "Transaction fits cleanly within historical baseline parameters."
        : `${anomalies.length} behavioral anomaly signal(s) identified.`,
  };
}
