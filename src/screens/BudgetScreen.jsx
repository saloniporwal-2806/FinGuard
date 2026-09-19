import React, { useState } from "react";
import {
  Utensils,
  Plane,
  ShoppingBag,
  Film,
  Plus,
  Target,
  ShieldCheck,
  TrendingUp,
  X,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Header } from "../components/Header";
import { useLanguage } from "../context/LanguageContext";

export function BudgetScreen({ onBack, onSetBudget, initialTab = "budget" }) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(initialTab); // "budget" | "goals"

  // Budget State
  const [totalBudget, setTotalBudget] = useState(15000);
  const [showSetBudgetModal, setShowSetBudgetModal] = useState(false);
  const [newBudgetInput, setNewBudgetInput] = useState("15000");

  const categories = [
    {
      name: t("budget_cat_food", "Food & Dining"),
      spent: 4200,
      total: 6000,
      amount: "₹ 4,200",
      pct: "70% of ₹6k",
      color: "#4F46E5",
      bg: "#EEF2FF",
      icon: Utensils,
    },
    {
      name: t("budget_cat_travel", "Travel & Fuel"),
      spent: 2150,
      total: 3500,
      amount: "₹ 2,150",
      pct: "61% of ₹3.5k",
      color: "#06B6D4",
      bg: "#ECFEFF",
      icon: Plane,
    },
    {
      name: t("budget_cat_shopping", "Shopping"),
      spent: 1870,
      total: 3000,
      amount: "₹ 1,870",
      pct: "62% of ₹3k",
      color: "#A855F7",
      bg: "#FAF5FF",
      icon: ShoppingBag,
    },
    {
      name: t("budget_cat_entertainment", "Entertainment"),
      spent: 1200,
      total: 2500,
      amount: "₹ 1,200",
      pct: "48% of ₹2.5k",
      color: "#F472B6",
      bg: "#FDF2F8",
      icon: Film,
    },
  ];

  const spentAmount = categories.reduce((acc, c) => acc + c.spent, 0);
  const remainingAmount = Math.max(0, totalBudget - spentAmount);
  const spentPct = Math.min(100, Math.round((spentAmount / totalBudget) * 100));

  // SVG Donut metrics
  const size = 150;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (spentPct / 100) * circumference;

  // Goals State
  const [goals, setGoals] = useState([
    {
      id: "g1",
      title: "Emergency Safety Reserve",
      target: 50000,
      saved: 35000,
      monthly: 5000,
      color: "#10B981",
      bg: "#ECFDF5",
      deadline: "Dec 2026",
    },
    {
      id: "g2",
      title: "Work Laptop & Tech",
      target: 80000,
      saved: 48000,
      monthly: 8000,
      color: "#4F46E5",
      bg: "#EEF2FF",
      deadline: "Nov 2026",
    },
    {
      id: "g3",
      title: "Family Vacation Fund",
      target: 25000,
      saved: 18500,
      monthly: 3500,
      color: "#06B6D4",
      bg: "#ECFEFF",
      deadline: "Oct 2026",
    },
  ]);

  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [goalName, setGoalName] = useState("");
  const [goalTarget, setGoalTarget] = useState("");
  const [goalSaved, setGoalSaved] = useState("");

  const handleCreateGoal = (e) => {
    e?.preventDefault();
    if (!goalName.trim() || !goalTarget) return;

    const newGoal = {
      id: "g_" + Date.now(),
      title: goalName.trim(),
      target: parseFloat(goalTarget) || 10000,
      saved: parseFloat(goalSaved) || 0,
      monthly: Math.round((parseFloat(goalTarget) || 10000) / 6),
      color: "#A855F7",
      bg: "#FAF5FF",
      deadline: "2027",
    };

    setGoals((prev) => [newGoal, ...prev]);
    setGoalName("");
    setGoalTarget("");
    setGoalSaved("");
    setShowAddGoalModal(false);
  };

  const handleUpdateBudget = (e) => {
    e?.preventDefault();
    const val = parseFloat(newBudgetInput);
    if (!isNaN(val) && val > 0) {
      setTotalBudget(val);
      if (onSetBudget) onSetBudget(val);
    }
    setShowSetBudgetModal(false);
  };

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
        title={activeTab === "budget" ? t("budget_title", "My Budget") : t("goals_heading", "Financial Savings Goals")}
        subtitle={activeTab === "budget" ? t("budget_subtitle", "September 2026 • Monthly Goals") : t("goals_subtitle", "Track targets and protect long-term reserves")}
        showBack={true}
        onBack={onBack}
      />

      <div className="screen-content" style={{ flex: 1, padding: "16px 18px" }}>
        {/* Segmented Tab Switcher (Budget vs Goals) */}
        <div
          style={{
            display: "flex",
            background: "#E2E8F0",
            padding: "3px",
            borderRadius: "14px",
            gap: "4px",
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab("budget")}
            style={{
              flex: 1,
              padding: "9px 14px",
              borderRadius: "12px",
              fontWeight: "700",
              fontSize: "13px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
              background: activeTab === "budget" ? "#FFFFFF" : "transparent",
              color: activeTab === "budget" ? "#4F46E5" : "#64748B",
              boxShadow: activeTab === "budget" ? "0 2px 8px rgba(0, 0, 0, 0.08)" : "none",
            }}
          >
            {t("budget_tab_budget", "Budget")}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("goals")}
            style={{
              flex: 1,
              padding: "9px 14px",
              borderRadius: "12px",
              fontWeight: "700",
              fontSize: "13px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
              background: activeTab === "goals" ? "#FFFFFF" : "transparent",
              color: activeTab === "goals" ? "#4F46E5" : "#64748B",
              boxShadow: activeTab === "goals" ? "0 2px 8px rgba(0, 0, 0, 0.08)" : "none",
            }}
          >
            {t("budget_tab_goals", "Goals")}
          </button>
        </div>

        {/* TAB 1: BUDGET VIEW */}
        {activeTab === "budget" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "4px" }}>
            {/* Donut Chart Card */}
            <div
              className="card"
              style={{
                background: "#FFFFFF",
                borderRadius: "22px",
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
                      <stop offset="0%" stopColor="#06B6D4" />
                      <stop offset="50%" stopColor="#4F46E5" />
                      <stop offset="100%" stopColor="#A855F7" />
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
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: "800", color: "#0F172A", lineHeight: 1.1 }}>
                    ₹ {spentAmount.toLocaleString("en-IN")}
                  </span>
                  <span style={{ fontSize: "10px", color: "#64748B", marginTop: "2px" }}>
                    of ₹{totalBudget.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Remaining Indicator */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ fontSize: "11px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>
                  {t("budget_remaining", "Remaining")}
                </span>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "800", color: remainingAmount > 0 ? "#10B981" : "#EF4444" }}>
                  ₹ {remainingAmount.toLocaleString("en-IN")}
                </div>
                <span
                  style={{
                    fontSize: "10.5px",
                    fontWeight: "700",
                    color: spentPct > 90 ? "#DC2626" : "#059669",
                    background: spentPct > 90 ? "#FEF2F2" : "#ECFDF5",
                    padding: "2px 8px",
                    borderRadius: "9999px",
                    width: "fit-content",
                  }}
                >
                  {spentPct}% {t("budget_used", "used")}
                </span>
              </div>
            </div>

            {/* Categories Breakdown List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <span style={{ fontSize: "11px", fontWeight: "700", color: "#64748B", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Expense Breakdown
              </span>

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
                        <div style={{ fontSize: "10.5px", color: "#94A3B8" }}>
                          {cat.pct}
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontSize: "13px", fontWeight: "800", color: "#0F172A" }}>
                        {cat.amount}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Button: Set New Budget */}
            <button
              className="btn-accent"
              onClick={() => setShowSetBudgetModal(true)}
              style={{
                marginTop: "4px",
                background: "linear-gradient(135deg, #06B6D4 0%, #4F46E5 100%)",
                padding: "14px 20px",
                borderRadius: "16px",
              }}
            >
              <Plus size={16} />
              <span>{t("budget_set_new", "Set New Budget")}</span>
            </button>
          </div>
        )}

        {/* TAB 2: GOALS VIEW */}
        {activeTab === "goals" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "4px" }}>
            {/* Header Hero Banner */}
            <div
              style={{
                background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
                borderRadius: "20px",
                padding: "16px 18px",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", opacity: 0.9 }}>
                  Total Reserves Saved
                </span>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: "800", marginTop: "2px" }}>
                  ₹ {goals.reduce((acc, g) => acc + g.saved, 0).toLocaleString("en-IN")}
                </div>
                <div style={{ fontSize: "11px", opacity: 0.85, marginTop: "2px" }}>
                  Target: ₹ {goals.reduce((acc, g) => acc + g.target, 0).toLocaleString("en-IN")}
                </div>
              </div>

              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "rgba(255, 255, 255, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Target size={24} color="#FFFFFF" />
              </div>
            </div>

            {/* Goals List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {goals.map((goal) => {
                const pct = Math.min(100, Math.round((goal.saved / goal.target) * 100));
                return (
                  <div
                    key={goal.id}
                    className="card"
                    style={{
                      background: "#FFFFFF",
                      borderRadius: "18px",
                      padding: "14px 16px",
                      border: "1px solid #E2E8F0",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "10px",
                            background: goal.bg,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: goal.color,
                          }}
                        >
                          <Target size={18} />
                        </div>
                        <div>
                          <h4 style={{ fontSize: "13px", fontWeight: "700", color: "#0F172A" }}>
                            {goal.title}
                          </h4>
                          <span style={{ fontSize: "10.5px", color: "#64748B" }}>
                            Due {goal.deadline} • ₹{goal.monthly}/mo
                          </span>
                        </div>
                      </div>

                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "800",
                          color: goal.color,
                          background: goal.bg,
                          padding: "2px 8px",
                          borderRadius: "9999px",
                        }}
                      >
                        {pct}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div
                      style={{
                        width: "100%",
                        height: "8px",
                        background: "#F1F5F9",
                        borderRadius: "4px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${pct}%`,
                          height: "100%",
                          background: goal.color,
                          borderRadius: "4px",
                          transition: "width 0.4s ease",
                        }}
                      />
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#64748B", fontWeight: "600" }}>
                      <span>Saved: ₹{goal.saved.toLocaleString("en-IN")}</span>
                      <span>Target: ₹{goal.target.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add New Goal Button */}
            <button
              className="btn-accent"
              onClick={() => setShowAddGoalModal(true)}
              style={{
                marginTop: "4px",
                background: "linear-gradient(135deg, #10B981 0%, #06B6D4 100%)",
                padding: "14px 20px",
                borderRadius: "16px",
              }}
            >
              <Plus size={16} />
              <span>{t("goals_add_btn", "+ Add New Goal")}</span>
            </button>
          </div>
        )}
      </div>

      {/* Modal: Set Monthly Budget */}
      {showSetBudgetModal && (
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
              padding: "22px",
              width: "100%",
              maxWidth: "340px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A" }}>
                Update Monthly Budget
              </h3>
              <button onClick={() => setShowSetBudgetModal(false)} style={{ color: "#94A3B8" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdateBudget} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div className="form-group">
                <label className="form-label">Monthly Limit (INR):</label>
                <input
                  type="number"
                  className="text-input"
                  value={newBudgetInput}
                  onChange={(e) => setNewBudgetInput(e.target.value)}
                  placeholder="e.g. 15000"
                  style={{ fontWeight: "700", fontSize: "16px" }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowSetBudgetModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Budget
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add New Goal */}
      {showAddGoalModal && (
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
              padding: "22px",
              width: "100%",
              maxWidth: "340px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A" }}>
                {t("goals_modal_title", "Create New Savings Goal")}
              </h3>
              <button onClick={() => setShowAddGoalModal(false)} style={{ color: "#94A3B8" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateGoal} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div className="form-group">
                <label className="form-label">Goal Name:</label>
                <input
                  type="text"
                  className="text-input"
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                  placeholder="e.g. Emergency Fund or Bike"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Target Amount (INR):</label>
                <input
                  type="number"
                  className="text-input"
                  value={goalTarget}
                  onChange={(e) => setGoalTarget(e.target.value)}
                  placeholder="e.g. 50000"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Already Saved (Optional):</label>
                <input
                  type="number"
                  className="text-input"
                  value={goalSaved}
                  onChange={(e) => setGoalSaved(e.target.value)}
                  placeholder="e.g. 10000"
                />
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowAddGoalModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Create Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
