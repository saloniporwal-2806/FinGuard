import { evaluateRisk } from "./src/services/riskEngine.js";
import { analyzeMessage } from "./src/services/messageAnalyzer.js";
import { analyzeLink } from "./src/services/linkAnalyzer.js";
import { analyzeTransaction } from "./src/services/transactionAnalyzer.js";
import { DEMO_CASES } from "./src/data/demoCases.js";
import { LITERACY_TOPICS } from "./src/data/literacyTopics.js";
import { StorageService } from "./src/services/storageService.js";

console.log("==================================================");
console.log("RUNNING VERIFICATION SUITE: FINGUARD AI");
console.log("==================================================\n");

let passed = 0;
let total = 0;

function assert(condition, testName, details = "") {
  total++;
  if (condition) {
    console.log(`✓ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`✕ FAIL: ${testName} - ${details}`);
  }
}

// 1. Test Demo Case 1: SAFE
const case1 = DEMO_CASES[0];
const res1 = evaluateRisk({ transaction: case1.input.transaction });
assert(res1.level === "LOW RISK", "Case 1 Level is LOW RISK", `Got ${res1.level}`);
assert(res1.score < 40, "Case 1 Score < 40", `Score: ${res1.score}`);
assert(res1.actionTitle === "STANDARD VIGILANCE", "Case 1 Action Title is STANDARD VIGILANCE");
assert(res1.breakdown.reduce((a, b) => a + b.points, 0) === res1.score, "Case 1 Breakdown sums to score");

// 2. Test Demo Case 2: MEDIUM
const case2 = DEMO_CASES[1];
const res2 = evaluateRisk({
  message: case2.input.message,
  url: case2.input.url,
  transaction: case2.input.transaction,
});
assert(res2.level === "MEDIUM RISK", "Case 2 Level is MEDIUM RISK", `Got ${res2.level}, score: ${res2.score}`);
assert(res2.score >= 40 && res2.score < 70, "Case 2 Score between 40 and 69", `Score: ${res2.score}`);
assert(res2.actionTitle === "VERIFY BEFORE PROCEEDING", "Case 2 Action Title is VERIFY BEFORE PROCEEDING");

// 3. Test Demo Case 3: HIGH RISK
const case3 = DEMO_CASES[2];
const res3 = evaluateRisk({
  message: case3.input.message,
  url: case3.input.url,
  transaction: case3.input.transaction,
});
assert(res3.level === "HIGH RISK", "Case 3 Level is HIGH RISK", `Got ${res3.level}, score: ${res3.score}`);
assert(res3.score >= 70, "Case 3 Score >= 70", `Score: ${res3.score}`);
assert(res3.actionTitle === "PAUSE & VERIFY", "Case 3 Action Title is PAUSE & VERIFY");
assert(res3.reasons.length >= 3, "Case 3 has multiple explainable reasons", `Count: ${res3.reasons.length}`);
assert(res3.breakdown.reduce((a, b) => a + b.points, 0) === res3.score, "Case 3 Breakdown sums to score");

// 4. Test Message Analyzer Heuristics
const msgRes = analyzeMessage("Pay ₹999 immediately to claim your lottery reward. Send OTP.");
assert(msgRes.signals.length >= 3, "Message Analyzer identifies urgency, fee, reward, and OTP", `Signals: ${msgRes.signals.length}`);

// 5. Test Link Analyzer Heuristics
const linkRes = analyzeLink("http://win-50k-reward-claim.xyz/verify-otp");
assert(linkRes.signals.some((s) => s.category.includes("HTTP")), "Link Analyzer flags HTTP transmission");
assert(linkRes.signals.some((s) => s.category.includes("Domain Extension")), "Link Analyzer flags .xyz TLD");

// 6. Test Financial Literacy Topics Structure
assert(LITERACY_TOPICS.length === 10, "10 Literacy Topics Defined", `Count: ${LITERACY_TOPICS.length}`);
let totalQuestions = 0;
LITERACY_TOPICS.forEach((t) => {
  totalQuestions += t.quiz.length;
  assert(t.quiz.length === 5, `Topic '${t.title}' has 5 quiz questions`);
  assert(t.dos.length > 0 && t.donts.length > 0, `Topic '${t.title}' has DOs and DONTs`);
  assert(Boolean(t.safetyTip), `Topic '${t.title}' has safety tip`);
});
assert(totalQuestions === 50, "50 total quiz questions curated", `Total: ${totalQuestions}`);

console.log("\n==================================================");
console.log(`TEST RESULTS: ${passed}/${total} PASSED`);
console.log("==================================================");

if (passed === total) {
  process.exit(0);
} else {
  process.exit(1);
}
