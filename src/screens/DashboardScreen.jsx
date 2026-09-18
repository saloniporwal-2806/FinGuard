import React from "react";
import {
  Bell,
  QrCode,
  BookOpen,
  PieChart,
  LayoutGrid,
  ChevronRight,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  ShieldAlert,
  Link2,
  Sparkles,
} from "lucide-react";
import { DemoPresetBar } from "../components/DemoPresetBar";

export function DashboardScreen({
  currentUser,
  safetyScore,
  recentScans = [],
  onNavigate,
  onSelectDemoCase,
}) {
  const healthScore = safetyScore?.score || 78;

  // Arc calculation for financial health gauge (radius 37)
  const radius = 37;
  const strokeWidth = 6;
  const circumference = Math.PI * radius; // Half-circle
  const strokeDashoffset = circumference - (healthScore / 100) * circumference;

  const displayName = currentUser?.name
    ? currentUser.name.split(" ")[0]
    : "User";

  return (
    <div className="screen-content" style={{ padding: "16px 18px 80px 18px" }}>
      {/* 1. Header: Greeting & Profile */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
        <div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "20px",
              fontWeight: "800",
              color: "#0F172A",
              lineHeight: 1.25,
            }}
          >
            Good Morning,<br />{displayName} 👋
          </h2>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Notification Bell */}
          <div
            onClick={() => onNavigate("profile")}
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              cursor: "pointer",
            }}
          >
            <Bell size={18} color="#475569" />
            <span
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#EF4444",
                border: "1.5px solid #FFFFFF",
              }}
            />
          </div>

          {/* User Avatar */}
          <div
            onClick={() => onNavigate("profile")}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #4F46E5 0%, #A855F7 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontWeight: "800",
              fontSize: "14px",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(79, 70, 229, 0.25)",
              overflow: "hidden",
            }}
          >
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              (currentUser?.name || "FG").slice(0, 1).toUpperCase()
            )}
          </div>
        </div>
      </div>

      {/* 2. Card: Your Financial Health */}
      <div
        className="card"
        style={{
          background: "#FFFFFF",
          padding: "16px 18px",
          border: "1.5px solid #E2E8F0",
          borderRadius: "22px",
          position: "relative",
          boxShadow: "var(--shadow-card)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <span style={{ fontSize: "12px", fontWeight: "700", color: "#64748B", letterSpacing: "0.2px" }}>
            Your Financial Health
          </span>
          <span style={{ fontSize: "13px", color: "#94A3B8", cursor: "pointer" }}>✕</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Half Arc Gauge */}
          <div style={{ position: "relative", width: "94px", height: "56px", flexShrink: 0, display: "flex", justifyContent: "center" }}>
            <svg width="94" height="56" viewBox="0 0 94 56" style={{ overflow: "visible" }}>
              <path
                d="M 10 50 A 37 37 0 0 1 84 50"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
              <path
                d="M 10 50 A 37 37 0 0 1 84 50"
                fill="none"
                stroke="url(#healthGrad)"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{ transition: "stroke-dashoffset 0.8s ease" }}
              />
              <defs>
                <linearGradient id="healthGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
            </svg>

            <div
              style={{
                position: "absolute",
                top: "14px",
                left: 0,
                right: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <div style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: "800", color: "#0F172A", lineHeight: 1 }}>
                {healthScore}<span style={{ fontSize: "10px", color: "#94A3B8", fontWeight: "600" }}>/100</span>
              </div>
              <span
                style={{
                  fontSize: "9.5px",
                  fontWeight: "700",
                  color: "#059669",
                  background: "#ECFDF5",
                  padding: "1.5px 7px",
                  borderRadius: "9999px",
                  display: "inline-block",
                  marginTop: "3px",
                  lineHeight: 1.2,
                }}
              >
                Good
              </span>
            </div>
          </div>

          {/* Description & Link */}
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "12px", color: "#334155", fontWeight: "600", lineHeight: 1.35 }}>
              You're on track! Keep learning and stay secure.
            </p>
            <button
              onClick={() => onNavigate("insights")}
              style={{
                background: "none",
                border: "none",
                color: "#4F46E5",
                fontSize: "11.5px",
                fontWeight: "700",
                cursor: "pointer",
                padding: 0,
                marginTop: "4px",
                display: "inline-flex",
                alignItems: "center",
                gap: "2px",
              }}
            >
              View Details →
            </button>
          </div>
        </div>
      </div>

      {/* 4. 4 Quick Action Buttons (Scan & Pay, Learn, Budget, More) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
        {/* Scan & Pay */}
        <div
          onClick={() => onNavigate("scan-pay")}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", gap: "6px" }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "16px",
              background: "#F3E8FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#A855F7",
            }}
          >
            <QrCode size={24} />
          </div>
          <span style={{ fontSize: "11px", fontWeight: "600", color: "#334155" }}>Scan & Pay</span>
        </div>

        {/* Learn */}
        <div
          onClick={() => onNavigate("learn-hub")}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", gap: "6px" }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "16px",
              background: "#E0F2FE",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0284C7",
            }}
          >
            <BookOpen size={24} />
          </div>
          <span style={{ fontSize: "11px", fontWeight: "600", color: "#334155" }}>Learn</span>
        </div>

        {/* Budget */}
        <div
          onClick={() => onNavigate("budget")}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", gap: "6px" }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "16px",
              background: "#DCFCE7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#16A34A",
            }}
          >
            <PieChart size={24} />
          </div>
          <span style={{ fontSize: "11px", fontWeight: "600", color: "#334155" }}>Budget</span>
        </div>

        {/* More */}
        <div
          onClick={() => onNavigate("ai-assistant")}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", gap: "6px" }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "16px",
              background: "#FEF3C7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#D97706",
            }}
          >
            <LayoutGrid size={24} />
          </div>
          <span style={{ fontSize: "11px", fontWeight: "600", color: "#334155" }}>AI & More</span>
        </div>
      </div>

      {/* 5. Card: Total Balance */}
      <div
        className="card"
        style={{
          background: "linear-gradient(135deg, #F0F4FF 0%, #E0EAFF 100%)",
          border: "1.5px solid #C7D2FE",
          borderRadius: "22px",
          padding: "16px 18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <span style={{ fontSize: "11px", fontWeight: "700", color: "#4F46E5", textTransform: "uppercase" }}>
            Total Balance
          </span>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: "800", color: "#0F172A", marginTop: "2px" }}>
            ₹ 12,450
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              color: "#059669",
              background: "#DCFCE7",
              padding: "2px 8px",
              borderRadius: "9999px",
              fontSize: "10.5px",
              fontWeight: "700",
              marginTop: "4px",
            }}
          >
            <TrendingUp size={11} />
            +12% this month
          </div>
        </div>

        <button
          onClick={() => onNavigate("budget")}
          style={{
            background: "#FFFFFF",
            border: "1px solid #C7D2FE",
            color: "#4F46E5",
            fontSize: "11px",
            fontWeight: "700",
            padding: "8px 12px",
            borderRadius: "12px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            boxShadow: "0 2px 6px rgba(79, 70, 229, 0.1)",
          }}
        >
          View Account →
        </button>
      </div>

      {/* 6. Security Scanners Shortcut Banner */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        <div
          onClick={() => onNavigate("message-scanner")}
          className="card"
          style={{
            padding: "12px 14px",
            cursor: "pointer",
            background: "#FFFFFF",
            border: "1px solid #E2E8F0",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "#FEF2F2",
              color: "#EF4444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <ShieldAlert size={18} />
          </div>
          <div>
            <div style={{ fontSize: "12px", fontWeight: "700", color: "#0F172A" }}>Scam Check</div>
            <span style={{ fontSize: "10px", color: "#64748B" }}>Analyze SMS / text</span>
          </div>
        </div>

        <div
          onClick={() => onNavigate("link-checker")}
          className="card"
          style={{
            padding: "12px 14px",
            cursor: "pointer",
            background: "#FFFFFF",
            border: "1px solid #E2E8F0",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "#F5F3FF",
              color: "#8B5CF6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Link2 size={18} />
          </div>
          <div>
            <div style={{ fontSize: "12px", fontWeight: "700", color: "#0F172A" }}>Link Check</div>
            <span style={{ fontSize: "10px", color: "#64748B" }}>Inspect URL safety</span>
          </div>
        </div>
      </div>

      {/* 7. Section: Recent Activity */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: "800", color: "#0F172A" }}>
            Recent Activity
          </h3>
          <button
            onClick={() => onNavigate("history")}
            style={{
              background: "none",
              border: "none",
              color: "#4F46E5",
              fontSize: "11px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            View All →
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {/* UPI Payment */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "12px 14px",
              border: "1px solid #E2E8F0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "#FEF2F2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#EF4444",
                }}
              >
                <ArrowUpRight size={18} />
              </div>
              <div>
                <h5 style={{ fontSize: "12.5px", fontWeight: "700", color: "#0F172A" }}>
                  UPI Payment
                </h5>
                <span style={{ fontSize: "10.5px", color: "#64748B" }}>
                  Security Premium • Today, 9:14 AM
                </span>
              </div>
            </div>
            <span style={{ fontSize: "13px", fontWeight: "800", color: "#EF4444" }}>
              - ₹ 199
            </span>
          </div>

          {/* Received Salary */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "12px 14px",
              border: "1px solid #E2E8F0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "#ECFDF5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#10B981",
                }}
              >
                <ArrowDownLeft size={18} />
              </div>
              <div>
                <h5 style={{ fontSize: "12.5px", fontWeight: "700", color: "#0F172A" }}>
                  Received
                </h5>
                <span style={{ fontSize: "10.5px", color: "#64748B" }}>
                  Salary Credit • Yesterday, 4:32 PM
                </span>
              </div>
            </div>
            <span style={{ fontSize: "13px", fontWeight: "800", color: "#10B981" }}>
              + ₹ 25,000
            </span>
          </div>
        </div>
      </div>

      {/* 8. Demo Presets Section (for Hackathon Evaluation) */}
      <DemoPresetBar onSelectCase={onSelectDemoCase} />
    </div>
  );
}
