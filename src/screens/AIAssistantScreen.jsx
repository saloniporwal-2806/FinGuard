import React, { useState } from "react";
import { Bot, Send, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Header } from "../components/Header";

export function AIAssistantScreen({ onOpenChat, onBack }) {
  const [question, setQuestion] = useState("");

  const prompts = [
    { text: "How to avoid UPI fraud?", color: "#4F46E5" },
    { text: "Best savings plans?", color: "#A855F7" },
    { text: "Explain credit score", color: "#06B6D4" },
    { text: "How to build a budget?", color: "#10B981" },
  ];

  const handleStart = (text) => {
    onOpenChat(text || question);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#FFFFFF",
        paddingBottom: "80px",
      }}
    >
      {/* Standardized Consistent Header */}
      <Header
        title="FinGuard AI"
        subtitle="Always here to help • 24/7 Security Advisor"
        showBack={true}
        onBack={onBack}
      />

      <div
        className="screen-content"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 20px 10px 20px",
        }}
      >
        {/* Robot Illustration & Speech Bubble */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          {/* Floating Robot Vector Mascot */}
          <div className="floating-robot" style={{ margin: "14px 0 16px 0" }}>
            <div
              style={{
                width: "105px",
                height: "105px",
                borderRadius: "32px",
                background: "linear-gradient(135deg, #E0F2FE 0%, #EDE9FE 100%)",
                boxShadow: "0 12px 30px rgba(6, 182, 212, 0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #FFFFFF",
                position: "relative",
              }}
            >
              <Bot size={60} color="#4F46E5" />
              {/* Head Antenna Sparkle */}
              <div
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "12px",
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: "#06B6D4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 10px #06B6D4",
                }}
              >
                <Sparkles size={10} color="#FFFFFF" />
              </div>
            </div>
          </div>

          {/* Speech Bubble Card matching Mockup */}
          <div
            className="card"
            style={{
              width: "100%",
              padding: "16px",
              background: "#F8FAFC",
              border: "1px solid #E2E8F0",
              borderRadius: "20px",
              textAlign: "left",
              position: "relative",
            }}
          >
            <span style={{ fontSize: "12.5px", fontWeight: "700", color: "#0F172A", display: "block", marginBottom: "4px" }}>
              Hi Saloni! 👋
            </span>
            <p style={{ fontSize: "12px", color: "#475569", lineHeight: 1.4 }}>
              Ask me anything about finance, scams, UPI or budgeting.
            </p>
          </div>
        </div>

        {/* Prompt Question Pills matching Mockup */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "8px", margin: "14px 0" }}>
          {prompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleStart(p.text)}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "16px",
                background: "#FFFFFF",
                border: "1.5px solid #E2E8F0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ color: p.color, fontWeight: "800", fontSize: "14px" }}>›</span>
                <span style={{ fontSize: "12.5px", fontWeight: "600", color: "#1E293B" }}>
                  {p.text}
                </span>
              </div>
              <ArrowRight size={14} color="#94A3B8" />
            </button>
          ))}
        </div>

        {/* Bottom Input Field */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (question.trim()) handleStart(question);
          }}
          style={{ width: "100%", display: "flex", gap: "8px", alignItems: "center" }}
        >
          <input
            type="text"
            className="text-input"
            placeholder="Type your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            style={{ borderRadius: "9999px", padding: "12px 18px", fontSize: "13px" }}
          />
          <button
            type="submit"
            className="btn-primary"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              padding: 0,
              flexShrink: 0,
            }}
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
