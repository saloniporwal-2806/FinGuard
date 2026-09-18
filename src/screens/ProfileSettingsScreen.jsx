import React, { useState } from "react";
import {
  Award,
  Bookmark,
  Bell,
  Globe,
  HelpCircle,
  Info,
  ChevronRight,
  Gift,
  RotateCcw,
  CheckCircle2,
  Shield,
} from "lucide-react";
import { StorageService } from "../services/storageService";

export function ProfileSettingsScreen({ onNavigate, onResetData }) {
  const [resetSuccess, setResetSuccess] = useState(false);

  const menuItems = [
    {
      id: "progress",
      label: "My Progress",
      subtitle: "2/10 lessons completed",
      icon: Award,
      color: "#F59E0B",
      action: () => onNavigate("learn-hub"),
    },
    {
      id: "saved",
      label: "Saved Articles",
      subtitle: "Review bookmarked security tips",
      icon: Bookmark,
      color: "#3B82F6",
      action: () => onNavigate("learn-hub"),
    },
    {
      id: "notifications",
      label: "Notifications",
      subtitle: "3 new security alerts",
      badge: "3",
      icon: Bell,
      color: "#EF4444",
      action: () => onNavigate("history"),
    },
    {
      id: "language",
      label: "Language",
      subtitle: "English",
      icon: Globe,
      color: "#10B981",
      action: null,
    },
    {
      id: "help",
      label: "Help & Support",
      subtitle: "FAQs and cyber helplines (1930)",
      icon: HelpCircle,
      color: "#8B5CF6",
      action: () => onNavigate("ai-assistant"),
    },
    {
      id: "about",
      label: "About FinGuard",
      subtitle: "Version 1.0 • Prototype",
      icon: Info,
      color: "#06B6D4",
      action: () => onNavigate("settings"),
    },
  ];

  const handleReset = () => {
    if (window.confirm("Reset all prototype demo data, scans, and quiz progress?")) {
      StorageService.resetAllData();
      setResetSuccess(true);
      if (onResetData) onResetData();
      setTimeout(() => setResetSuccess(false), 2500);
    }
  };

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
      <div className="screen-content" style={{ flex: 1, padding: "20px" }}>
        {/* Profile Card matching Mockup Screen 10 */}
        <div
          className="card"
          style={{
            background: "#FFFFFF",
            borderRadius: "24px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            border: "1.5px solid #E2E8F0",
          }}
        >
          {/* Avatar with gradient border */}
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #4F46E5 0%, #A855F7 100%)",
              padding: "3px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 20px rgba(79, 70, 229, 0.25)",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background: "#1E293B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                fontSize: "24px",
                fontWeight: "800",
              }}
            >
              AR
            </div>
          </div>

          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: "800", color: "#0F172A" }}>
            Aryan Rathore
          </h3>
          <span style={{ fontSize: "11px", color: "#64748B", marginTop: "2px" }}>
            aryanrathore@example.com
          </span>

          <div
            style={{
              marginTop: "8px",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "3px 12px",
              borderRadius: "9999px",
              background: "#EEF2FF",
              color: "#4F46E5",
              fontSize: "10.5px",
              fontWeight: "700",
              border: "1px solid #C7D2FE",
            }}
          >
            <Award size={12} />
            Level 2 - Learner
          </div>
        </div>

        {/* Menu Items List matching Mockup */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={item.action}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "16px",
                  padding: "12px 14px",
                  border: "1px solid #E2E8F0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: item.action ? "pointer" : "default",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: `${item.color}15`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: item.color,
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <h5 style={{ fontSize: "12.5px", fontWeight: "700", color: "#0F172A" }}>
                      {item.label}
                    </h5>
                    <span style={{ fontSize: "10.5px", color: "#64748B" }}>
                      {item.subtitle}
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  {item.badge && (
                    <span
                      style={{
                        background: "#EF4444",
                        color: "#FFFFFF",
                        fontSize: "10px",
                        fontWeight: "700",
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight size={16} color="#94A3B8" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Invite Friends Referral Card matching Mockup */}
        <div
          className="card"
          style={{
            background: "linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)",
            color: "#FFFFFF",
            padding: "14px 16px",
            borderRadius: "18px",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 6px 16px rgba(6, 182, 212, 0.25)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Gift size={20} color="#FFFFFF" />
            </div>
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: "800" }}>
                Invite Friends
              </h4>
              <span style={{ fontSize: "11px", color: "#E0F2FE" }}>
                Get ₹50 cashback
              </span>
            </div>
          </div>
          <ChevronRight size={18} color="#FFFFFF" />
        </div>

        {/* Factory Reset Action */}
        <button
          className="btn-secondary"
          onClick={handleReset}
          style={{ marginTop: "4px" }}
        >
          <RotateCcw size={15} />
          <span>Reset Demo Data to Initial State</span>
        </button>

        {resetSuccess && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", color: "#059669", fontSize: "12px", fontWeight: "700" }}>
            <CheckCircle2 size={14} />
            <span>Demo data reset successfully!</span>
          </div>
        )}
      </div>
    </div>
  );
}
