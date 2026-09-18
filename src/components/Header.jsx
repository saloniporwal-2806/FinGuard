import React from "react";
import { ArrowLeft, Settings } from "lucide-react";
import { FinGuardLogo } from "./FinGuardLogo";

export function Header({ title, subtitle, onBack, onSettings, dark = false, showBack = false }) {
  return (
    <header className={`app-header ${dark ? "dark" : ""}`}>
      <div className="header-title-wrap">
        {showBack ? (
          <button
            className="icon-btn"
            onClick={onBack}
            style={{
              background: dark ? "rgba(255,255,255,0.1)" : "#F1F5F9",
              color: dark ? "#FFFFFF" : "#0F172A",
            }}
          >
            <ArrowLeft size={18} />
          </button>
        ) : (
          <div className="header-shield-icon">
            <FinGuardLogo size={20} color="#00D09C" />
          </div>
        )}
        <div className="header-text">
          <h1 style={{ color: dark ? "#FFFFFF" : "#0F172A" }}>{title}</h1>
          {subtitle && (
            <p style={{ color: dark ? "#94A3B8" : "#64748B" }}>{subtitle}</p>
          )}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {onSettings && (
          <button
            className="icon-btn"
            onClick={onSettings}
            title="Settings & About FinGuard"
            style={{
              background: dark ? "rgba(255,255,255,0.1)" : "#F1F5F9",
              color: dark ? "#FFFFFF" : "#0F172A",
            }}
          >
            <Settings size={17} />
          </button>
        )}
      </div>
    </header>
  );
}
