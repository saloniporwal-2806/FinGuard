/**
 * Link Analyzer: Comprehensive AI/heuristic URL inspection engine.
 * Detects typosquatting, brand imitation, deceptive keywords, multi-hyphen camouflage,
 * suspicious TLDs, URL shorteners, raw IP hosts, and unencrypted transmission.
 * Labeled strictly as: "Prototype URL analysis".
 */

// Verified Official Whitelist (Legitimate known domains)
const VERIFIED_OFFICIAL_DOMAINS = [
  "google.com",
  "google.co.in",
  "youtube.com",
  "amazon.in",
  "amazon.com",
  "flipkart.com",
  "onlinesbi.sbi",
  "sbi.co.in",
  "hdfcbank.com",
  "icicibank.com",
  "axisbank.com",
  "kotak.com",
  "pnbindia.in",
  "bankofbaroda.in",
  "paytm.com",
  "phonepe.com",
  "pay.google.com",
  "bhimupi.org.in",
  "npci.org.in",
  "rbi.org.in",
  "incometax.gov.in",
  "uidai.gov.in",
  "irctc.co.in",
  "epfindia.gov.in",
  "digilocker.gov.in",
  "apple.com",
  "microsoft.com",
  "github.com",
  "wikipedia.org",
  "instagram.com",
  "facebook.com",
  "twitter.com",
  "x.com",
  "linkedin.com",
  "netflix.com",
];

// Target brands often targeted by phishing in India & globally
const TARGET_BRANDS = [
  { name: "sbi", authentic: ["onlinesbi.sbi", "sbi.co.in"] },
  { name: "hdfc", authentic: ["hdfcbank.com"] },
  { name: "icici", authentic: ["icicibank.com"] },
  { name: "axis", authentic: ["axisbank.com"] },
  { name: "kotak", authentic: ["kotak.com"] },
  { name: "pnb", authentic: ["pnbindia.in"] },
  { name: "bob", authentic: ["bankofbaroda.in"] },
  { name: "paytm", authentic: ["paytm.com"] },
  { name: "phonepe", authentic: ["phonepe.com"] },
  { name: "gpay", authentic: ["pay.google.com"] },
  { name: "googlepay", authentic: ["pay.google.com"] },
  { name: "bhim", authentic: ["bhimupi.org.in"] },
  { name: "amazon", authentic: ["amazon.in", "amazon.com"] },
  { name: "flipkart", authentic: ["flipkart.com"] },
  { name: "jio", authentic: ["jio.com"] },
  { name: "airtel", authentic: ["airtel.in"] },
  { name: "vi", authentic: ["myvi.in"] },
  { name: "bsnl", authentic: ["bsnl.co.in"] },
  { name: "netflix", authentic: ["netflix.com"] },
  { name: "telegram", authentic: ["telegram.org", "t.me"] },
  { name: "whatsapp", authentic: ["whatsapp.com", "wa.me"] },
  { name: "rbi", authentic: ["rbi.org.in"] },
  { name: "incometax", authentic: ["incometax.gov.in"] },
  { name: "epfo", authentic: ["epfindia.gov.in"] },
  { name: "uidai", authentic: ["uidai.gov.in"] },
  { name: "aadhaar", authentic: ["uidai.gov.in"] },
];

// Suspicious Top-Level Domains (frequently used in bulk disposable scam campaigns)
const SUSPICIOUS_TLDS = [
  ".xyz",
  ".top",
  ".tk",
  ".ml",
  ".ga",
  ".cf",
  ".gq",
  ".buzz",
  ".click",
  ".work",
  ".monster",
  ".rest",
  ".club",
  ".online",
  ".site",
  ".live",
  ".cam",
  ".zip",
  ".mov",
  ".cfd",
  ".sbs",
  ".icu",
  ".quest",
  ".beauty",
  ".shop",
  ".vip",
  ".space",
  ".fit",
  ".link",
  ".fun",
  ".pw",
  ".cc",
  ".info",
  ".loan",
  ".win",
  ".date",
  ".download",
];

// Known URL shorteners used to mask real destinations
const URL_SHORTENERS = [
  "bit.ly",
  "tinyurl.com",
  "is.gd",
  "t.co",
  "cutt.ly",
  "rb.gy",
  "ow.ly",
  "buff.ly",
  "rebrand.ly",
  "shorturl.at",
  "v.gd",
  "tiny.cc",
];

// Phishing, scam, lottery and financial lure keywords
const SCAM_LURE_KEYWORDS = [
  { word: "free", weight: 20, desc: "Deceptive 'Free' lure keyword in web address" },
  { word: "recharge", weight: 25, desc: "Fake mobile recharge / cashback incentive pattern" },
  { word: "reward", weight: 20, desc: "Unsolicited reward / prize redemption trigger" },
  { word: "prize", weight: 20, desc: "Lottery or prize claim lure keyword" },
  { word: "lottery", weight: 30, desc: "Classic lottery scam terminology" },
  { word: "lucky", weight: 20, desc: "Deceptive 'lucky draw' incentive" },
  { word: "bonus", weight: 20, desc: "Unverified instant bonus trigger" },
  { word: "cashback", weight: 20, desc: "Fake cashback redirection keyword" },
  { word: "cash", weight: 15, desc: "Immediate cash payout keyword lure" },
  { word: "win", weight: 15, desc: "Fake winning / contest claim term" },
  { word: "claim", weight: 20, desc: "Urgent claim call-to-action in web path" },
  { word: "kyc", weight: 30, desc: "High-risk banking KYC impersonation keyword" },
  { word: "pan", weight: 25, desc: "Identity PAN card linking/update prompt" },
  { word: "aadhaar", weight: 25, desc: "Aadhaar credential verification lure" },
  { word: "otp", weight: 35, desc: "High-danger one-time password interception vector" },
  { word: "verify", weight: 20, desc: "Credential verification / harvesting trigger" },
  { word: "verification", weight: 20, desc: "Account re-verification phishing phrase" },
  { word: "unblock", weight: 25, desc: "Fear-based account unblocking manipulation" },
  { word: "blocked", weight: 25, desc: "Fear-based account suspension trigger" },
  { word: "suspend", weight: 25, desc: "Urgent account suspension threat keyword" },
  { word: "update", weight: 15, desc: "Urgent security update lure phrase" },
  { word: "banking", weight: 20, desc: "Unverified banking credential portal keyword" },
  { word: "login", weight: 20, desc: "Login portal credential harvesting attempt" },
  { word: "signin", weight: 20, desc: "Sign-in portal credential harvesting attempt" },
  { word: "crypto", weight: 25, desc: "Unregulated high-risk crypto investment lure" },
  { word: "invest", weight: 20, desc: "Unregulated investment / high-yield scheme" },
  { word: "parttime", weight: 25, desc: "Work-from-home / part-time job scam pattern" },
  { word: "earning", weight: 20, desc: "Guaranteed daily earning scheme indicator" },
  { word: "refund", weight: 25, desc: "Phishing tax or utility refund lure" },
  { word: "electricity", weight: 25, desc: "Fake electricity bill disconnection scam pattern" },
  { word: "challan", weight: 25, desc: "Fake traffic challan payment portal lure" },
  { word: "loan", weight: 20, desc: "Instant unregulated loan / predatory lending lure" },
  { word: "apk", weight: 25, desc: "Untrusted side-loaded APK download vector" },
  { word: "mod", weight: 20, desc: "Untrusted modded software / malware vector" },
  { word: "hack", weight: 25, desc: "Account hacking / social media cheat lure" },
];

export function analyzeLink(urlString) {
  if (!urlString || typeof urlString !== "string" || urlString.trim().length === 0) {
    return {
      riskScore: 0,
      signals: [],
      hasContent: false,
      hostname: "",
      protocol: "",
    };
  }

  const raw = urlString.trim();
  const signals = [];
  let normalizedUrl = raw;

  // Add protocol if user typed plain domain
  const hasExplicitProtocol = raw.startsWith("http://") || raw.startsWith("https://");
  if (!hasExplicitProtocol) {
    normalizedUrl = "https://" + normalizedUrl;
  }

  let parsedUrl = null;
  try {
    parsedUrl = new URL(normalizedUrl);
  } catch (e) {
    signals.push({
      category: "Malformed URL Structure",
      description: "URL format does not follow standard RFC web address specifications",
      contribution: 35,
      severity: "high",
      relatedTopic: "link-safety",
    });
    return {
      riskScore: 35,
      signals,
      hasContent: true,
      hostname: raw,
      protocol: "unknown",
      summary: "Invalid or malformed URL detected.",
    };
  }

  const protocol = parsedUrl.protocol; // 'http:' or 'https:'
  const hostname = parsedUrl.hostname.toLowerCase();
  const pathname = parsedUrl.pathname.toLowerCase();
  const search = parsedUrl.search.toLowerCase();
  const fullUrl = parsedUrl.toString().toLowerCase();

  // 1. Check if domain is in Verified Official Whitelist
  const isVerifiedOfficial = VERIFIED_OFFICIAL_DOMAINS.some(
    (domain) => hostname === domain || hostname.endsWith("." + domain)
  );

  if (isVerifiedOfficial) {
    return {
      riskScore: 5,
      signals: [],
      hasContent: true,
      hostname,
      protocol,
      isVerifiedOfficial: true,
      summary: "Verified legitimate domain matching official authenticated records.",
    };
  }

  // 2. Insecure Transmission (Plain HTTP)
  if (protocol === "http:") {
    signals.push({
      category: "Insecure Transmission (Plain HTTP)",
      description: "Traffic is unencrypted (HTTP); sensitive data can be intercepted by third parties",
      contribution: 20,
      severity: "medium",
      relatedTopic: "link-safety",
    });
  }

  // 3. Raw IP Address Host
  const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
  if (ipRegex.test(hostname)) {
    signals.push({
      category: "Raw IP Address Host",
      description: `Uses a direct IP address (${hostname}) instead of an accredited registered domain`,
      contribution: 40,
      severity: "critical",
      relatedTopic: "link-safety",
    });
  }

  // 4. URL Shortener Masking
  const isShortener = URL_SHORTENERS.some((s) => hostname === s || hostname.endsWith("." + s));
  if (isShortener) {
    signals.push({
      category: "URL Shortener Redirection",
      description: `Uses URL shortener (${hostname}) to disguise the actual destination website`,
      contribution: 30,
      severity: "high",
      relatedTopic: "link-safety",
    });
  }

  // 5. Suspicious Top-Level Domains (TLD)
  const matchedTLD = SUSPICIOUS_TLDS.find((tld) => hostname.endsWith(tld));
  if (matchedTLD) {
    signals.push({
      category: "High-Risk Domain Extension",
      description: `Registered on '${matchedTLD}', a low-reputation extension widely used in phishing campaigns`,
      contribution: 25,
      severity: "high",
      relatedTopic: "link-safety",
    });
  }

  // 6. Brand Impersonation & Typo-squatting
  for (const b of TARGET_BRANDS) {
    const isAuthentic = b.authentic.some((auth) => hostname === auth || hostname.endsWith("." + auth));
    if (!isAuthentic && (hostname.includes(b.name) || pathname.includes(b.name))) {
      signals.push({
        category: "Brand Name Lookalike (Typo-squatting)",
        description: `Imitates trusted brand '${b.name.toUpperCase()}' without matching its official root domain (${b.authentic.join(", ")})`,
        contribution: 35,
        severity: "critical",
        relatedTopic: "link-safety",
      });
      break;
    }
  }

  // 7. Multi-Hyphen Domain Camouflage (e.g. free-recharge-offer.com)
  const domainNamePart = hostname.split(".").slice(-2, -1)[0] || hostname;
  const hyphenCount = (domainNamePart.match(/-/g) || []).length;
  if (hyphenCount >= 2) {
    signals.push({
      category: "Multi-Hyphen Domain Camouflage",
      description: `Domain contains multiple hyphens (${hyphenCount}), a common pattern used to assemble fake branded phrases`,
      contribution: 25,
      severity: "high",
      relatedTopic: "link-safety",
    });
  }

  // 8. Financial Scam & Phishing Keywords in Hostname or Path
  const detectedKeywords = [];
  for (const item of SCAM_LURE_KEYWORDS) {
    // Check if word appears in hostname, pathname, or search
    const inHost = hostname.includes(item.word);
    const inPath = pathname.includes(item.word) || search.includes(item.word);

    if (inHost || inPath) {
      detectedKeywords.push(item);
      signals.push({
        category: inHost ? "Scam Lure Keyword in Domain" : "Credential/Claim Keyword in Path",
        description: item.desc,
        contribution: item.weight,
        severity: item.weight >= 25 ? "high" : "medium",
        relatedTopic: item.word.includes("kyc") || item.word.includes("otp") || item.word.includes("pin") ? "privacy-credentials" : "link-safety",
      });
      // Cap individual keyword additions to avoid runaway duplication
      if (detectedKeywords.length >= 3) break;
    }
  }

  // 9. Excessive Subdomain Camouflage (e.g. sbi.co.security-update.com)
  const parts = hostname.split(".");
  if (parts.length >= 4) {
    signals.push({
      category: "Excessive Subdomain Stacking",
      description: `Contains ${parts.length - 2} subdomain levels, often used to create fake security prefixes`,
      contribution: 20,
      severity: "medium",
      relatedTopic: "link-safety",
    });
  }

  // 10. Deceptive Userinfo '@' Symbol
  if (raw.includes("@")) {
    signals.push({
      category: "Deceptive Userinfo Syntax (@)",
      description: "Uses '@' character to deceive users into misreading the real destination host",
      contribution: 35,
      severity: "critical",
      relatedTopic: "link-safety",
    });
  }

  // 11. Port number in URL (e.g. example.com:8080 or :3000)
  if (parsedUrl.port && parsedUrl.port !== "80" && parsedUrl.port !== "443") {
    signals.push({
      category: "Non-Standard Port Number",
      description: `Connects via non-standard port :${parsedUrl.port}, unusual for official consumer services`,
      contribution: 20,
      severity: "medium",
      relatedTopic: "link-safety",
    });
  }

  // 12. Generic Unverified Website (If no specific scam keywords or brand mimicry was found)
  // Give an unknown website a realistic caution baseline (25 points - Low to Medium) rather than a flat 5
  if (signals.length === 0) {
    signals.push({
      category: "Unverified Third-Party Domain",
      description: "Domain is not part of authenticated official registries. Exercise standard vigilance before sharing details.",
      contribution: 22,
      severity: "low",
      relatedTopic: "link-safety",
    });
  }

  const rawSum = signals.reduce((acc, s) => acc + s.contribution, 0);
  const riskScore = Math.min(100, Math.max(15, rawSum));

  return {
    riskScore,
    signals,
    hasContent: true,
    hostname,
    protocol,
    summary: `${signals.length} domain indicator(s) identified during prototype analysis.`,
  };
}
