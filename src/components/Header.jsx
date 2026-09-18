import React from "react";
import { ArrowLeft, Settings } from "lucide-react";
import { FinGuardLogo } from "./FinGuardLogo";

export function Header({
  title,
  subtitle,
  onBack,
  onSettings,
  dark = false,
  showBack = false,
  rightAction = null,
}) {
  const shouldShowBack = showBack || Boolean(onBack);

  return (
    <header className={`app-header ${dark ? "dark" : ""}`}>
      <div className="header-left">
        {shouldShowBack ? (
          <button
            type="button"
            className="icon-btn back-btn"
            onClick={onBack}
            aria-label="Go back"
            title="Go back"
          >
            <ArrowLeft size={18} />
          </button>
        ) : (
          <div className="header-shield-icon">
            <FinGuardLogo size={32} withGlow={false} />
          </div>
        )}

        <div className="header-text">
          <h1 className="header-title">{title}</h1>
          {subtitle && <p className="header-subtitle">{subtitle}</p>}
        </div>
      </div>

      <div className="header-right">
        {rightAction}
        {onSettings && (
          <button
            type="button"
            className="icon-btn settings-btn"
            onClick={onSettings}
            title="Settings & About FinGuard"
            aria-label="Settings"
          >
            <Settings size={18} />
          </button>
        )}
      </div>
    </header>
  );
}
