/**
 * Message Analyzer: Inspects message text for social engineering, urgency,
 * credential harvesting, fake rewards, KYC pressure, and advance-fee patterns.
 */
export function analyzeMessage(text) {
  if (!text || typeof text !== "string" || text.trim().length === 0) {
    return {
      riskScore: 0,
      signals: [],
      matchedKeywords: [],
      detectedPatterns: [],
      hasContent: false,
    };
  }

  const raw = text.trim();
  const lower = raw.toLowerCase();
  const signals = [];
  const matched = [];

  // Pattern 1: Fake Reward / Lottery / Prize
  const rewardPatterns = [
    /\b(congratulations|congrats|won|winner|lucky draw|lottery|jackpot|cashback claimed|prize)\b/i,
    /₹\s*([0-9,]+)\s*(reward|won|prize|cashback)/i,
    /(won|win)\s*₹\s*([0-9,]+)/i,
  ];
  const hasReward = rewardPatterns.some((rgx) => rgx.test(lower));
  if (hasReward) {
    signals.push({
      category: "Fake Reward Pattern",
      description: "Claims lottery, cash reward, or unearned prize winnings",
      contribution: 20,
      severity: "high",
      relatedTopic: "scam-awareness",
    });
    matched.push("Prize/Lottery claim");
  }

  // Pattern 2: Advance-Fee Scam ("Pay ₹... to receive/claim")
  const advanceFeePattern =
    /(pay|transfer|deposit|send)\s*(₹|rs\.?|inr)?\s*([0-9,]+).*(claim|release|unlock|receive|get)/i;
  const payToReceive =
    advanceFeePattern.test(lower) ||
    (lower.includes("pay") && lower.includes("claim") && (lower.includes("₹") || lower.includes("rs")));
  if (payToReceive) {
    signals.push({
      category: "Advance Fee Demand",
      description: "Demands upfront payment or 'processing fee' to release funds/rewards",
      contribution: 25,
      severity: "critical",
      relatedTopic: "scam-awareness",
    });
    matched.push("Pay-to-claim demand");
  }

  // Pattern 3: Extreme Urgency & Fear Pressure
  const urgencyWords = [
    "immediately",
    "act now",
    "within 24 hours",
    "within 10 minutes",
    "urgent",
    "urgently",
    "account will be blocked",
    "sim will be deactivated",
    "suspended",
    "last warning",
    "final notice",
    "immediately blocked",
    "power cut",
    "electricity disconnected",
  ];
  const matchedUrgency = urgencyWords.filter((w) => lower.includes(w));
  if (matchedUrgency.length > 0) {
    signals.push({
      category: "Urgency / Threat Tactics",
      description: `Artificial panic triggered via urgent deadline: "${matchedUrgency[0]}"`,
      contribution: 20,
      severity: "high",
      relatedTopic: "scam-awareness",
    });
    matched.push(`Urgency: ${matchedUrgency[0]}`);
  }

  // Pattern 4: Credential & PIN/OTP Harvesting
  const credentialTerms = [
    "otp",
    "upi pin",
    "mpin",
    "pin code",
    "cvv",
    "card password",
    "netbanking password",
    "share otp",
    "send otp",
    "verify pin",
  ];
  const matchedCreds = credentialTerms.filter((term) => lower.includes(term));
  if (matchedCreds.length > 0) {
    signals.push({
      category: "Credential Solicitation",
      description: `Solicits confidential security secrets (${matchedCreds.join(", ")})`,
      contribution: 30,
      severity: "critical",
      relatedTopic: "upi-safety",
    });
    matched.push(`PIN/OTP request: ${matchedCreds[0]}`);
  }

  // Pattern 5: KYC / Account Block Trap
  const kycTerms = [
    "kyc update",
    "update your kyc",
    "kyc expired",
    "pan card link",
    "pan not updated",
    "aadhaar link",
    "re-verify kyc",
    "ebanking kyc",
  ];
  const matchedKYC = kycTerms.filter((term) => lower.includes(term));
  if (matchedKYC.length > 0) {
    signals.push({
      category: "Fake KYC Pretext",
      description: "Uses deceptive KYC expiration claim to harvest sensitive data",
      contribution: 25,
      severity: "high",
      relatedTopic: "privacy-credentials",
    });
    matched.push("Fake KYC prompt");
  }

  // Pattern 6: Suspicious shortened or non-standard link in message
  const linkMatches = raw.match(
    /(https?:\/\/[^\s]+|(?:bit\.ly|tinyurl\.com|t\.co|is\.gd|wa\.me|goo\.gl)\/[^\s]+|[a-z0-9-]+\.(?:xyz|top|tk|click|buzz|club|online|site)\/[^\s]*)/gi
  );
  if (linkMatches && linkMatches.length > 0) {
    signals.push({
      category: "Embedded Suspicious Link",
      description: `Message includes link (${linkMatches[0].substring(0, 30)}...) designed to redirect to unverified portal`,
      contribution: 20,
      severity: "high",
      relatedTopic: "link-safety",
    });
    matched.push("Embedded link");
  }

  // Pattern 7: Remote Access / APK installation prompt
  const appInstallWords = ["anydesk", "teamviewer", "quicksupport", "rustdesk", ".apk", "download app"];
  const matchedRemote = appInstallWords.filter((w) => lower.includes(w));
  if (matchedRemote.length > 0) {
    signals.push({
      category: "Remote Access / Malicious APK",
      description: `Urges installation of screen sharing or APK file (${matchedRemote[0]})`,
      contribution: 30,
      severity: "critical",
      relatedTopic: "loan-awareness",
    });
    matched.push(`Screen share/APK prompt: ${matchedRemote[0]}`);
  }

  // Calculate total raw message risk, capped at 100
  const rawSum = signals.reduce((acc, s) => acc + s.contribution, 0);
  const riskScore = Math.min(100, rawSum);

  return {
    riskScore,
    signals,
    matchedKeywords: matched,
    hasContent: true,
    summary:
      signals.length === 0
        ? "No common social engineering flags detected in message text."
        : `${signals.length} suspicious communication indicator(s) identified.`,
  };
}
