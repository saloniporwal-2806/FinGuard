import React from "react";
import { ArrowLeft, Utensils, Plane, ShoppingBag, Film, MoreHorizontal, Plus } from "lucide-react";

export function BudgetScreen({ onBack, onSetBudget }) {
  const totalBudget = 15000;
  const spentAmount = 9420;
  const remainingAmount = totalBudget - spentAmount;
  const spentPct = Math.round((spentAmount / totalBudget) * 100);

  const categories = [
    { name: "Food & Dining", spent: 4200, total: 6000, color: "#4F46E5", icon: Utensils },
    { name: "Travel & Fuel", spent: 2150, total: 3500, color: "#06B6D4", icon: Plane },
    { name: "Shopping", spent: 1870, total: 3000, color: "#A855F7", icon: ShoppingBag },
    { name: "Entertainment", spent: 1200, total: 2500, color: "#F472B6", icon: Film },
  ];

  // SVG Donut metrics
  const size = 160;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (spentPct / 100) * circumference;

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
      {/* Standardized Consistent Header */}
      <Header
        title="My Budget"
        subtitle="September 2026 • Monthly Goals"
        showBack={true}
        onBack={onBack}
      />

      <div className="screen-content" style={{ flex: 1, padding: "18px 20px" }}>
        {/* Donut Chart Card matching Mockup */}
        <div
          className="card"
          style={{
            background: "#FFFFFF",
            borderRadius: "24px",
            padding: "20px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            border: "1.5px solid #E2E8F0",
          }}
        >
          {/* Circular Donut Ring */}
          <div style={{ position: "relative", width: size, height: size }}>
            <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#E2E8F0"
                strokeWidth={strokeWidth}
                fill="none"
              />
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="url(#budgetGrad)"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
              />
              <defs>
                <linearGradient id="budgetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="50%" stopColor="#EC4899" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>

            {/* Inner Text */}
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
              <span style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: "800", color: "#0F172A", lineHeight: 1.1 }}>
                ₹ 8,250
              </span>
              <span style={{ fontSize: "10px", color: "#64748B", marginTop: "2px" }}>
                of 15,000
              </span>
            </div>
          </div>

          {/* Remaining Indicator */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>
              Remaining
            </span>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "800", color: "#10B981" }}>
              ₹ 6,750
            </div>
            <span
              style={{
                fontSize: "10px",
                fontWeight: "700",
                color: "#059669",
                background: "#ECFDF5",
                padding: "2px 8px",
                borderRadius: "9999px",
                width: "fit-content",
              }}
            >
              55% used
            </span>
          </div>
        </div>

        {/* Categories Breakdown List matching Mockup */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "16px",
                  padding: "12px 14px",
                  border: "1px solid #E2E8F0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: cat.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: cat.color,
                    }}
                  >
                    <Icon size={18} />
                  </div>

                  <div>
                    <h5 style={{ fontSize: "12.5px", fontWeight: "700", color: "#0F172A" }}>
                      {cat.name}
                    </h5>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "12.5px", fontWeight: "800", color: "#0F172A" }}>
                    {cat.amount}
                  </span>
                  <div style={{ fontSize: "10px", color: "#94A3B8" }}>
                    {cat.pct}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button: Set New Budget */}
        <button
          className="btn-accent"
          onClick={onSetBudget || onBack}
          style={{
            marginTop: "6px",
            background: "linear-gradient(135deg, #06B6D4 0%, #4F46E5 100%)",
            padding: "14px 20px",
            borderRadius: "16px",
          }}
        >
          <Plus size={16} />
          <span>Set New Budget</span>
        </button>
      </div>
    </div>
  );
}
