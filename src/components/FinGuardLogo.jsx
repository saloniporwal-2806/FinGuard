import React from "react";
import logoImg from "../assets/finguard-logo.png";

/**
 * Official FinGuard Logo:
 * Silver shield with upward growth chart forming stylized "G" and FinGuard typography.
 */
export function FinGuardLogo({ size = 48, withGlow = true, className = "" }) {
  return (
    <div
      className={`finguard-logo-wrap ${className}`}
      style={{
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        filter: withGlow ? "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15))" : "none",
        flexShrink: 0,
      }}
    >
      <img
        src={logoImg}
        alt="FinGuard AI Logo"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          borderRadius: size > 40 ? "12px" : "6px",
        }}
      />
    </div>
  );
}
