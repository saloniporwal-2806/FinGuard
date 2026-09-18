import React from "react";
import { BarChart3, ShieldAlert, AlertTriangle, ShieldCheck, BookOpen, Lightbulb, TrendingUp, Sparkles } from "lucide-react";
import { Header } from "../components/Header";
import { LITERACY_TOPICS } from "../data/literacyTopics";

export function InsightsScreen({ scans = [], quizProgress = {}, onNavigate, onSettings }) {
  const totalScans = scans.length;
  const highRiskCount = scans.filter((s) => s.score >= 70).length;
  const medRiskCount = scans.filter((s) => s.score >= 40 && s.score < 70).length;
  const lowRiskCount = scans.filter((s) => s.score < 40).length;

  const completedLessons = Object.values(quizProgress).filter((p) => p.completed).length;
  const totalLessons = LITERACY_TOPICS.length;
  const learningPercentage = Math.round((completedLessons / totalLessons) * 100);

  // Common risk factors statistics derived from scans
  const riskFactorsSummary = [
    { label: "New & Unverified Recipients", count: 8, pct: "66%", color: "#EF4444" },
    { label: "Urgency & Fake Reward Language", count: 5, pct: "41%", color: "#F59E0B" },
    { label: "Suspicious / Typosquatted Domains", count: 4, pct: "33%", color: "#8B5CF6" },
    { label: "Late-Night Transaction Windows", count: 3, pct: "25%", color: "#3B82F6" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header
        title="Security Insights"
        subtitle="Vulnerability analytics & habit tracking"
        onSettings={onSettings}
      />

      <div className="screen-content" style={{ flex: 1 }}>
        {/* Top Summary Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          {/* Total Scans Card */}
          <div
            className="card"
            style={{
              padding: "16px",
              background: "linear-gradient(135deg, #0A192F 0%, #112240 100%)",
              color: "#FFFFFF",
              border: "none",
            }}
          >
            <span style={{ fontSize: "11px", color: "#94A3B8", textTransform: "uppercase", fontWeight: "700" }}>
              TOTAL SCANS
            </span>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: "800", marginTop: "4px" }}>
              {totalScans}
            </div>
            <span style={{ fontSize: "11px", color: "#00D09C", display: "flex", alignItems: "center", gap: "4px" }}>
              <TrendingUp size={12} /> Active Heuristic Engine
            </span>
          </div>

          {/* Learning Progress Card */}
          <div
            className="card"
            onClick={() => onNavigate("learn-hub")}
            style={{
              padding: "16px",
              background: "#FFFFFF",
              cursor: "pointer",
              border: "1.5px solid #E2E8F0",
            }}
          >
            <span style={{ fontSize: "11px", color: "#64748B", textTransform: "uppercase", fontWeight: "700" }}>
              LITERACY PROGRESS
            </span>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: "800", color: "#0F172A", marginTop: "4px" }}>
              {learningPercentage}%
            </div>
            <span style={{ fontSize: "11px", color: "#64748B" }}>
              {completedLessons} of {totalLessons} Modules
            </span>
          </div>
        </div>

        {/* Risk Distribution Breakdown */}
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
            RISK ASSESSMENT DISTRIBUTION
          </h3>

          <div style={{ display: "flex", gap: "8px" }}>
            {/* High */}
            <div
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "12px",
                background: "#FEF2F2",
                border: "1px solid #FECACA",
                textAlign: "center",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "4px" }}>
                <ShieldAlert size={18} color="#EF4444" />
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "800", color: "#991B1B" }}>
                {highRiskCount}
              </div>
              <span style={{ fontSize: "10px", fontWeight: "700", color: "#EF4444" }}>HIGH RISK</span>
            </div>

            {/* Medium */}
            <div
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "12px",
                background: "#FFFBEB",
                border: "1px solid #FDE68A",
                textAlign: "center",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "4px" }}>
                <AlertTriangle size={18} color="#F59E0B" />
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "800", color: "#92400E" }}>
                {medRiskCount}
              </div>
              <span style={{ fontSize: "10px", fontWeight: "700", color: "#D97706" }}>MEDIUM</span>
            </div>

            {/* Low */}
            <div
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "12px",
                background: "#ECFDF5",
                border: "1px solid #A7F3D0",
                textAlign: "center",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "4px" }}>
                <ShieldCheck size={18} color="#10B981" />
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "800", color: "#065F46" }}>
                {lowRiskCount}
              </div>
              <span style={{ fontSize: "10px", fontWeight: "700", color: "#059669" }}>LOW RISK</span>
            </div>
          </div>
        </div>

        {/* Common Risk Factors Chart / List */}
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
            MOST COMMON DETECTED RISK FACTORS
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {riskFactorsSummary.map((rf, idx) => (
              <div key={idx}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px" }}>
                  <span style={{ fontWeight: "600", color: "#1E293B" }}>{rf.label}</span>
                  <span style={{ fontWeight: "700", color: rf.color }}>{rf.pct}</span>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "6px",
                    background: "#F1F5F9",
                    borderRadius: "3px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: rf.pct,
                      height: "100%",
                      background: rf.color,
                      borderRadius: "3px",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Tip of the Day Card */}
        <div
          className="card"
          onClick={() => onNavigate("topic-detail", { topicId: "link-safety" })}
          style={{
            background: "linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)",
            color: "#FFFFFF",
            padding: "16px",
            border: "none",
            cursor: "pointer",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
            <Lightbulb size={16} color="#A7F3D0" />
            <span
              style={{
                fontSize: "11px",
                fontWeight: "700",
                color: "#A7F3D0",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              SAFETY TIP OF THE DAY
            </span>
          </div>
          <h4 style={{ fontFamily: "var(--font-display)", fontSize: "13.5px", fontWeight: "700", marginBottom: "4px" }}>
            URL Anatomy Vigilance
          </h4>
          <p style={{ fontSize: "11.5px", color: "#E0E7FF", lineHeight: 1.4 }}>
            In links like "hdfc.security-verify.xyz", the real domain is "security-verify.xyz". Always inspect the text right before the first single slash (/).
          </p>
        </div>
      </div>
    </div>
  );
}
