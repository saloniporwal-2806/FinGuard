import React, { useState } from "react";
import {
  Award,
  Bookmark,
  Bell,
  Globe,
  HelpCircle,
  Info,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  Edit3,
  Camera,
  LogOut,
  X,
  Check,
  User,
  Mail,
  AlertCircle,
} from "lucide-react";
import { Header } from "../components/Header";
import { StorageService } from "../services/storageService";
import { AuthService } from "../services/authService";
import { useLanguage } from "../context/LanguageContext";

export function ProfileSettingsScreen({
  currentUser,
  onNavigate,
  onResetData,
  onUpdateProfile,
  onLogout,
  onBack,
}) {
  const { language, setLanguage, t } = useLanguage();
  const [resetSuccess, setResetSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [editName, setEditName] = useState(currentUser?.name || "");
  const [editEmail, setEditEmail] = useState(currentUser?.email || "");
  const [editAvatar, setEditAvatar] = useState(currentUser?.avatar || null);
  const [editError, setEditError] = useState("");
  const [editSuccess, setEditSuccess] = useState(false);

  const getInitials = (name) => {
    if (!name) return "FG";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const menuItems = [
    {
      id: "progress",
      label: t("profile_progress", "My Progress"),
      subtitle: `2/10 ${t("profile_progress_sub", "lessons completed")}`,
      icon: Award,
      color: "#F59E0B",
      action: () => onNavigate("learn-hub"),
    },
    {
      id: "saved",
      label: t("profile_saved", "Saved Articles"),
      subtitle: t("profile_saved_sub", "Review bookmarked security tips"),
      icon: Bookmark,
      color: "#3B82F6",
      action: () => onNavigate("learn-hub"),
    },
    {
      id: "notifications",
      label: t("profile_notifications", "Notifications"),
      subtitle: `3 new ${t("profile_notifications_sub", "security alerts")}`,
      badge: "3",
      icon: Bell,
      color: "#EF4444",
      action: () => onNavigate("history"),
    },
    {
      id: "language",
      label: t("profile_language", "Language"),
      subtitle: language === "hi" ? "हिंदी (Hindi)" : "English",
      icon: Globe,
      color: "#10B981",
      action: () => setShowLanguageModal(true),
    },
    {
      id: "help",
      label: t("profile_help", "Help & Support"),
      subtitle: t("profile_help_sub", "FAQs and cyber helplines (1930)"),
      icon: HelpCircle,
      color: "#8B5CF6",
      action: () => onNavigate("ai-assistant"),
    },
    {
      id: "about",
      label: t("profile_about", "About FinGuard"),
      subtitle: t("profile_about_sub", "Version 1.0 • Prototype"),
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

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setEditError("Image size must be less than 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setEditAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e) => {
    e?.preventDefault();
    setEditError("");

    if (!editName.trim()) {
      setEditError("Name cannot be empty.");
      return;
    }

    if (!editEmail.trim()) {
      setEditError("Email cannot be empty.");
      return;
    }

    const res = AuthService.updateProfile(currentUser?.id, {
      name: editName.trim(),
      email: editEmail.trim(),
      avatar: editAvatar,
    });

    if (res.success) {
      setEditSuccess(true);
      if (onUpdateProfile) onUpdateProfile(res.user);
      setTimeout(() => {
        setEditSuccess(false);
        setIsEditing(false);
      }, 1200);
    } else {
      setEditError(res.error || "Failed to update profile.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#F8FAFC",
        overflowY: "auto",
      }}
    >
      {/* Standardized Consistent Header with Back Button */}
      <Header
        title="Profile & Settings"
        subtitle="Manage your personal credentials and safety settings"
        showBack={true}
        onBack={onBack || (() => onNavigate("dashboard"))}
      />

      <div className="screen-content" style={{ flex: 1, padding: "16px 20px 84px 20px" }}>
        {/* Dynamic Profile Card */}
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
            position: "relative",
          }}
        >
          {/* Edit Profile Action Trigger */}
          <button
            onClick={() => {
              setEditName(currentUser?.name || "");
              setEditEmail(currentUser?.email || "");
              setEditAvatar(currentUser?.avatar || null);
              setEditError("");
              setIsEditing(true);
            }}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              background: "#EEF2FF",
              border: "1px solid #C7D2FE",
              color: "#4F46E5",
              borderRadius: "9999px",
              padding: "6px 12px",
              fontSize: "11px",
              fontWeight: "700",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <Edit3 size={13} />
            <span>Edit</span>
          </button>

          {/* Avatar with gradient border */}
          <div
            style={{
              width: "76px",
              height: "76px",
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
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
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
                {getInitials(currentUser?.name)}
              </div>
            )}
          </div>

          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "18px",
              fontWeight: "800",
              color: "#0F172A",
            }}
          >
            {currentUser?.name || "FinGuard User"}
          </h3>
          <span style={{ fontSize: "12px", color: "#64748B", marginTop: "2px" }}>
            {currentUser?.email || "user@finguard.ai"}
          </span>

          <div
            style={{
              marginTop: "10px",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "4px 14px",
              borderRadius: "9999px",
              background: "#EEF2FF",
              color: "#4F46E5",
              fontSize: "11px",
              fontWeight: "700",
              border: "1px solid #C7D2FE",
            }}
          >
            <Award size={13} />
            <span>{currentUser?.level || "Level 2 - Protected"}</span>
          </div>
        </div>

        {/* Menu Items List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
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
                    <h5 style={{ fontSize: "13px", fontWeight: "700", color: "#0F172A" }}>
                      {item.label}
                    </h5>
                    <span style={{ fontSize: "11px", color: "#64748B" }}>
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

        {/* Log Out & Reset Section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "16px" }}>
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Are you sure you want to log out of FinGuard AI?")) {
                AuthService.logout();
                if (onLogout) onLogout();
              }
            }}
            style={{
              background: "#FFF1F2",
              border: "1.5px solid #FECDD3",
              borderRadius: "16px",
              padding: "14px",
              color: "#E11D48",
              fontSize: "13.5px",
              fontWeight: "700",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              width: "100%",
              transition: "all 0.2s ease",
            }}
          >
            <LogOut size={16} />
            <span>Log Out</span>
          </button>

          <button
            className="btn-secondary"
            onClick={handleReset}
            style={{
              borderRadius: "14px",
              padding: "10px 14px",
              fontSize: "12px",
              width: "100%",
            }}
          >
            <RotateCcw size={14} />
            <span>Reset Demo Data to Initial State</span>
          </button>
        </div>

        {resetSuccess && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              color: "#059669",
              fontSize: "12px",
              fontWeight: "700",
              marginTop: "8px",
            }}
          >
            <CheckCircle2 size={14} />
            <span>Demo data reset successfully!</span>
          </div>
        )}
      </div>

      {/* Edit Profile Modal Dialog */}
      {isEditing && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "24px",
              width: "100%",
              maxWidth: "380px",
              padding: "24px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.25)",
              position: "relative",
            }}
          >
            {/* Modal Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: "800", color: "#0F172A" }}>
                Edit Profile
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                style={{ background: "#F1F5F9", border: "none", borderRadius: "50%", padding: "6px", cursor: "pointer" }}
              >
                <X size={16} color="#64748B" />
              </button>
            </div>

            {/* Error Message */}
            {editError && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "#FEF2F2",
                  border: "1px solid #FECACA",
                  borderRadius: "10px",
                  padding: "8px 12px",
                  color: "#DC2626",
                  fontSize: "12px",
                  marginBottom: "14px",
                }}
              >
                <AlertCircle size={14} />
                <span>{editError}</span>
              </div>
            )}

            {/* Success Message */}
            {editSuccess && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "#ECFDF5",
                  border: "1px solid #A7F3D0",
                  borderRadius: "10px",
                  padding: "8px 12px",
                  color: "#059669",
                  fontSize: "12px",
                  marginBottom: "14px",
                }}
              >
                <Check size={14} />
                <span>Profile updated successfully!</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {/* Profile Picture Upload Section */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    background: "#F1F5F9",
                    border: "2px dashed #CBD5E1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {editAvatar ? (
                    <img src={editAvatar} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <User size={30} color="#94A3B8" />
                  )}
                </div>

                <label
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "5px 12px",
                    borderRadius: "9999px",
                    background: "#EEF2FF",
                    color: "#4F46E5",
                    fontSize: "11px",
                    fontWeight: "700",
                    cursor: "pointer",
                    border: "1px solid #C7D2FE",
                  }}
                >
                  <Camera size={13} />
                  <span>{editAvatar ? "Change Photo" : "Upload Photo"}</span>
                  <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: "none" }} />
                </label>
              </div>

              {/* Name Input */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>
                  Name
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", border: "1.5px solid #CBD5E1", borderRadius: "12px", padding: "10px 12px" }}>
                  <User size={16} color="#94A3B8" />
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    style={{ border: "none", outline: "none", width: "100%", fontSize: "13.5px" }}
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>
                  Email
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", border: "1.5px solid #CBD5E1", borderRadius: "12px", padding: "10px 12px" }}>
                  <Mail size={16} color="#94A3B8" />
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    style={{ border: "none", outline: "none", width: "100%", fontSize: "13.5px" }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: "12px",
                    background: "#F1F5F9",
                    color: "#475569",
                    fontSize: "13.5px",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: "12px",
                    fontSize: "13.5px",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Language Selection Modal */}
      {showLanguageModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.7)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "24px",
              padding: "20px",
              width: "100%",
              maxWidth: "340px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Globe size={18} color="#4F46E5" />
                <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A" }}>
                  {t("profile_language_select", "Select Language")}
                </h3>
              </div>
              <button onClick={() => setShowLanguageModal(false)} style={{ color: "#94A3B8" }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {/* English Option */}
              <div
                onClick={() => {
                  setLanguage("en");
                  setShowLanguageModal(false);
                }}
                style={{
                  padding: "14px 16px",
                  borderRadius: "16px",
                  border: "1.5px solid",
                  borderColor: language === "en" ? "#4F46E5" : "#E2E8F0",
                  background: language === "en" ? "#EEF2FF" : "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "800", color: language === "en" ? "#4F46E5" : "#0F172A" }}>
                    English
                  </div>
                  <span style={{ fontSize: "11px", color: "#64748B" }}>Default</span>
                </div>
                {language === "en" && (
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: "#4F46E5",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Check size={14} />
                  </div>
                )}
              </div>

              {/* Hindi Option */}
              <div
                onClick={() => {
                  setLanguage("hi");
                  setShowLanguageModal(false);
                }}
                style={{
                  padding: "14px 16px",
                  borderRadius: "16px",
                  border: "1.5px solid",
                  borderColor: language === "hi" ? "#4F46E5" : "#E2E8F0",
                  background: language === "hi" ? "#EEF2FF" : "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "800", color: language === "hi" ? "#4F46E5" : "#0F172A" }}>
                    हिंदी (Hindi)
                  </div>
                  <span style={{ fontSize: "11px", color: "#64748B" }}>भारतीय भाषा</span>
                </div>
                {language === "hi" && (
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: "#4F46E5",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Check size={14} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
