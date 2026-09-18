import React from "react";
import { ArrowLeft, BookOpen, RotateCcw, Share2, CheckCircle, ShieldCheck } from "lucide-react";
import { Header } from "../components/Header";
import { CircularRiskScore } from "../components/CircularRiskScore";
import { ExplainableBreakdown } from "../components/ExplainableBreakdown";
import { LITERACY_TOPICS } from "../data/literacyTopics";
import { PrivacyNotice } from "../components/PrivacyNotice";

export function RiskResultScreen({ result, onBack, onNavigate, onCheckAnother }) {
  if (!result) {
    return (
      <div className="screen-content">
        <p>No result to display.</p>
        <button className="btn-secondary" onClick={onCheckAnother}>
          Go to Dashboard
        </button>
      </div>
    );
  }

  const relatedTopic = LITERACY_TOPICS.find((t) => t.id === result.relatedTopicId) || LITERACY_TOPICS[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header
        title="Risk Assessment"
        subtitle="Transparent AI Explainable Report"
        showBack={true}
        onBack={onBack}
      />

      <div className="screen-content" style={{ flex: 1 }}>
        {/* Top Status Banner */}
        <div style={{ textAlign: "center", marginBottom: "4px" }}>
          <span
            style={{
              fontSize: "11px",
              fontWeight: "700",
              color: "#64748B",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            ANALYSIS COMPLETE
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "20px",
              fontWeight: "800",
              color: "#0F172A",
            }}
          >
            Prototype Risk Score
          </h2>
        </div>

        {/* Circular Animated Risk Score */}
        <div
          className="card"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "24px 16px",
            background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
          }}
        >
          <CircularRiskScore
            score={result.score}
            level={result.level}
            size={160}
            strokeWidth={14}
            showLabel={true}
          />
        </div>

        {/* Explainable AI Breakdown */}
        <ExplainableBreakdown result={result} />

        {/* Connected Financial Literacy Lesson (Requirement 29) */}
        {relatedTopic && (
          <div
            className="card"
            style={{
              background: "linear-gradient(135deg, #0A192F 0%, #162C4E 100%)",
              color: "#FFFFFF",
              padding: "18px",
              border: "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
              <BookOpen size={16} color="#00D09C" />
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: "700",
                  color: "#00D09C",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                RECOMMENDED SAFETY LESSON
              </span>
            </div>

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "15px",
                fontWeight: "700",
                marginBottom: "4px",
              }}
            >
              {relatedTopic.title}
            </h3>
            <p style={{ fontSize: "12px", color: "#CBD5E1", lineHeight: 1.4, marginBottom: "14px" }}>
              {relatedTopic.tagline} • Learn how to defend against these exact patterns with our 3-minute lesson & mini quiz.
            </p>

            <button
              className="btn-accent"
              onClick={() => onNavigate("topic-detail", { topicId: relatedTopic.id })}
              style={{ padding: "10px 16px", fontSize: "13px" }}
            >
              <BookOpen size={16} />
              <span>Learn Why: Take Lesson & Quiz</span>
            </button>
          </div>
        )}

        {/* Primary Action Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "4px" }}>
          <button className="btn-primary" onClick={onCheckAnother}>
            <RotateCcw size={16} />
            <span>Check Another Message, Link, or Payment</span>
          </button>
        </div>

        <PrivacyNotice compact={true} />
      </div>
    </div>
  );
}
