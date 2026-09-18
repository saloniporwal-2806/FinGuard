import React, { useState } from "react";
import { Info, Lock, RotateCcw, CheckCircle2, AlertTriangle, ExternalLink } from "lucide-react";
import { Header } from "../components/Header";
import { FinGuardLogo } from "../components/FinGuardLogo";
import { StorageService } from "../services/storageService";

export function SettingsAboutScreen({ onBack, onResetData }) {
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleReset = () => {
    if (window.confirm("Reset all prototype demo data, scans, and quiz progress?")) {
      StorageService.resetAllData();
      setResetSuccess(true);
      if (onResetData) onResetData();
      setTimeout(() => setResetSuccess(false), 2500);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header
        title="About FinGuard"
        subtitle="Prototype documentation & parameters"
        showBack={true}
        onBack={onBack}
      />

      <div className="screen-content" style={{ flex: 1 }}>
        {/* App Identity Banner */}
        <div
          className="card"
          style={{
            background: "linear-gradient(135deg, #0A192F 0%, #112240 100%)",
            color: "#FFFFFF",
            padding: "20px 18px",
            border: "none",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "18px",
              background: "rgba(0, 208, 156, 0.15)",
              border: "1px solid rgba(0, 208, 156, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#00D09C",
            }}
          >
            <FinGuardLogo size={36} color="#00D09C" strokeWidth={2.2} />
          </div>

          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "800" }}>
              FinGuard AI
            </h2>
            <p style={{ fontSize: "12px", color: "#00D09C", fontWeight: "600", marginTop: "2px" }}>
              “Smarter Finance. Safer You.”
            </p>
          </div>

          <p style={{ fontSize: "11.5px", color: "#CBD5E1", lineHeight: 1.4, maxWidth: "300px" }}>
            An AI-assisted mobile financial safety and financial literacy prototype engineered for decision-support and consumer protection.
          </p>
        </div>

        {/* Core Capabilities */}
        <div className="card" style={{ padding: "18px 16px" }}>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "13px",
              fontWeight: "800",
              color: "#0F172A",
              textTransform: "uppercase",
              letterSpacing: "0.4px",
              marginBottom: "12px",
            }}
          >
            ABOUT FINGUARD PILLARS
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00D09C", marginTop: "6px" }} />
              <div>
                <strong style={{ fontSize: "12.5px", color: "#1E293B" }}>Multi-Vector Heuristic Scanner:</strong>
                <p style={{ fontSize: "11.5px", color: "#64748B" }}>
                  Analyzes urgency in messages, deceptive URL features, and transaction anomalies.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#3B82F6", marginTop: "6px" }} />
              <div>
                <strong style={{ fontSize: "12.5px", color: "#1E293B" }}>Behavioral Baseline Deviation:</strong>
                <p style={{ fontSize: "11.5px", color: "#64748B" }}>
                  Compares amounts and transaction times against user historical profiles.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#F59E0B", marginTop: "6px" }} />
              <div>
                <strong style={{ fontSize: "12.5px", color: "#1E293B" }}>Explainable AI (XAI) Scoring:</strong>
                <p style={{ fontSize: "11.5px", color: "#64748B" }}>
                  Shows mathematical point contributions and plain-English action recommendations.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#8B5CF6", marginTop: "6px" }} />
              <div>
                <strong style={{ fontSize: "12.5px", color: "#1E293B" }}>Connected Literacy Curriculum:</strong>
                <p style={{ fontSize: "11.5px", color: "#64748B" }}>
                  10 comprehensive topics with 50 interactive quiz questions and real-world case studies.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Position & Disclaimers */}
        <div
          className="card"
          style={{
            padding: "16px 18px",
            background: "#FFFBEB",
            border: "1px solid #FDE68A",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
            <AlertTriangle size={16} color="#D97706" />
            <h4 style={{ fontSize: "12px", fontWeight: "800", color: "#92400E", textTransform: "uppercase" }}>
              IMPORTANT POSITIONING & DISCLAIMER
            </h4>
          </div>
          <p style={{ fontSize: "11.5px", color: "#78350F", lineHeight: 1.45 }}>
            This application is a <strong>prototype decision-support and awareness tool</strong>. FinGuard does NOT claim to detect 100% of fraud, does NOT directly block bank/UPI transactions, and does NOT replace your bank's fraud detection engine. Always exercise independent verification.
          </p>
        </div>

        {/* Privacy UX */}
        <div
          className="card"
          style={{
            padding: "16px 18px",
            background: "#F0FDF4",
            border: "1px solid #BBF7D0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
            <Lock size={16} color="#16A34A" />
            <h4 style={{ fontSize: "12px", fontWeight: "800", color: "#166534", textTransform: "uppercase" }}>
              PRIVACY & SECURITY GUARANTEE
            </h4>
          </div>
          <p style={{ fontSize: "11.5px", color: "#14532D", lineHeight: 1.45 }}>
            All prototype computations happen entirely client-side using local storage. FinGuard AI will <strong>NEVER</strong> ask for, transmit, or record your actual UPI PIN, netbanking password, OTP, or card CVV.
          </p>
        </div>

        {/* Reset Demo Data Action */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <button className="btn-secondary" onClick={handleReset}>
            <RotateCcw size={16} />
            <span>Reset Demo Data to Initial Factory State</span>
          </button>
          {resetSuccess && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", color: "#059669", fontSize: "12px", fontWeight: "700" }}>
              <CheckCircle2 size={14} />
              <span>Demo data reset successfully!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
