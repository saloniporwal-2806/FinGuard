import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { FinGuardLogo } from "../components/FinGuardLogo";

export function SplashScreen({ onFinish }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F0F4FF 40%, #E0EAFF 70%, #CBDCFE 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "36px 24px 32px 24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Mountainscape Vector Illustration with River of Light */}
      <svg
        style={{
          position: "absolute",
          bottom: "110px",
          left: 0,
          right: 0,
          width: "100%",
          height: "260px",
          zIndex: 1,
          pointerEvents: "none",
        }}
        viewBox="0 0 400 260"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="mtnBack" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="mtnMid" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818CF8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="riverGlow" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
        </defs>

        {/* Far mountains */}
        <path d="M-20 180 L80 100 L180 160 L280 80 L420 190 L420 260 L-20 260 Z" fill="url(#mtnBack)" />
        {/* Mid hills */}
        <path d="M-20 210 L120 140 L220 190 L340 130 L420 220 L420 260 L-20 260 Z" fill="url(#mtnMid)" />
        {/* Glowing River of Light winding through */}
        <path
          d="M200 130 Q 185 170 215 200 T 170 260 L 230 260 Q 240 210 215 170 T 205 130 Z"
          fill="url(#riverGlow)"
          opacity="0.9"
        />
      </svg>

      {/* Top Branding Section */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        <div style={{ marginBottom: "16px" }}>
          <FinGuardLogo size={110} withGlow={true} />
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "36px",
            fontWeight: "800",
            color: "#0F172A",
            letterSpacing: "-0.5px",
            lineHeight: 1.1,
            marginBottom: "6px",
          }}
        >
          FinGuard
        </h1>
        <p
          style={{
            fontSize: "14px",
            color: "#475569",
            fontWeight: "600",
            letterSpacing: "0.2px",
          }}
        >
          Smarter Finance. Safer You.
        </p>
      </div>

      {/* Bottom CTA Section */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <button
          className="btn-primary"
          onClick={onFinish}
          style={{
            width: "100%",
            padding: "16px 24px",
            fontSize: "16px",
            borderRadius: "9999px",
            boxShadow: "0 10px 25px rgba(79, 70, 229, 0.4)",
          }}
        >
          <span>Get Started</span>
          <ArrowRight size={18} />
        </button>

        <p style={{ fontSize: "12.5px", color: "#64748B", fontWeight: "500" }}>
          Already have an account?{" "}
          <span
            onClick={onFinish}
            style={{ color: "#4F46E5", fontWeight: "700", cursor: "pointer" }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
