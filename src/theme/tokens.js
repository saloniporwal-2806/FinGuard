/**
 * FinGuard Design Tokens (Matching high-fidelity mockup)
 * Palette:
 * - Primary (Indigo): #4F46E5
 * - Secondary (Cyan): #06B6D4
 * - Accent (Purple): #A855F7
 * - Highlight (Pink): #F472B6
 * - Background: #F8FAFC
 */
export const THEME = {
  colors: {
    primary: "#4F46E5",        // Indigo
    secondary: "#06B6D4",      // Cyan
    accent: "#A855F7",         // Purple
    highlight: "#F472B6",      // Pink
    background: "#F8FAFC",     // Crisp light gray/white
    cardBg: "#FFFFFF",
    cardBgGlass: "rgba(255, 255, 255, 0.95)",
    textPrimary: "#0F172A",    // Slate 900
    textSecondary: "#475569",  // Slate 600
    textMuted: "#94A3B8",      // Slate 400
    border: "#E2E8F0",
    borderLight: "#F1F5F9",

    // Gradients
    gradientHero: "linear-gradient(135deg, #4F46E5 0%, #A855F7 50%, #06B6D4 100%)",
    gradientButton: "linear-gradient(135deg, #4F46E5 0%, #A855F7 100%)",
    gradientAccent: "linear-gradient(135deg, #06B6D4 0%, #4F46E5 100%)",
    gradientPink: "linear-gradient(135deg, #A855F7 0%, #F472B6 100%)",
    gradientDark: "linear-gradient(180deg, #0B132B 0%, #1C2541 100%)",

    // Risk Status Colors
    low: {
      color: "#10B981",
      bg: "#ECFDF5",
      border: "#A7F3D0",
      text: "#065F46",
    },
    medium: {
      color: "#F59E0B",
      bg: "#FFFBEB",
      border: "#FDE68A",
      text: "#92400E",
    },
    high: {
      color: "#EF4444",
      bg: "#FEF2F2",
      border: "#FECACA",
      text: "#991B1B",
    },
  },
  typography: {
    fontDisplay: "'Outfit', sans-serif",
    fontBody: "'Plus Jakarta Sans', sans-serif",
  },
  shadows: {
    sm: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
    card: "0 10px 25px -4px rgba(79, 70, 229, 0.06), 0 4px 10px -2px rgba(0, 0, 0, 0.03)",
    elevated: "0 20px 35px -6px rgba(79, 70, 229, 0.12), 0 8px 16px -3px rgba(0, 0, 0, 0.04)",
    glow: "0 0 25px rgba(6, 182, 212, 0.35)",
    glowPurple: "0 0 25px rgba(168, 85, 247, 0.35)",
  },
  radii: {
    sm: "8px",
    md: "14px",
    lg: "20px",
    xl: "28px",
    pill: "9999px",
  },
};
