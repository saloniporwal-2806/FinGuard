import React, { useEffect, useState } from "react";

export function CircularRiskScore({ score = 0, level = "LOW RISK", size = 160, strokeWidth = 14, showLabel = true }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = Math.min(100, Math.max(0, score));
    if (end === 0) {
      setAnimatedScore(0);
      return;
    }
    const duration = 800; // ms
    const stepTime = 16;
    const totalSteps = duration / stepTime;
    const increment = end / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setAnimatedScore(end);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.round(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (animatedScore / 100) * circumference;

  let color = "#10B981"; // Low risk green
  let glowColor = "rgba(16, 185, 129, 0.25)";
  if (score >= 70) {
    color = "#EF4444"; // High risk red
    glowColor = "rgba(239, 68, 68, 0.3)";
  } else if (score >= 40) {
    color = "#F59E0B"; // Medium risk orange
    glowColor = "rgba(245, 158, 11, 0.25)";
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)", filter: `drop-shadow(0 4px 12px ${glowColor})` }}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated Progress Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={progressOffset}
            strokeLinecap="round"
            fill="transparent"
            style={{
              transition: "stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.4s ease",
            }}
          />
        </svg>

        {/* Center Content */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: size > 140 ? "42px" : "32px",
              fontWeight: "800",
              color: "#0F172A",
              lineHeight: 1,
            }}
          >
            {animatedScore}
          </span>
          <span
            style={{
              fontSize: "11px",
              fontWeight: "600",
              color: "#64748B",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginTop: "4px",
            }}
          >
            / 100
          </span>
        </div>
      </div>

      {showLabel && (
        <div
          style={{
            marginTop: "12px",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "5px 14px",
            borderRadius: "9999px",
            backgroundColor: score >= 70 ? "#FEF2F2" : score >= 40 ? "#FFFBEB" : "#ECFDF5",
            border: `1px solid ${score >= 70 ? "#FECACA" : score >= 40 ? "#FDE68A" : "#A7F3D0"}`,
            color: score >= 70 ? "#991B1B" : score >= 40 ? "#92400E" : "#065F46",
            fontSize: "12px",
            fontWeight: "700",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: color,
              display: "inline-block",
            }}
          />
          {level}
        </div>
      )}
    </div>
  );
}
