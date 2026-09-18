import React from "react";
import { ShieldCheck, ShieldAlert, AlertTriangle } from "lucide-react";

export function RiskBadge({ level = "LOW RISK", score, size = "md" }) {
  const isHigh = level.toUpperCase().includes("HIGH") || score >= 70;
  const isMed = level.toUpperCase().includes("MEDIUM") || (score >= 40 && score < 70);

  let icon = <ShieldCheck size={size === "sm" ? 12 : 14} />;
  let className = "risk-pill low";
  let label = "LOW RISK";

  if (isHigh) {
    icon = <ShieldAlert size={size === "sm" ? 12 : 14} />;
    className = "risk-pill high";
    label = "HIGH RISK";
  } else if (isMed) {
    icon = <AlertTriangle size={size === "sm" ? 12 : 14} />;
    className = "risk-pill medium";
    label = "MEDIUM RISK";
  }

  return (
    <span className={className} style={{ fontSize: size === "sm" ? "10px" : "11px", padding: size === "sm" ? "3px 8px" : "4px 10px" }}>
      {icon}
      {label}
    </span>
  );
}
