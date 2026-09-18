import React, { useState } from "react";
import { ArrowLeft, ChevronRight, Sparkles, BookOpen, ShieldCheck, Smartphone, Globe, CreditCard, PieChart } from "lucide-react";
import { LITERACY_TOPICS } from "../data/literacyTopics";

export function LearnHubScreen({ onSelectTopic, onBack, onNavigate }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Basics", "Scams", "UPI", "Investments"];

  const popularTopics = [
    {
      id: "digital-payment-safety",
      title: "Digital Payment Safety",
      time: "5 min",
      level: "Beginner",
      icon: CreditCard,
      color: "#06B6D4",
      bgColor: "#ECFEFF",
    },
    {
      id: "scam-awareness",
      title: "How to Spot Online Scams",
      time: "7 min",
      level: "Beginner",
      icon: ShieldCheck,
      color: "#A855F7",
      bgColor: "#FAF5FF",
    },
    {
      id: "budgeting",
      title: "Budgeting Basics",
      time: "6 min",
      level: "Beginner",
      icon: PieChart,
      color: "#10B981",
      bgColor: "#ECFDF5",
    },
    {
      id: "investment-awareness",
      title: "Investing for Beginners",
      time: "8 min",
      level: "Intermediate",
      icon: Globe,
      color: "#4F46E5",
      bgColor: "#EEF2FF",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header matching Mockup Screen 4 */}
      <div style={{ padding: "16px 20px 8px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {onBack && (
            <button
              onClick={onBack}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "2px",
                display: "flex",
              }}
            >
              <ArrowLeft size={18} color="#0F172A" />
            </button>
          )}
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: "800", color: "#0F172A" }}>
              Learn & Protect
            </h2>
            <p style={{ fontSize: "11px", color: "#64748B" }}>
              Knowledge today. Security tomorrow.
            </p>
          </div>
        </div>
      </div>

      <div className="screen-content" style={{ flex: 1, paddingBottom: "80px" }}>
        {/* Hero Card matching Mockup */}
        <div
          className="card"
          style={{
            background: "linear-gradient(135deg, #4F46E5 0%, #6366F1 50%, #818CF8 100%)",
            color: "#FFFFFF",
            padding: "20px 18px",
            border: "none",
            borderRadius: "24px",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 10px 25px rgba(79, 70, 229, 0.25)",
          }}
        >
          {/* Decorative shapes */}
          <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />

          <div style={{ maxWidth: "65%" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: "800", lineHeight: 1.2 }}>
              Financial Literacy
            </h3>
            <p style={{ fontSize: "12px", color: "#E0E7FF", marginTop: "4px", marginBottom: "14px" }}>
              Small steps. Big dreams.
            </p>

            <button
              onClick={() => onSelectTopic(LITERACY_TOPICS[0])}
              style={{
                background: "#FFFFFF",
                color: "#4F46E5",
                border: "none",
                borderRadius: "10px",
                padding: "7px 14px",
                fontSize: "11px",
                fontWeight: "800",
                cursor: "pointer",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              Start Learning →
            </button>
          </div>

          {/* Student/Reader Illustration Vector */}
          <div
            style={{
              position: "absolute",
              right: 16,
              bottom: 12,
              width: "80px",
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "68px",
                height: "68px",
                borderRadius: "20px",
                background: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
              }}
            >
              <BookOpen size={36} />
            </div>
          </div>
        </div>

        {/* Filter Chips */}
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "2px" }}>
          {filters.map((f) => (
            <button
              key={f}
              className={`filter-chip ${activeFilter === f ? "active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Section: Popular Topics */}
        <div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "14px",
              fontWeight: "800",
              color: "#0F172A",
              marginBottom: "10px",
            }}
          >
            Popular Topics
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {popularTopics.map((item) => {
              const Icon = item.icon;
              const topicObj = LITERACY_TOPICS.find((t) => t.id === item.id) || LITERACY_TOPICS[0];

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectTopic(topicObj)}
                  className="card"
                  style={{
                    padding: "14px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    borderRadius: "18px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "14px",
                        background: item.bgColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: item.color,
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={22} />
                    </div>

                    <div>
                      <h4 style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: "700", color: "#0F172A" }}>
                        {item.title}
                      </h4>
                      <span style={{ fontSize: "11px", color: "#64748B" }}>
                        {item.time} • {item.level}
                      </span>
                    </div>
                  </div>

                  <ChevronRight size={16} color="#94A3B8" />
                </div>
              );
            })}
          </div>
        </div>

        {/* View All Topics Button */}
        <button
          className="btn-secondary"
          onClick={() => onNavigate("financial-education")}
          style={{ marginTop: "4px" }}
        >
          <span>View All 10 Educational Topics →</span>
        </button>
      </div>
    </div>
  );
}
