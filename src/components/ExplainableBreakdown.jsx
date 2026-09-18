import React, { useState } from "react";
import { AlertCircle, CheckCircle2, ChevronDown, ChevronUp, HelpCircle, ShieldCheck, AlertTriangle } from "lucide-react";

export function ExplainableBreakdown({ result }) {
  const [showCalculation, setShowCalculation] = useState(false);

  if (!result) return null;

  const isHigh = result.score >= 70;
  const isMed = result.score >= 40 && result.score < 70;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* 1. Action Guidance Card: WHAT SHOULD YOU DO? */}
      <div
        style={{
          background: isHigh
            ? "linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)"
            : isMed
            ? "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)"
            : "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)",
          border: `1.5px solid ${isHigh ? "#FECACA" : isMed ? "#FDE68A" : "#A7F3D0"}`,
          borderRadius: "18px",
          padding: "16px 18px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
          {isHigh ? (
            <AlertCircle size={20} color="#DC2626" />
          ) : isMed ? (
            <AlertTriangle size={20} color="#D97706" />
          ) : (
            <ShieldCheck size={20} color="#059669" />
          )}
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "800",
              fontSize: "13px",
              letterSpacing: "0.5px",
              color: isHigh ? "#991B1B" : isMed ? "#92400E" : "#065F46",
              textTransform: "uppercase",
            }}
          >
            {result.actionTitle || "RECOMMENDED ACTION"}
          </span>
        </div>
        <p
          style={{
            fontSize: "13px",
            lineHeight: 1.45,
            fontWeight: "500",
            color: isHigh ? "#7F1D1D" : isMed ? "#78350F" : "#064E3B",
          }}
        >
          {result.recommendation}
        </p>
      </div>

      {/* 2. WHY THIS LOOKS RISKY? */}
      <div className="card" style={{ padding: "18px" }}>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "14px",
            fontWeight: "700",
            color: "#0F172A",
            marginBottom: "12px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "16px",
              borderRadius: "3px",
              backgroundColor: isHigh ? "#EF4444" : isMed ? "#F59E0B" : "#10B981",
              display: "inline-block",
            }}
          />
          WHY THIS LOOKS RISKY?
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {result.reasons && result.reasons.length > 0 ? (
            result.reasons.map((reason, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  padding: "10px 12px",
                  background: "#F8FAFC",
                  borderRadius: "12px",
                  border: "1px solid #EDF2F7",
                }}
              >
                <div style={{ marginTop: "2px", flexShrink: 0 }}>
                  {reason.severity === "critical" || reason.severity === "high" ? (
                    <AlertCircle size={16} color="#EF4444" />
                  ) : reason.severity === "medium" ? (
                    <AlertTriangle size={16} color="#F59E0B" />
                  ) : (
                    <CheckCircle2 size={16} color="#10B981" />
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: "700",
                      color: "#1E293B",
                      marginBottom: "2px",
                    }}
                  >
                    {reason.title}
                  </div>
                  <div style={{ fontSize: "12px", color: "#64748B", lineHeight: 1.4 }}>
                    {reason.description}
                  </div>
                </div>
                {reason.points && (
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      color: isHigh ? "#EF4444" : isMed ? "#D97706" : "#059669",
                      padding: "2px 6px",
                      borderRadius: "6px",
                      background: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                      whiteSpace: "nowrap",
                    }}
                  >
                    +{reason.points}
                  </span>
                )}
              </div>
            ))
          ) : (
            <p style={{ fontSize: "13px", color: "#64748B" }}>No risk signals identified.</p>
          )}
        </div>
      </div>

      {/* 3. Expandable Section: HOW WAS THIS SCORE CALCULATED? */}
      <div className="card" style={{ padding: "16px 18px" }}>
        <button
          onClick={() => setShowCalculation(!showCalculation)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "none",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
            padding: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <HelpCircle size={16} color="#00D09C" />
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "13px",
                fontWeight: "700",
                color: "#0F172A",
              }}
            >
              How was this score calculated?
            </span>
          </div>
          {showCalculation ? <ChevronUp size={16} color="#64748B" /> : <ChevronDown size={16} color="#64748B" />}
        </button>

        {showCalculation && (
          <div
            style={{
              marginTop: "14px",
              paddingTop: "14px",
              borderTop: "1px solid #F1F5F9",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <p style={{ fontSize: "11px", color: "#64748B", marginBottom: "6px" }}>
              Our AI heuristic engine scores multi-vector security signals and normalizes them deterministically:
            </p>
            {result.breakdown &&
              result.breakdown.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    color: "#334155",
                    padding: "4px 0",
                  }}
                >
                  <span>{item.name}</span>
                  <span style={{ fontWeight: "700", color: "#0F172A", fontFamily: "monospace" }}>
                    +{item.points}
                  </span>
                </div>
              ))}
            <div
              style={{
                marginTop: "6px",
                paddingTop: "8px",
                borderTop: "1.5px dashed #CBD5E1",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "13px",
                fontWeight: "800",
                color: "#0F172A",
              }}
            >
              <span>Total Prototype Risk Score</span>
              <span
                style={{
                  color: isHigh ? "#EF4444" : isMed ? "#F59E0B" : "#10B981",
                  fontFamily: "monospace",
                }}
              >
                {result.score} / 100
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
