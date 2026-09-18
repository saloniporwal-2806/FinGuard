import React, { useState } from "react";
import { MessageSquareWarning, ArrowRight, Sparkles, AlertCircle, Shield } from "lucide-react";
import { Header } from "../components/Header";
import { PrivacyNotice } from "../components/PrivacyNotice";

export function MessageScannerScreen({ initialText = "", onAnalyze, onBack }) {
  const [message, setMessage] = useState(initialText);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sampleMessages = [
    {
      label: "Fake Reward Scam",
      text: "Congratulations! You won ₹50,000. Pay ₹999 immediately to claim your reward. Click the link.",
    },
    {
      label: "Urgent KYC Threat",
      text: "Dear customer, your SBI netbanking will be suspended in 24 hours. Update KYC immediately or account blocked: bit.ly/sbi-kyc-verify",
    },
    {
      label: "UPI PIN Phishing",
      text: "Buyer wants to send ₹4,500. Enter your UPI PIN on the attached link to approve and receive the payment.",
    },
    {
      label: "Legitimate Message",
      text: "Hi Mom, I have reached Bangalore safely. Will call you around 8 PM after unpacking.",
    },
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!message || message.trim().length === 0) {
      setError("Please enter a message to analyze.");
      return;
    }
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onAnalyze({ message: message.trim() });
    }, 700);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header
        title="Message Scanner"
        subtitle="Detect scam & social engineering indicators"
        showBack={true}
        onBack={onBack}
      />

      <div className="screen-content" style={{ flex: 1 }}>
        <div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "18px",
              fontWeight: "800",
              color: "#0F172A",
              marginBottom: "4px",
            }}
          >
            Message Scanner
          </h2>
          <p style={{ fontSize: "12px", color: "#64748B", lineHeight: 1.4 }}>
            Check whether a message contains common scam triggers, urgency tactics, fake rewards, or PIN/OTP harvesting.
          </p>
        </div>

        {/* Text Input Area */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div className="form-group">
            <label className="form-label" htmlFor="message-input">
              Suspicious Message Text:
            </label>
            <textarea
              id="message-input"
              className="textarea-input"
              placeholder="Paste a suspicious SMS, WhatsApp, or Telegram message here..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (error) setError("");
              }}
              rows={5}
            />
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
                <span>Analyzing Message Signals...</span>
              </>
            ) : (
              <>
                <MessageSquareWarning size={18} />
                <span>Analyze Message</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Sample Templates for Quick Evaluation */}
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
            TRY SAMPLE MESSAGES
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {sampleMessages.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setMessage(s.text);
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
                <span style={{ fontSize: "11px", fontWeight: "700", color: "#00D09C" }}>
                  {s.label}
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    color: "#475569",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  "{s.text}"
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
