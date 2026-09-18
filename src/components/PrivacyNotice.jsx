import React from "react";
import { Lock } from "lucide-react";

export function PrivacyNotice({ compact = false }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: compact ? "6px 10px" : "10px 14px",
        background: "rgba(10, 25, 47, 0.04)",
        border: "1px solid #E2E8F0",
        borderRadius: "12px",
        color: "#64748B",
        fontSize: compact ? "11px" : "12px",
        lineHeight: 1.4,
      }}
    >
      <Lock size={compact ? 13 : 15} color="#00D09C" style={{ flexShrink: 0 }} />
      <span>
        <strong>Prototype Privacy Notice:</strong> This demo operates locally using simulated data. Never enter real banking PINs, passwords, or OTPs.
      </span>
    </div>
  );
}
