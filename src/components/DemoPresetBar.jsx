import React from "react";
import { Sparkles, ShieldCheck, AlertTriangle, ShieldAlert } from "lucide-react";
import { DEMO_CASES } from "../data/demoCases";

export function DemoPresetBar({ onSelectCase }) {
  return (
    <div
      className="demo-preset-panel"
      style={{
        background: "#F8FAFC",
        border: "1.5px dashed #CBD5E1",
        borderRadius: "18px",
        padding: "12px 14px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginTop: "12px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "11px",
            fontWeight: "800",
            color: "#475569",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          <Sparkles size={13} color="#4F46E5" />
          ⚡ Quick Demo Scenarios (Auto-Test)
        </span>
        <span style={{ fontSize: "10px", color: "#94A3B8", fontWeight: "600" }}>Tap to inspect</span>
      </div>

      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          boxSizing: "border-box",
        }}
      >
        {DEMO_CASES.map((demo) => {
          const isHigh = demo.badgeColor === "red";
          const isMed = demo.badgeColor === "amber";

          const bg = isHigh ? "#FEF2F2" : isMed ? "#FFFBEB" : "#ECFDF5";
          const border = isHigh ? "#FECACA" : isMed ? "#FDE68A" : "#A7F3D0";
          const text = isHigh ? "#B91C1C" : isMed ? "#B45309" : "#047857";

          return (
            <button
              key={demo.id}
              onClick={() => onSelectCase(demo)}
              style={{
                background: bg,
                border: `1.5px solid ${border}`,
                borderRadius: "9999px",
                padding: "8px 14px",
                fontSize: "11.5px",
                fontWeight: "700",
                color: text,
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
                transition: "all 0.15s ease",
              }}
            >
              {isHigh ? (
                <ShieldAlert size={13} color="#EF4444" />
              ) : isMed ? (
                <AlertTriangle size={13} color="#F59E0B" />
              ) : (
                <ShieldCheck size={13} color="#10B981" />
              )}
              <span>{demo.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
