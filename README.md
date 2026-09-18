# FinGuard AI
> **Tagline:** *“Smarter Finance. Safer You.”*

[![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-Fast%20Bundler-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Mobile-First](https://img.shields.io/badge/UI-Mobile--First%20Fintech-00D09C)](https://github.com)
[![Status](https://img.shields.io/badge/Prototype-Competition%20Ready-success)](https://github.com)

---

## 📌 Problem Statement

Digital financial fraud in India and emerging payment ecosystems is proliferating at unprecedented speed:
- **Deceptive Urgency & Social Engineering:** Fraudsters impersonate electricity boards, bank managers, or tax authorities, creating synthetic panics to coerce victims into rapid transfers.
- **UPI PIN Traps:** A staggering percentage of digital payment victims believe entering their UPI PIN is required to *receive* money, rewards, or refunds.
- **Malicious & Typosquatted URLs:** Attackers leverage unverified low-cost top-level domains (`.xyz`, `.top`), URL shorteners, and raw IP addresses to harvest credentials.
- **Predatory Digital Lending & Ponzi Schemes:** Instant loan apps harvest contact books and photos for blackmail, while Telegram groups groom victims with fake investment returns.

Most banking systems detect fraud only after high-velocity transactions occur. Everyday consumers lack an immediate, lightweight, explainable **pre-transaction decision-support and literacy safety layer**.

---

## 🛡️ The Solution

**Financial Guardian AI** is an AI-assisted, mobile-first financial safety and financial literacy assistant. It implements the closed-loop methodology:

$$\text{LEARN} \longrightarrow \text{DETECT} \longrightarrow \text{ANALYZE} \longrightarrow \text{EXPLAIN} \longrightarrow \text{PROTECT}$$

1. **Detects Multi-Vector Risks:** Analyzes suspicious messages, deceptive links, and transaction parameters.
2. **Evaluates User Behaviour Baselines:** Flags anomalous transfer amounts (e.g. ₹35,000 vs. baseline ₹2,000), late-night timing (2:30 AM), and unfamiliar recipients.
3. **Explains with Transparent AI (XAI):** Rather than showing a black-box score, it outputs clear reasons, mathematical point breakdowns, and actionable directives (**"PAUSE & VERIFY"**).
4. **Connects Detection to Education:** Bridges detected threats directly to interactive literacy modules with real-life case studies and mini quizzes.

---

## ⚠️ Important Positioning & Ethical Disclaimers

> [!IMPORTANT]
> - **Decision-Support Prototype:** This software is a prototype educational and decision-support assistant.
> - **No 100% Detection Claim:** It does NOT claim to detect 100% of scams or fraudulent activity.
> - **No Direct Banking Control:** It does NOT directly block bank/UPI transactions and does NOT replace a bank's institutional fraud detection infrastructure.
> - **Zero Credential Solicitation:** This app **never** asks for, transmits, or stores real banking PINs, netbanking passwords, OTPs, or card CVVs.

---

## 📱 Core Features

### 1. Unified Dashboard
- **Dynamic Financial Safety Index:** Real-time composite score ($0-100$) derived from recent scan history and risk exposure.
- **Quick Security Access:** Direct entry points to Message Scanner, Link Checker, Transaction Analyzer, and Learn Hub.
- **Hackathon 1-Tap Presets Bar:** Allows judges to evaluate safe, medium, and high-risk attacks with a single click.
- **Recent Audit Alerts & Safety Tip of the Day.**

### 2. Message Scanner
- Analyzes text for urgency patterns (*"account will be blocked"*), advance-fee demands (*"pay ₹999 to claim"*), fake lottery/rewards (*"congratulations you won ₹50,000"*), PIN/OTP solicitations, and fake KYC expiration threats.

### 3. Prototype Link Checker
- Deconstructs URLs to detect typosquatting (brand lookalikes like `hdfc-security.top`), excessive subdomains, direct IP hosts (`http://192.168.1.1`), high-risk TLDs (`.xyz`, `.buzz`), URL shorteners, and plain HTTP transmission.

### 4. Transaction & Behaviour Analyzer
- Compares transaction parameters against historical user baselines:
  - **Amount Baseline:** Typical ₹100 – ₹2,000 (flags anomalies at >₹10,000 and extreme spikes at >₹25,000).
  - **Time Envelope:** Normal 10:00 AM – 9:00 PM (flags high-vulnerability night hours, e.g. 2:30 AM).
  - **Recipient Familiarity:** Known contact list vs. unfamiliar first-time recipient.
  - **Location & Category:** Flags peer investment transfers and unfamiliar device locations.

### 5. Explainable AI (XAI) Risk Result
- Animated circular risk meter with dynamic color response (Green = Low, Orange = Medium, Red = High).
- **"WHY THIS LOOKS RISKY?":** Plain-English indicators with severity tags and signal point contributions.
- **"WHAT SHOULD YOU DO?":** Actionable guidance (e.g. *Pause & Verify through official channels*).
- **"How was this score calculated?":** Expandable mathematical breakdown where all line items sum consistently to the score.
- **Direct Lesson Bridge:** One-tap navigation to the related literacy module (e.g., detected OTP request $\rightarrow$ UPI Safety).

### 6. Comprehensive Financial Literacy Module
- **10 Curated Safety Topics:**
  1. Scam Awareness
  2. UPI Safety
  3. Link Safety
  4. Digital Payment Safety
  5. Budgeting & Cashflow
  6. Needs vs Wants (48-Hour Delay Rule)
  7. Emergency Fund
  8. Loan & Debt Awareness (Predatory App Defense)
  9. Investment & Ponzi Awareness
  10. Privacy & Credentials (Passphrases & MFA)
- **Each Topic Includes:** Short takeaway, real-life case study, DOs checklist, DON'Ts checklist, safety tip, and a **5-question interactive mini quiz** (50 total curated questions) with instant answer rationales, confetti celebrations, and persistent learning progress tracking.

### 7. Risk History & Security Insights
- Chronological scan audit log with risk-level filter pills (All, High, Medium, Low).
- Vulnerability analytics dashboard showing total scans, risk category distribution, and common vulnerability trends.

---

## 🏗️ Architectural Flow

```
                     MOBILE APPLICATION
                             │
                     USER INPUT LAYER
                             │
     ┌───────────────────────┼───────────────────────┐
     ▼                       ▼                       ▼
Message Scanner         Link Checker        Transaction Analyzer
(NLP Heuristics)       (URL Structure)      (Amount & Recipient)
     │                       │                       │
     └───────────────────────┼───────────────────────┘
                             ▼
                 Behaviour Baseline Engine
                 (Compares vs. User History)
                             │
                             ▼
                     AI RISK ENGINE
         (Normalized Heuristic Scoring: 0 - 100)
                             │
     ┌───────────────────────┼───────────────────────┐
     ▼                       ▼                       ▼
Risk Score & Badge       Explainable Why?      Action Recommendation
(Low / Med / High)     (Signal Contributions)   ("Pause & Verify")
                             │
                             ▼
                Related Literacy Curriculum
             (10 Topics • 50 Quiz Questions)
```

---

## ⚖️ Deterministic Risk Scoring Model

The risk engine computes consistent heuristic scores normalized to $0 - 100$:

| Detected Threat Signal | Signal Weight | Risk Category |
| :--- | :---: | :---: |
| Fake Reward / Lottery / Prize Claim | $+20$ | Message |
| Advance Fee Demand (*"Pay ₹999 to claim"*) | $+25$ | Message |
| Extreme Urgency / Disconnection Threat | $+20$ | Message |
| Credential / OTP / UPI PIN Solicitation | $+30$ | Message |
| Brand Typosquatting / Lookalike Domain | $+35$ | Link |
| Raw IP Address Host | $+35$ | Link |
| High-Risk Low-Cost TLD (`.xyz`, `.top`) | $+25$ | Link |
| Insecure Plain HTTP Transmission | $+20$ | Link |
| Critical Amount Spike ($>₹25,000$) | $+25$ | Behaviour |
| Elevated Amount Anomaly ($>₹10,000$) | $+20$ | Behaviour |
| Unfamiliar / First-Time Recipient | $+20$ | Behaviour |
| High-Vulnerability Time Window (11 PM - 6 AM) | $+15$ | Behaviour |

### Risk Classification Thresholds
- **$0 - 39$:** 🟢 **LOW RISK** $\rightarrow$ *Standard Vigilance: Verify amount and recipient.*
- **$40 - 69$:** 🟡 **MEDIUM RISK** $\rightarrow$ *Verify Before Proceeding: Confirm contact identity.*
- **$70 - 100$:** 🔴 **HIGH RISK** $\rightarrow$ *PAUSE & VERIFY: Do not proceed; check official channels.*

---

## 🧪 Validated Demo Cases (1-Tap Judge Presets)

The application includes 3 built-in demo scenarios:

| Demo Case | Input Parameters | Expected Risk | Core Guidance |
| :--- | :--- | :---: | :--- |
| **Case 1: Safe Payment** | ₹500 to "Mom", 6:30 PM, verified contact | **LOW RISK** (12/100) | *"Continue with normal safety checks."* |
| **Case 2: Medium Risk** | ₹10,000 to "Wholesale Hub", 7:00 PM, new recipient | **MEDIUM RISK** (45/100) | *"Verify the recipient before proceeding."* |
| **Case 3: High Risk Attack** | Fake ₹50k prize message + ₹35,000 at 2:30 AM to new recipient + link | **HIGH RISK** (91/100) | *"PAUSE & VERIFY: Do not proceed until verified."* |

---

## 💻 Tech Stack

- **Frontend:** React 18, Vite
- **Styling:** Custom CSS3 Design System (Vanilla CSS with CSS Custom Properties, Glassmorphism, Responsive Viewport Shell)
- **Icons:** Lucide React
- **Celebrations:** Canvas Confetti
- **State & Storage:** Local React State + Browser `localStorage` Persistence
- **Runtime:** Node.js v24+

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18 or newer)
- npm (v9 or newer)

### Installation & Launch
```bash
# 1. Clone or navigate to the project directory
cd finTech

# 2. Install dependencies (if not already installed)
npm install

# 3. Start the local development server
npm run dev

# 4. Open the displayed URL in your browser
# Local: http://localhost:5173/
```

### Run Verification Test Suite
```bash
# Runs the automated assertion suite testing all demo cases, algorithms, and quizzes
node test_engine.js
```

### Build for Production
```bash
npm run build
```

---

## 👥 Team Roles & Responsibilities
- **Full-Stack & Systems Architect:** Core framework, navigation, state persistence, and responsive viewport simulator.
- **AI / Security Engineer:** Multi-vector heuristic scoring algorithms, NLP patterns, URL deconstruction, and explainable breakdowns.
- **UI / UX Designer:** Fintech design system, micro-animations, circular SVG meters, and accessibility.
- **Financial Content & Pedagogy Specialist:** 10 literacy curricula, real-world case studies, and 50 mini-quiz assessments.
