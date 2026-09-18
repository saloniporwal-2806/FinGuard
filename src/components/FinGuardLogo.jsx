import React from "react";

/**
 * FinGuard Logo matching the design mockup:
 * Shield with cyan-to-indigo gradient and bold letter "F".
 */
export function FinGuardLogo({ size = 48, withGlow = true }) {
  const gradientId = `fg-grad-${size}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        filter: withGlow ? "drop-shadow(0 8px 16px rgba(79, 70, 229, 0.35))" : "none",
      }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="45%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
      </defs>

      {/* Shield Base */}
      <path
        d="M24 4L7 9.5V23C7 33.2 14.2 41.8 24 44C33.8 41.8 41 33.2 41 23V9.5L24 4Z"
        fill={`url(#${gradientId})`}
      />

      {/* Inner Shield Accent Contour */}
      <path
        d="M24 7L10 11.5V23C10 31.5 16 38.8 24 40.8C32 38.8 38 31.5 38 23V11.5L24 7Z"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1.5"
      />

      {/* White Letter "F" */}
      <path
        d="M19 16H29.5M19 23H26.5M19 16V32"
        stroke="#FFFFFF"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
