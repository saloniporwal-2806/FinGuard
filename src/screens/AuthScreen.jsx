import React, { useState } from "react";
import { Mail, Lock, User, ArrowRight, ShieldCheck, AlertCircle, Eye, EyeOff, Sparkles } from "lucide-react";
import { FinGuardLogo } from "../components/FinGuardLogo";
import { AuthService } from "../services/authService";

export function AuthScreen({ onAuthSuccess, onBack }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e?.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      let result;
      if (isSignUp) {
        result = AuthService.signup(name, email, password);
      } else {
        result = AuthService.login(email, password);
      }

      setIsLoading(false);
      if (result.success) {
        if (onAuthSuccess) onAuthSuccess(result.user);
      } else {
        setError(result.error);
      }
    }, 400);
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      const result = AuthService.login("alex@example.com", "finguard123");
      setIsLoading(false);
      if (result.success && onAuthSuccess) {
        onAuthSuccess(result.user);
      }
    }, 300);
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "24px 20px 32px 20px",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 60%, #EEF2F6 100%)",
        boxSizing: "border-box",
      }}
    >
      {/* Top Header & Branding */}
      <div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "16px", marginBottom: "16px" }}>
          <FinGuardLogo size={84} withGlow={true} />
        </div>

        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "26px",
              fontWeight: "800",
              color: "#0F172A",
              lineHeight: 1.2,
            }}
          >
            {isSignUp ? "Create Your Account" : "Welcome to FinGuard"}
          </h1>
          <p style={{ fontSize: "13.5px", color: "#64748B", marginTop: "6px" }}>
            {isSignUp
              ? "Join the proactive safety layer for your finances"
              : "Sign in to access your scam defense & literacy hub"}
          </p>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: "flex",
            background: "#E2E8F0",
            borderRadius: "9999px",
            padding: "4px",
            marginBottom: "20px",
          }}
        >
          <button
            type="button"
            onClick={() => {
              setIsSignUp(false);
              setError("");
            }}
            style={{
              flex: 1,
              padding: "10px 0",
              borderRadius: "9999px",
              fontSize: "13.5px",
              fontWeight: "700",
              color: !isSignUp ? "#0F172A" : "#64748B",
              background: !isSignUp ? "#FFFFFF" : "transparent",
              boxShadow: !isSignUp ? "0 2px 8px rgba(0, 0, 0, 0.08)" : "none",
              transition: "all 0.2s ease",
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setIsSignUp(true);
              setError("");
            }}
            style={{
              flex: 1,
              padding: "10px 0",
              borderRadius: "9999px",
              fontSize: "13.5px",
              fontWeight: "700",
              color: isSignUp ? "#0F172A" : "#64748B",
              background: isSignUp ? "#FFFFFF" : "transparent",
              boxShadow: isSignUp ? "0 2px 8px rgba(0, 0, 0, 0.08)" : "none",
              transition: "all 0.2s ease",
            }}
          >
            Create Account
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "#FEF2F2",
              border: "1px solid #FECACA",
              borderRadius: "12px",
              padding: "10px 14px",
              color: "#DC2626",
              fontSize: "12.5px",
              marginBottom: "16px",
            }}
          >
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {isSignUp && (
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: "700",
                  color: "#334155",
                  marginBottom: "6px",
                }}
              >
                Full Name
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "#FFFFFF",
                  border: "1.5px solid #CBD5E1",
                  borderRadius: "14px",
                  padding: "12px 14px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
                }}
              >
                <User size={18} color="#94A3B8" />
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    border: "none",
                    outline: "none",
                    width: "100%",
                    fontSize: "14px",
                    color: "#0F172A",
                    background: "transparent",
                  }}
                />
              </div>
            </div>
          )}

          <div>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: "700",
                color: "#334155",
                marginBottom: "6px",
              }}
            >
              Email Address
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "#FFFFFF",
                border: "1.5px solid #CBD5E1",
                borderRadius: "14px",
                padding: "12px 14px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
              }}
            >
              <Mail size={18} color="#94A3B8" />
              <input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoCapitalize="none"
                autoComplete="email"
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  fontSize: "14px",
                  color: "#0F172A",
                  background: "transparent",
                }}
              />
            </div>
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: "700",
                color: "#334155",
                marginBottom: "6px",
              }}
            >
              Password
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "#FFFFFF",
                border: "1.5px solid #CBD5E1",
                borderRadius: "14px",
                padding: "12px 14px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
              }}
            >
              <Lock size={18} color="#94A3B8" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={isSignUp ? "new-password" : "current-password"}
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  fontSize: "14px",
                  color: "#0F172A",
                  background: "transparent",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8" }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary"
            style={{
              marginTop: "8px",
              padding: "14px",
              borderRadius: "14px",
              fontSize: "15px",
              fontWeight: "700",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <span>{isLoading ? "Authenticating..." : isSignUp ? "Create FinGuard Account" : "Sign In"}</span>
            <ArrowRight size={17} />
          </button>
        </form>
      </div>

      {/* Quick 1-Click Demo Login for Evaluators & Privacy note */}
      <div style={{ marginTop: "24px", textAlign: "center" }}>
        <button
          type="button"
          onClick={handleDemoLogin}
          style={{
            background: "rgba(79, 70, 229, 0.08)",
            border: "1px dashed #A5B4FC",
            borderRadius: "12px",
            padding: "10px 16px",
            fontSize: "12.5px",
            fontWeight: "700",
            color: "#4F46E5",
            cursor: "pointer",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            marginBottom: "12px",
          }}
        >
          <Sparkles size={15} />
          <span>Quick 1-Click Demo Login (Evaluator / Test Account)</span>
        </button>

        <p style={{ fontSize: "11px", color: "#94A3B8" }}>
          Zero Credential Storage • 100% Privacy Protected
        </p>
      </div>
    </div>
  );
}
