import { analyzeBehaviour } from "./behaviourAnalyzer.js";

/**
 * Transaction Analyzer: Validates and scores transaction-level parameters.
 */
export function analyzeTransaction(transaction) {
  if (!transaction) {
    return {
      isValid: false,
      error: "No transaction details provided",
      riskScore: 0,
      signals: [],
    };
  }

  const amount = parseFloat(transaction.amount);
  const recipient = (transaction.recipient || "").trim();
  const category = transaction.category || "Transfer";

  if (isNaN(amount) || amount <= 0) {
    return {
      isValid: false,
      error: "Please enter a valid positive transaction amount.",
      riskScore: 0,
      signals: [],
    };
  }

  if (!recipient) {
    return {
      isValid: false,
      error: "Recipient name or UPI ID is required.",
      riskScore: 0,
      signals: [],
    };
  }

  // Get behaviour analysis
  const behaviourResult = analyzeBehaviour(transaction);
  const signals = [...behaviourResult.signals];

  // Specific Category Risk checks
  if (category === "Investment" && amount > 5000) {
    signals.push({
      category: "Unverified Investment Outflow",
      description: "Direct peer transfers labeled as investments carry elevated risk of unregulated schemes",
      contribution: 15,
      severity: "high",
      relatedTopic: "investment-awareness",
    });
  }

  if (category === "Other" && transaction.isNewRecipient) {
    signals.push({
      category: "Uncategorized Recipient",
      description: "Payment purpose is unspecified for an unverified recipient",
      contribution: 10,
      severity: "medium",
      relatedTopic: "upi-safety",
    });
  }

  const rawSum = signals.reduce((acc, s) => acc + s.contribution, 0);
  const riskScore = Math.min(100, rawSum);

  return {
    isValid: true,
    amount,
    recipient,
    category,
    riskScore,
    signals,
    behaviour: behaviourResult,
    hasContent: true,
  };
}
