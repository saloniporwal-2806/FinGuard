import React from "react";
import {
  CheckCircle2,
  XCircle,
  Lightbulb,
  HelpCircle,
  ArrowRight,
  ShieldAlert,
  Smartphone,
  Globe,
  CreditCard,
  PieChart,
  Split,
  LifeBuoy,
  Coins,
  TrendingUp,
  KeyRound,
  FileText,
} from "lucide-react";
import { Header } from "../components/Header";

const ICON_MAP = {
  ShieldAlert,
  Smartphone,
  Globe,
  CreditCard,
  PieChart,
  Split,
  LifeBuoy,
  Coins,
  TrendingUp,
  KeyRound,
};

export function TopicDetailScreen({ topic, isCompleted, userScore, onStartQuiz, onBack }) {
  if (!topic) return null;

  const Icon = ICON_MAP[topic.icon] || ShieldAlert;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header
        title={topic.title}
        subtitle={`${topic.readTime} reading • Financial Safety`}
        showBack={true}
        onBack={onBack}
      />

      <div className="screen-content" style={{ flex: 1 }}>
        {/* Topic Header Card */}
        <div
          className="card"
          style={{
            background: "linear-gradient(135deg, #0A192F 0%, #162C4E 100%)",
            color: "#FFFFFF",
            padding: "20px 18px",
            border: "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: "rgba(0, 208, 156, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#00D09C",
              }}
            >
              <Icon size={22} />
            </div>
            <div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: "700",
                  color: "#00D09C",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                {topic.badge}
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: "800" }}>
                {topic.title}
              </h2>
            </div>
          </div>
          <p style={{ fontSize: "13px", color: "#CBD5E1", lineHeight: 1.45 }}>
            {topic.explanation}
          </p>
        </div>

        {/* Real-Life Case Study */}
        <div
          className="card"
          style={{
            padding: "16px 18px",
            borderLeft: "4px solid #F59E0B",
            background: "#FFFDF5",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
            <FileText size={16} color="#D97706" />
            <h4
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "13px",
                fontWeight: "700",
                color: "#92400E",
                textTransform: "uppercase",
                letterSpacing: "0.4px",
              }}
            >
              REAL-LIFE CASE STUDY
            </h4>
          </div>
          <p style={{ fontSize: "12.5px", color: "#78350F", lineHeight: 1.45 }}>
            {topic.realLifeExample}
          </p>
        </div>

        {/* DOs & DON'Ts Section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* DOs */}
          <div
            className="card"
            style={{
              padding: "16px 18px",
              background: "#F0FDF4",
              border: "1px solid #BBF7D0",
            }}
          >
            <h4
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "13px",
                fontWeight: "800",
                color: "#166534",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <CheckCircle2 size={16} color="#16A34A" />
              DO: RECOMMENDED PRACTICES
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {topic.dos.map((item, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <span style={{ color: "#16A34A", fontWeight: "800", fontSize: "14px" }}>✓</span>
                  <span style={{ fontSize: "12px", color: "#14532D", lineHeight: 1.4 }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* DON'Ts */}
          <div
            className="card"
            style={{
              padding: "16px 18px",
              background: "#FEF2F2",
              border: "1px solid #FECACA",
            }}
          >
            <h4
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "13px",
                fontWeight: "800",
                color: "#991B1B",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <XCircle size={16} color="#DC2626" />
              DON'T: CRITICAL MISTAKES TO AVOID
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {topic.donts.map((item, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <span style={{ color: "#DC2626", fontWeight: "800", fontSize: "14px" }}>✕</span>
                  <span style={{ fontSize: "12px", color: "#7F1D1D", lineHeight: 1.4 }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Safety Tip Highlight */}
        <div
          className="card"
          style={{
            padding: "14px 16px",
            background: "#ECFDF5",
            border: "1px solid #A7F3D0",
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
          }}
        >
          <Lightbulb size={20} color="#059669" style={{ flexShrink: 0, marginTop: "2px" }} />
          <div>
            <span style={{ fontSize: "11px", fontWeight: "700", color: "#065F46", textTransform: "uppercase" }}>
              FINGUARD SAFETY TIP
            </span>
            <p style={{ fontSize: "12px", color: "#064E3B", lineHeight: 1.4, marginTop: "2px" }}>
              "{topic.safetyTip}"
            </p>
          </div>
        </div>

        {/* CTA: Take Mini Quiz */}
        <div style={{ marginTop: "4px" }}>
          <button className="btn-accent" onClick={onStartQuiz}>
            <HelpCircle size={18} />
            <span>
              {isCompleted ? `Retake Quiz (Best: ${userScore}/5)` : "Take Mini Quiz (5 Questions)"}
            </span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
