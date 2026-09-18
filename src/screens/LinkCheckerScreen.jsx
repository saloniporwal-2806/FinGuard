import React, { useState } from "react";
import { Link2, ArrowRight, Sparkles, AlertCircle, Shield, Globe } from "lucide-react";
import { Header } from "../components/Header";
import { PrivacyNotice } from "../components/PrivacyNotice";

export function LinkCheckerScreen({ initialUrl = "", onCheck, onBack }) {
  const [url, setUrl] = useState(initialUrl);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sampleLinks = [
    {
      label: "Brand Spoofing (.xyz)",
      url: "http://win-50k-reward-claim.xyz/verify-otp",
    },
    {
      label: "Typosquatted Bank Domain",
      url: "https://www.hdfc-security-update.top/login.php",
    },
    {
      label: "Direct IP Host",
      url: "http://192.168.1.105/paytm-refund",
    },
    {
      label: "Shortened Redirection Link",
      url: "https://bit.ly/sbi-urgent-kyc",
    },
    {
      label: "Official State Bank Portal",
      url: "https://onlinesbi.sbi",
    },
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!url || url.trim().length === 0) {
      setError("Please enter a valid URL.");
      return;
    }
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onCheck({ url: url.trim() });
    }, 700);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header
        title="Link Checker"
        subtitle="Prototype URL structure & domain safety check"
        showBack={true}
        onBack={onBack}
      />

      <div className="screen-content" style={{ flex: 1 }}>
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "3px 8px",
              borderRadius: "6px",
              background: "#F1F5F9",
              color: "#64748B",
              fontSize: "10px",
              fontWeight: "700",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              marginBottom: "6px",
            }}
          >
            <Globe size={11} />
            PROTOTYPE URL ANALYSIS
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "18px",
              fontWeight: "800",
              color: "#0F172A",
              marginBottom: "4px",
            }}
          >
            Verify Suspicious Link
          </h2>
          <p style={{ fontSize: "12px", color: "#64748B", lineHeight: 1.4 }}>
            Examine domain structure, typosquatting, deceptive subdomains, raw IP addresses, and HTTP security vulnerabilities.
          </p>
        </div>

        {/* URL Input Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div className="form-group">
            <label className="form-label" htmlFor="url-input">
              Target Website Address:
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="url-input"
                type="text"
                className="text-input"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (error) setError("");
                }}
                style={{ paddingLeft: "38px" }}
              />
              <Link2
                size={16}
                color="#94A3B8"
                style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }}
              />
            </div>
          </div>

          {error && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "#DC2626",
                fontSize: "12px",
                fontWeight: "600",
              }}
            >
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-accent"
            disabled={isLoading}
            style={{ marginTop: "4px" }}
          >
            {isLoading ? (
              <>
                <Shield size={18} style={{ animation: "spinShield 1s infinite linear" }} />
                <span>Inspecting Domain Attributes...</span>
              </>
            ) : (
              <>
                <Link2 size={18} />
                <span>Check Link</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Sample Links for Evaluation */}
        <div style={{ marginTop: "8px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "11px",
              fontWeight: "700",
              color: "#64748B",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "8px",
            }}
          >
            <Sparkles size={12} color="#00D09C" />
            TEST SAMPLE LINKS
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {sampleLinks.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setUrl(s.url);
                  if (error) setError("");
                }}
                style={{
                  textAlign: "left",
                  padding: "10px 12px",
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: "12px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                }}
              >
                <span style={{ fontSize: "11px", fontWeight: "700", color: "#8B5CF6" }}>
                  {s.label}
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    color: "#475569",
                    fontFamily: "monospace",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {s.url}
                </span>
              </button>
            ))}
          </div>
        </div>

        <PrivacyNotice compact={true} />
      </div>
    </div>
  );
}
