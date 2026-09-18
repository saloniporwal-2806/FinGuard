import React, { useState } from "react";
import { ArrowLeft, Search, ChevronRight, Smartphone, CreditCard, Percent, PiggyBank, TrendingUp, BookOpen } from "lucide-react";
import { LITERACY_TOPICS } from "../data/literacyTopics";

export function FinancialEducationScreen({ onSelectTopic, onBack }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Basics", "UPI", "Loans", "Investments"];

  const educationModules = [
    {
      id: "upi-safety",
      title: "What is UPI and how does it work?",
      time: "5 min",
      level: "Beginner",
      icon: Smartphone,
      color: "#06B6D4",
      bgColor: "#ECFEFF",
    },
    {
      id: "privacy-credentials",
      title: "Credit Score Explained",
      time: "7 min",
      level: "Beginner",
      icon: CreditCard,
      color: "#10B981",
      bgColor: "#ECFDF5",
    },
    {
      id: "loan-awareness",
      title: "EMI vs Interest Rate",
      time: "6 min",
      level: "Intermediate",
      icon: Percent,
      color: "#F59E0B",
      bgColor: "#FFFBEB",
    },
    {
      id: "budgeting",
      title: "How to Save Money Effectively",
      time: "8 min",
      level: "Beginner",
      icon: PiggyBank,
      color: "#A855F7",
      bgColor: "#FAF5FF",
    },
    {
      id: "investment-awareness",
      title: "Basics of Mutual Funds",
      time: "7 min",
      level: "Intermediate",
      icon: TrendingUp,
      color: "#4F46E5",
      bgColor: "#EEF2FF",
    },
  ];

  const filtered = educationModules.filter((m) => {
    const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#F8FAFC",
        paddingBottom: "80px",
        overflowY: "auto",
      }}
    >
      {/* Header matching Mockup Screen 7 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "16px 20px",
          background: "#FFFFFF",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            display: "flex",
            color: "#0F172A",
          }}
        >
          <ArrowLeft size={18} />
        </button>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: "800", color: "#0F172A" }}>
          Financial Education
        </h2>
      </div>

      <div className="screen-content" style={{ flex: 1, padding: "16px 18px" }}>
        {/* Search Bar */}
        <div style={{ position: "relative" }}>
          <input
            type="text"
            className="text-input"
            placeholder="Search topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              paddingLeft: "38px",
              borderRadius: "14px",
              background: "#FFFFFF",
            }}
          />
          <Search
            size={16}
            color="#94A3B8"
            style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }}
          />
        </div>

        {/* Filter Chips matching Mockup */}
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

        {/* Educational Topics List matching Mockup */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {filtered.map((item) => {
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
                  background: "#FFFFFF",
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
    </div>
  );
}
