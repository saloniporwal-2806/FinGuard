import React from "react";
import { ArrowLeft, AlertTriangle, CheckCircle2, ShieldAlert, Share2 } from "lucide-react";

export function ScamCheckScreen({ scanData, onBack, onReport }) {
  const messageText =
    scanData?.inputs?.message ||
    "“Congratulations! You won ₹10,000 cashback. Claim now within 2 hours or the offer will expire. Click here: bit.ly/flipkart-reward”";

  const score = scanData?.score || 92;
  const isHigh = score >= 70;

  const reasons = scanData?.reasons || [
    { title: "Urgent language (within 2 hours)" },
    { title: "Requests sensitive information (click link)" },
    { title: "Unknown link (bit.ly)" },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#F8FAFC",
        paddingBottom: "80px",
        overflowY: "auto",
      }}
    >
      {/* Header matching Mockup Screen 6 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "16px 20px",
          background: "#FFFFFF",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            display: "flex",
            color: "#0F172A",
          }}
        >
          <ArrowLeft size={18} />
        </button>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: "800", color: "#0F172A" }}>
          Scam Check
        </h2>
      </div>

      <div className="screen-content" style={{ flex: 1, padding: "18px" }}>
        {/* Quoted Message Card matching Mockup */}
        <div
          className="card"
          style={{
            background: "#FFFFFF",
            border: "1.5px solid #E2E8F0",
            borderRadius: "18px",
            padding: "16px",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "6px" }}>
            <span
              style={{
                fontSize: "10px",
                fontWeight: "700",
                color: "#DC2626",
                background: "#FEF2F2",
                border: "1px solid #FECACA",
                padding: "2px 8px",
                borderRadius: "6px",
                textTransform: "uppercase",
              }}
            >
              Suspicious
            </span>
          </div>

          <p style={{ fontSize: "12.5px", color: "#1E293B", lineHeight: 1.45, fontStyle: "italic" }}>
            "{messageText}"
          </p>
        </div>

        {/* High Risk Banner Card matching Mockup */}
        <div
          style={{
            background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
            color: "#FFFFFF",
            padding: "16px 18px",
            borderRadius: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 8px 20px rgba(239, 68, 68, 0.3)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AlertTriangle size={20} color="#FFFFFF" />
            </div>
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: "800" }}>
                High Risk
              </h3>
            </div>
          </div>

          <span style={{ fontSize: "12.5px", fontWeight: "700", background: "rgba(255,255,255,0.25)", padding: "4px 10px", borderRadius: "8px" }}>
            Risk Score: {score}/100
          </span>
        </div>

        {/* Section: Why? */}
        <div className="card" style={{ padding: "16px 18px" }}>
          <h4
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "13.5px",
              fontWeight: "800",
              color: "#0F172A",
              marginBottom: "12px",
            }}
          >
            Why?
          </h4>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {reasons.map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#F472B6",
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: "12px", color: "#334155", fontWeight: "600" }}>
                  {r.description || r.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section: What to do? */}
        <div
          className="card"
          style={{
            padding: "16px 18px",
            background: "#EFF6FF",
            border: "1px solid #BFDBFE",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
            <CheckCircle2 size={18} color="#2563EB" style={{ flexShrink: 0, marginTop: "2px" }} />
            <div>
              <h4 style={{ fontSize: "12.5px", fontWeight: "800", color: "#1E40AF", marginBottom: "4px" }}>
                What to do?
              </h4>
              <p style={{ fontSize: "12px", color: "#1E3A8A", lineHeight: 1.45 }}>
                Do not click the link or share any personal information. If you're unsure, verify with the official source or contact your bank directly.
              </p>
            </div>
          </div>
        </div>

        {/* Action Button: Report Scam */}
        <button
          className="btn-primary"
          onClick={onReport || onBack}
          style={{
            marginTop: "6px",
            background: "linear-gradient(135deg, #4F46E5 0%, #A855F7 100%)",
            padding: "16px 20px",
            borderRadius: "16px",
          }}
        >
          <span>Report Scam</span>
        </button>
      </div>
    </div>
  );
}
