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
import { useLanguage } from "../context/LanguageContext";

export function DashboardScreen({
  currentUser,
  safetyScore,
  recentScans = [],
  onNavigate,
  onSelectDemoCase,
}) {
  const { t } = useLanguage();
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
    <div
      className="screen-content dashboard-content"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        paddingTop: "14px",
        paddingLeft: "16px",
        paddingRight: "16px",
        paddingBottom: "calc(96px + env(safe-area-inset-bottom, 0px))",
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      {/* 1. Header: Greeting & Profile */}
      <div
        className="dashboard-greeting-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          paddingTop: "4px",
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "20px",
              fontWeight: "800",
              color: "#0F172A",
              lineHeight: 1.25,
              margin: 0,
            }}
          >
            {t("dash_greeting", "Good Morning,")}<br />{displayName} 👋
          </h2>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
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
        className="card financial-health-card"
        style={{
          background: "#FFFFFF",
          padding: "16px 18px",
          border: "1.5px solid #E2E8F0",
          borderRadius: "22px",
          position: "relative",
          boxShadow: "var(--shadow-card)",
          width: "100%",
          boxSizing: "border-box",
          overflow: "visible",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <span style={{ fontSize: "12px", fontWeight: "700", color: "#64748B", letterSpacing: "0.2px" }}>
            {t("dash_health_title", "Your Financial Health")}
          </span>
          <span style={{ fontSize: "14px", color: "#94A3B8", cursor: "pointer", padding: "2px 6px" }}>✕</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "nowrap" }}>
          {/* Half Arc Gauge */}
          <div style={{ position: "relative", width: "94px", height: "58px", flexShrink: 0, display: "flex", justifyContent: "center" }}>
            <svg width="94" height="58" viewBox="0 0 94 58" style={{ overflow: "visible" }}>
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
                {t("dash_health_good", "Good")}
              </span>
            </div>
          </div>

          {/* Description & Link */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: "12px", color: "#334155", fontWeight: "600", lineHeight: 1.4, margin: 0, wordBreak: "break-word" }}>
              {t("dash_health_desc", "You're on track! Keep learning and stay secure.")}
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
                padding: "4px 0 0 0",
                marginTop: "4px",
                display: "inline-flex",
                alignItems: "center",
                gap: "2px",
              }}
            >
              {t("btn_view_details", "View Details →")}
            </button>
          </div>
        </div>
      </div>

      {/* 4. 4 Quick Action Buttons (Scan & Pay, Learn, Budget, More) */}
      <div
        className="quick-actions-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "8px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Scan & Pay */}
        <div
          onClick={() => onNavigate("scan-pay")}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", gap: "6px", textAlign: "center" }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "16px",
              background: "#F3E8FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#A855F7",
              flexShrink: 0,
            }}
          >
            <QrCode size={23} />
          </div>
          <span style={{ fontSize: "10.5px", fontWeight: "600", color: "#334155", lineHeight: 1.2, wordBreak: "break-word" }}>
            {t("dash_quick_scan", "Scan & Pay")}
          </span>
        </div>

        {/* Learn */}
        <div
          onClick={() => onNavigate("learn-hub")}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", gap: "6px", textAlign: "center" }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "16px",
              background: "#E0F2FE",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0284C7",
              flexShrink: 0,
            }}
          >
            <BookOpen size={23} />
          </div>
          <span style={{ fontSize: "10.5px", fontWeight: "600", color: "#334155", lineHeight: 1.2, wordBreak: "break-word" }}>
            {t("dash_quick_learn", "Learn")}
          </span>
        </div>

        {/* Budget */}
        <div
          onClick={() => onNavigate("budget")}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", gap: "6px", textAlign: "center" }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "16px",
              background: "#DCFCE7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#16A34A",
              flexShrink: 0,
            }}
          >
            <PieChart size={23} />
          </div>
          <span style={{ fontSize: "10.5px", fontWeight: "600", color: "#334155", lineHeight: 1.2, wordBreak: "break-word" }}>
            {t("dash_quick_budget", "Budget")}
          </span>
        </div>

        {/* More */}
        <div
          onClick={() => onNavigate("ai-assistant")}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", gap: "6px", textAlign: "center" }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "16px",
              background: "#FEF3C7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#D97706",
              flexShrink: 0,
            }}
          >
            <LayoutGrid size={23} />
          </div>
          <span style={{ fontSize: "10.5px", fontWeight: "600", color: "#334155", lineHeight: 1.2, wordBreak: "break-word" }}>
            {t("dash_quick_more", "AI & More")}
          </span>
        </div>
      </div>

      {/* 5. Card: Total Balance */}
      <div
        className="card total-balance-card"
        style={{
          background: "linear-gradient(135deg, #F0F4FF 0%, #E0EAFF 100%)",
          border: "1.5px solid #C7D2FE",
          borderRadius: "22px",
          padding: "16px 18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: "11px", fontWeight: "700", color: "#4F46E5", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            {t("dash_total_balance", "Total Balance")}
          </span>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: "800", color: "#0F172A", marginTop: "2px", lineHeight: 1.2 }}>
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
            {t("dash_balance_trend", "+12% this month")}
          </div>
        </div>

        <button
          onClick={() => onNavigate("budget")}
          style={{
            background: "#FFFFFF",
            border: "1px solid #C7D2FE",
            color: "#4F46E5",
            fontSize: "11.5px",
            fontWeight: "700",
            padding: "8px 14px",
            borderRadius: "12px",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            boxShadow: "0 2px 6px rgba(79, 70, 229, 0.1)",
            flexShrink: 0,
            whiteSpace: "nowrap",
          }}
        >
          {t("btn_view_account", "View Account →")}
        </button>
      </div>

      {/* 6. Security Scanners Shortcut Banner */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", width: "100%", boxSizing: "border-box" }}>
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
            borderRadius: "16px",
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
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: "12px", fontWeight: "700", color: "#0F172A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {t("dash_scam_check", "Scam Check")}
            </div>
            <span style={{ fontSize: "10px", color: "#64748B", display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {t("dash_scam_check_sub", "Analyze SMS / text")}
            </span>
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
            borderRadius: "16px",
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
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: "12px", fontWeight: "700", color: "#0F172A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {t("dash_link_check", "Link Check")}
            </div>
            <span style={{ fontSize: "10px", color: "#64748B", display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {t("dash_link_check_sub", "Inspect URL safety")}
            </span>
          </div>
        </div>
      </div>

      {/* 7. Section: Recent Activity */}
      <div style={{ width: "100%", boxSizing: "border-box" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: "800", color: "#0F172A", margin: 0 }}>
            {t("dash_recent_activity", "Recent Activity")}
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
              padding: "2px 4px",
            }}
          >
            {t("btn_view_all", "View All →")}
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
            <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
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
                  flexShrink: 0,
                }}
              >
                <ArrowUpRight size={18} />
              </div>
              <div style={{ minWidth: 0 }}>
                <h5 style={{ fontSize: "12.5px", fontWeight: "700", color: "#0F172A", margin: 0 }}>
                  UPI Payment
                </h5>
                <span style={{ fontSize: "10.5px", color: "#64748B" }}>
                  Security Premium • Today, 9:14 AM
                </span>
              </div>
            </div>
            <span style={{ fontSize: "13px", fontWeight: "800", color: "#EF4444", flexShrink: 0 }}>
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
            <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
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
                  flexShrink: 0,
                }}
              >
                <ArrowDownLeft size={18} />
              </div>
              <div style={{ minWidth: 0 }}>
                <h5 style={{ fontSize: "12.5px", fontWeight: "700", color: "#0F172A", margin: 0 }}>
                  Received
                </h5>
                <span style={{ fontSize: "10.5px", color: "#64748B" }}>
                  Salary Credit • Yesterday, 4:32 PM
                </span>
              </div>
            </div>
            <span style={{ fontSize: "13px", fontWeight: "800", color: "#10B981", flexShrink: 0 }}>
              + ₹ 25,000
            </span>
          </div>
        </div>
      </div>

      {/* 8. Demo Presets Section (for Hackathon Evaluation) */}
      <div style={{ width: "100%", boxSizing: "border-box" }}>
        <DemoPresetBar onSelectCase={onSelectDemoCase} />
      </div>
    </div>
  );
}
