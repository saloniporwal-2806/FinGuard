import React from "react";
import { Home, BookOpen, QrCode, PieChart, User } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function BottomNav({ currentScreen, onNavigate }) {
  const { t } = useLanguage();

  const navItems = [
    { id: "dashboard", label: t("nav_home", "Home"), icon: Home },
    { id: "learn-hub", label: t("nav_learn", "Learn"), icon: BookOpen },
    { id: "scan-pay", label: t("nav_scan", "Scan"), icon: QrCode, isCenter: true },
    { id: "budget", label: t("nav_goals", "Goals"), icon: PieChart },
    { id: "profile", label: t("nav_profile", "Profile"), icon: User },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          currentScreen === item.id ||
          (item.id === "budget" && (currentScreen === "budget" || currentScreen === "goals" || currentScreen === "goal")) ||
          (item.id === "learn-hub" && (currentScreen === "topic-detail" || currentScreen === "mini-quiz" || currentScreen === "financial-education")) ||
          (item.id === "profile" && currentScreen === "settings");

        if (item.isCenter) {
          return (
            <button
              key={item.id}
              className="nav-item scan-center-btn"
              onClick={() => onNavigate(item.id)}
              title={t("dash_quick_scan", "Scan & Pay")}
            >
              <div className="scan-center-circle">
                <Icon size={24} />
              </div>
              <span style={{ marginTop: "2px", fontWeight: "700" }}>{item.label}</span>
            </button>
          );
        }

        return (
          <button
            key={item.id}
            className={`nav-item ${isActive ? "active" : ""}`}
            onClick={() => onNavigate(item.id)}
          >
            <div className="nav-icon-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon size={20} />
            </div>
            <span style={{ marginTop: "3px" }}>{item.label}</span>
            {isActive && <div className="nav-indicator" />}
          </button>
        );
      })}
    </nav>
  );
}
