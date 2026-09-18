import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send, Bot, Sparkles, CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";
import { Header } from "../components/Header";
import { FinGuardLogo } from "../components/FinGuardLogo";

export function AIAssistantChatScreen({ initialPrompt = "", onBack }) {
  const [messages, setMessages] = useState([
    {
      id: "u1",
      sender: "user",
      text: initialPrompt || "Which savings plan is best for a student like me?",
    },
    {
      id: "b1",
      sender: "bot",
      text: "For a student, a high-yield savings account or a recurring deposit (RD) can be good options. They are safe, help you build a habit of saving, and offer good interest rates.",
      followUps: ["More details", "Compare plans", "Show me options"],
    },
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  const handleSendMessage = (text) => {
    const query = text || inputText;
    if (!query.trim()) return;

    const newMsg = {
      id: "u_" + Date.now(),
      sender: "user",
      text: query.trim(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText("");

    setTimeout(() => {
      let botReply =
        "FinGuard AI: I recommend looking into Student Zero-Balance savings accounts or fixed recurring deposits with 6.5% - 7.2% annual yield. Would you like to review emergency fund basics as well?";
      let followUps = ["Emergency funds", "Safety tips", "Budget rules"];

      if (query.toLowerCase().includes("detail") || query.toLowerCase().includes("options")) {
        botReply =
          "Recurring Deposits (RD) let you deposit a small fixed amount monthly (e.g. ₹500/month). It has zero risk of market volatility and builds disciplined saving habits.";
        followUps = ["How to start an RD?", "Is RD tax-free?"];
      } else if (query.toLowerCase().includes("upi") || query.toLowerCase().includes("scam")) {
        botReply =
          "Remember: Entering your UPI PIN is strictly an authorization step to SEND funds. If anyone sends a collect request claiming you will receive money, decline immediately.";
        followUps = ["Check suspicious link", "Report a scam"];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: "b_" + Date.now(),
          sender: "bot",
          text: botReply,
          followUps,
        },
      ]);
    }, 600);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#F8FAFC",
        paddingBottom: "10px",
      }}
    >
      {/* Standard Header with back button */}
      <Header
        title="FinGuard AI"
        subtitle="Online • 24/7 Security Advisor"
        showBack={true}
        onBack={onBack}
        rightAction={
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #06B6D4 0%, #4F46E5 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
            }}
          >
            <Bot size={18} />
          </div>
        }
      />

      {/* Chat Messages Stream */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {messages.map((m) => {
          const isUser = m.sender === "user";
          return (
            <div
              key={m.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: isUser ? "flex-end" : "flex-start",
                gap: "6px",
              }}
            >
              {/* Message Bubble */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", maxWidth: "85%" }}>
                {!isUser && (
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "8px",
                      background: "linear-gradient(135deg, #06B6D4 0%, #4F46E5 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#FFFFFF",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    <Bot size={16} />
                  </div>
                )}
                <div
                  style={{
                    background: isUser
                      ? "linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)"
                      : "#FFFFFF",
                    color: isUser ? "#FFFFFF" : "#1E293B",
                    padding: "12px 16px",
                    borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    border: isUser ? "none" : "1px solid #E2E8F0",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    fontSize: "13px",
                    lineHeight: 1.45,
                  }}
                >
                  {m.text}
                </div>
              </div>

              {/* Follow-up Suggestion Pills */}
              {!isUser && m.followUps && (
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginLeft: "36px", marginTop: "4px" }}>
                  {m.followUps.map((fu, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(fu)}
                      style={{
                        padding: "8px 12px",
                        borderRadius: "12px",
                        background: "#FFFFFF",
                        border: "1px solid #E2E8F0",
                        fontSize: "11.5px",
                        fontWeight: "600",
                        color: "#4F46E5",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        textAlign: "left",
                        width: "fit-content",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                      }}
                    >
                      <span style={{ fontSize: "10px", color: "#06B6D4" }}>⊙</span>
                      <span>{fu}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Message Input Field matching Mockup */}
      <div style={{ padding: "8px 16px", background: "#FFFFFF", borderTop: "1px solid #E2E8F0" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          style={{ display: "flex", gap: "8px", alignItems: "center" }}
        >
          <input
            type="text"
            className="text-input"
            placeholder="Type a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{ borderRadius: "9999px", padding: "12px 18px", fontSize: "13px", background: "#F8FAFC" }}
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
              background: "linear-gradient(135deg, #4F46E5 0%, #A855F7 100%)",
            }}
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
