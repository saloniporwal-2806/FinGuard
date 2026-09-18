/**
 * Storage Service: Manages local persistence for scan history,
 * quiz completions, and dynamic dashboard safety score calculations.
 */

const STORAGE_KEYS = {
  SCANS: "fg_scans_history_v1",
  QUIZ_PROGRESS: "fg_quiz_progress_v1",
  SAFETY_SCORE: "fg_safety_score_v1",
};

// Default seed scans to give the app a populated, realistic feel on first launch
const INITIAL_SCANS = [
  {
    id: "seed_01",
    score: 88,
    level: "HIGH RISK",
    levelClass: "high",
    actionTitle: "PAUSE & VERIFY",
    recommendation: "Do not proceed until the sender and link are verified through an official channel.",
    reasons: [
      {
        title: "Fake Reward Pattern",
        description: "Claims ₹50,000 cash reward via urgent lottery message.",
        points: 25,
      },
      {
        title: "Advance Fee Demand",
        description: "Demands ₹999 payment before releasing alleged funds.",
        points: 25,
      },
      {
        title: "Unfamiliar Recipient",
        description: "Recipient is not in your verified contact list.",
        points: 15,
      },
      {
        title: "Critical Amount Spike",
        description: "Amount (₹35,000) is 17x higher than typical baseline (₹2,000).",
        points: 23,
      },
    ],
    breakdown: [
      { name: "Fake Reward Pattern", points: 25 },
      { name: "Advance Fee Demand", points: 25 },
      { name: "Unfamiliar Recipient", points: 15 },
      { name: "Critical Amount Spike", points: 23 },
    ],
    relatedTopicId: "scam-awareness",
    timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    inputs: {
      message: "Congratulations! You won ₹50,000. Pay ₹999 immediately to claim your reward.",
      url: "http://win-50k-reward-claim.xyz",
      transaction: { amount: 35000, recipient: "Prize Desk Global", category: "Transfer" },
    },
  },
  {
    id: "seed_02",
    score: 55,
    level: "MEDIUM RISK",
    levelClass: "medium",
    actionTitle: "VERIFY BEFORE PROCEEDING",
    recommendation: "Verify the recipient before proceeding. First-time transfer above typical envelope.",
    reasons: [
      {
        title: "Elevated Amount Anomaly",
        description: "Amount (₹10,000) exceeds typical ₹2,000 baseline.",
        points: 25,
      },
      {
        title: "Unfamiliar Recipient",
        description: "Recipient 'Wholesale Inventory Hub' is not verified in contacts.",
        points: 20,
      },
      {
        title: "Off-Hours Activity",
        description: "Payment initiated near evening boundary.",
        points: 10,
      },
    ],
    breakdown: [
      { name: "Elevated Amount Anomaly", points: 25 },
      { name: "Unfamiliar Recipient", points: 20 },
      { name: "Off-Hours Activity", points: 10 },
    ],
    relatedTopicId: "upi-safety",
    timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    inputs: {
      message: "Please send ₹10,000 for the wholesale inventory order.",
      url: "",
      transaction: { amount: 10000, recipient: "Wholesale Inventory Hub", category: "Shopping" },
    },
  },
  {
    id: "seed_03",
    score: 15,
    level: "LOW RISK",
    levelClass: "low",
    actionTitle: "STANDARD VIGILANCE",
    recommendation: "Routine verified transfer. Normal security standards apply.",
    reasons: [
      {
        title: "Routine Baseline Match",
        description: "Payment of ₹500 to 'Mom' fits your frequent transaction history.",
        points: 15,
      },
    ],
    breakdown: [{ name: "Routine Baseline Match", points: 15 }],
    relatedTopicId: "digital-payment-safety",
    timestamp: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    inputs: {
      message: "",
      url: "",
      transaction: { amount: 500, recipient: "Mom", category: "Transfer" },
    },
  },
];

// Initial completed topics (4 out of 10 completed = 40% initial progress)
const INITIAL_PROGRESS = {
  "scam-awareness": { completed: true, score: 5, total: 5, date: "2026-03-15" },
  "upi-safety": { completed: true, score: 4, total: 5, date: "2026-03-16" },
  "link-safety": { completed: true, score: 5, total: 5, date: "2026-03-17" },
  "digital-payment-safety": { completed: true, score: 4, total: 5, date: "2026-03-17" },
};

export const StorageService = {
  getScans() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SCANS);
      if (data) {
        return JSON.parse(data);
      }
      // Set initial scans
      localStorage.setItem(STORAGE_KEYS.SCANS, JSON.stringify(INITIAL_SCANS));
      return INITIAL_SCANS;
    } catch (e) {
      return INITIAL_SCANS;
    }
  },

  saveScan(scanResult) {
    try {
      const existing = this.getScans();
      const updated = [scanResult, ...existing].slice(0, 50); // keep last 50
      localStorage.setItem(STORAGE_KEYS.SCANS, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error("Failed to save scan:", e);
      return [];
    }
  },

  getQuizProgress() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.QUIZ_PROGRESS);
      if (data) {
        return JSON.parse(data);
      }
      localStorage.setItem(STORAGE_KEYS.QUIZ_PROGRESS, JSON.stringify(INITIAL_PROGRESS));
      return INITIAL_PROGRESS;
    } catch (e) {
      return INITIAL_PROGRESS;
    }
  },

  saveQuizCompletion(topicId, score, total) {
    try {
      const progress = this.getQuizProgress();
      progress[topicId] = {
        completed: true,
        score,
        total,
        date: new Date().toISOString().split("T")[0],
      };
      localStorage.setItem(STORAGE_KEYS.QUIZ_PROGRESS, JSON.stringify(progress));
      return progress;
    } catch (e) {
      console.error("Failed to save quiz progress:", e);
      return {};
    }
  },

  /**
   * Calculates overall Dashboard Financial Safety Score (0-100).
   * Formula:
   * Safety Score = 100 - (Weighted recent risk exposures)
   * High Risk scans subtract 15 points
   * Medium Risk scans subtract 6 points
   * Low Risk scans add back 2 safety points
   * If empty, defaults to 82 / 100 (Good Safety Status)
   */
  getSafetyScore() {
    const scans = this.getScans();
    if (!scans || scans.length === 0) {
      return {
        score: 82,
        status: "Good Safety Status",
        level: "LOW RISK",
        isDefault: true,
      };
    }

    // Take the 5 most recent scans
    const recent = scans.slice(0, 5);
    let penalty = 0;
    recent.forEach((s) => {
      if (s.score >= 70) penalty += 12;
      else if (s.score >= 40) penalty += 6;
      else penalty -= 2;
    });

    const calculated = Math.max(35, Math.min(98, 90 - penalty));

    let status = "Good Safety Status";
    let level = "LOW RISK";
    if (calculated < 55) {
      status = "Elevated Risk Alert";
      level = "HIGH RISK";
    } else if (calculated < 75) {
      status = "Moderate Vigilance";
      level = "MEDIUM RISK";
    }

    return {
      score: calculated,
      status,
      level,
      isDefault: false,
    };
  },

  resetAllData() {
    try {
      localStorage.setItem(STORAGE_KEYS.SCANS, JSON.stringify(INITIAL_SCANS));
      localStorage.setItem(STORAGE_KEYS.QUIZ_PROGRESS, JSON.stringify(INITIAL_PROGRESS));
      return true;
    } catch (e) {
      return false;
    }
  },
};
