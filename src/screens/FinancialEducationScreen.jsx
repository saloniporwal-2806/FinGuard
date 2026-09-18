import React, { useState } from "react";
import { Search, ChevronRight, Smartphone, CreditCard, Percent, PiggyBank, TrendingUp, BookOpen } from "lucide-react";
import { Header } from "../components/Header";
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
      title: "50/30/20 Rule",
      time: "4 min",
      level: "Beginner",
      icon: PiggyBank,
      color: "#3B82F6",
      bgColor: "#EFF6FF",
    },
    {
      id: "investment-awareness",
      title: "Mutual Funds for Beginners",
      time: "8 min",
      level: "Advanced",
      icon: TrendingUp,
      color: "#8B5CF6",
      bgColor: "#F5F3FF",
    },
  ];

  const filteredModules = educationModules.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.level.toLowerCase().includes(searchTerm.toLowerCase());
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
      {/* Standardized Consistent Header */}
      <Header
        title="Financial Education"
        subtitle="Curated Lessons & Risk Awareness"
        showBack={true}
        onBack={onBack}
      />

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
