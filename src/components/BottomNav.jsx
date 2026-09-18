import React from "react";
import { Home, BookOpen, QrCode, PieChart, User } from "lucide-react";

export function BottomNav({ currentScreen, onNavigate }) {
  const navItems = [
    { id: "dashboard", label: "Home", icon: Home },
    { id: "learn-hub", label: "Learn", icon: BookOpen },
    { id: "scan-pay", label: "Scan", icon: QrCode, isCenter: true },
    { id: "budget", label: "Goals", icon: PieChart },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          currentScreen === item.id ||
          (item.id === "learn-hub" && (currentScreen === "topic-detail" || currentScreen === "mini-quiz" || currentScreen === "financial-education")) ||
          (item.id === "profile" && currentScreen === "settings");

        if (item.isCenter) {
          return (
            <button
              key={item.id}
              className="nav-item scan-center-btn"
              onClick={() => onNavigate(item.id)}
              title="Scan & Pay"
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
