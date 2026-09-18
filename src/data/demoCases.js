/**
 * Predefined Demo Cases for hackathon presentation and quick judge evaluation.
 * Case 1: SAFE (₹500, Known recipient, 6:30 PM) -> LOW RISK
 * Case 2: MEDIUM (₹10,000, New recipient, 7:00 PM) -> MEDIUM RISK
 * Case 3: HIGH (Scam message + ₹35,000 + 2:30 AM + New recipient) -> HIGH RISK
 */
export const DEMO_CASES = [
  {
    id: "case-safe",
    name: "Case 1: Safe Payment",
    badge: "Low Risk Demo",
    badgeColor: "green",
    description: "₹500 payment to Mom at 6:30 PM (within normal baseline)",
    input: {
      message: "",
      url: "",
      transaction: {
        amount: "500",
        recipient: "Mom",
        isNewRecipient: false,
        time: "18:30",
        category: "Transfer",
        locationAnomaly: false,
      },
    },
    expectedRisk: "LOW RISK",
    expectedScoreRange: "0 - 25",
    expectedRecommendation: "Continue with normal safety checks.",
  },
  {
    id: "case-medium",
    name: "Case 2: Medium Risk",
    badge: "Medium Risk Demo",
    badgeColor: "amber",
    description: "₹10,000 payment to unfamiliar recipient at 7:00 PM",
    input: {
      message: "Please send ₹10,000 for the wholesale inventory order by this evening to reserve the stock.",
      url: "https://secure-pay.merchant-checkout.co",
      transaction: {
        amount: "10000",
        recipient: "Wholesale Inventory Hub",
        isNewRecipient: true,
        time: "19:00",
        category: "Shopping",
        locationAnomaly: false,
      },
    },
    expectedRisk: "MEDIUM RISK",
    expectedScoreRange: "40 - 69",
    expectedRecommendation: "Verify the recipient before proceeding.",
  },
  {
    id: "case-high",
    name: "Case 3: High Risk Attack",
    badge: "High Risk Demo",
    badgeColor: "red",
    description: "Fake reward scam + ₹35,000 at 2:30 AM to new recipient",
    input: {
      message: "Congratulations! You won ₹50,000. Pay ₹999 immediately to claim your reward. Click the link.",
      url: "http://win-50k-reward-claim.xyz/verify-otp",
      transaction: {
        amount: "35000",
        recipient: "Prize Desk Global",
        isNewRecipient: true,
        time: "02:30",
        category: "Transfer",
        locationAnomaly: true,
      },
    },
    expectedRisk: "HIGH RISK",
    expectedScoreRange: "75 - 100",
    expectedRecommendation: "PAUSE & VERIFY. Do not proceed until the sender, link and recipient are verified through an official channel.",
  },
];
