import React, { useState } from "react";
import { Receipt, ArrowRight, Sparkles, AlertCircle, Shield, Clock, User, IndianRupee } from "lucide-react";
import { Header } from "../components/Header";
import { PrivacyNotice } from "../components/PrivacyNotice";
import { KNOWN_RECIPIENTS } from "../data/sampleTransactions";

export function TransactionAnalyzerScreen({ initialData = null, onAnalyze, onBack }) {
  const [amount, setAmount] = useState(initialData?.amount || "");
  const [recipient, setRecipient] = useState(initialData?.recipient || "");
  const [isNewRecipient, setIsNewRecipient] = useState(
    initialData?.isNewRecipient !== undefined ? initialData.isNewRecipient : true
  );
  const [time, setTime] = useState(initialData?.time || "18:30");
  const [category, setCategory] = useState(initialData?.category || "Transfer");
  const [locationAnomaly, setLocationAnomaly] = useState(Boolean(initialData?.locationAnomaly));
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const categories = ["Transfer", "Shopping", "Food", "Bills", "Investment", "Other"];

  const timeOptions = [
    { label: "Morning (10:00 AM)", value: "10:00" },
    { label: "Afternoon (02:30 PM)", value: "14:30" },
    { label: "Evening (06:30 PM)", value: "18:30" },
    { label: "Night boundary (09:45 PM)", value: "21:45" },
    { label: "High-risk Late Night (02:30 AM)", value: "02:30" },
  ];

  const handleRecipientChange = (val) => {
    setRecipient(val);
    if (error) setError("");
    const isKnown = KNOWN_RECIPIENTS.some((k) => k.toLowerCase() === val.trim().toLowerCase());
    setIsNewRecipient(!isKnown);
  };

  const handleApplyPreset = (preset) => {
    setAmount(preset.amount);
    setRecipient(preset.recipient);
    setIsNewRecipient(preset.isNewRecipient);
    setTime(preset.time);
    setCategory(preset.category);
    setLocationAnomaly(Boolean(preset.locationAnomaly));
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError("Enter a valid transaction amount.");
      return;
    }
    if (!recipient || recipient.trim().length === 0) {
      setError("Recipient cannot be empty.");
      return;
    }

    setError("");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onAnalyze({
        transaction: {
          amount: numAmount,
          recipient: recipient.trim(),
          isNewRecipient,
          time,
          category,
          locationAnomaly,
        },
      });
    }, 700);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header
        title="Transaction Analyzer"
        subtitle="Behavioral anomaly & pattern comparison"
        showBack={true}
        onBack={onBack}
      />

      <div className="screen-content" style={{ flex: 1 }}>
        <div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "18px",
              fontWeight: "800",
              color: "#0F172A",
              marginBottom: "4px",
            }}
          >
            Analyze Transaction
          </h2>
          <p style={{ fontSize: "12px", color: "#64748B", lineHeight: 1.4 }}>
            Compare transfer amount, recipient profile, and time-of-day against your normal transaction baseline.
          </p>
        </div>

        {/* Transaction Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Amount */}
          <div className="form-group">
            <label className="form-label" htmlFor="amount-input">
              Amount (INR):
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="amount-input"
                type="number"
                step="any"
                className="text-input"
                placeholder="e.g. 500 or 35000"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  if (error) setError("");
                }}
                style={{ paddingLeft: "36px", fontWeight: "700", fontSize: "16px" }}
              />
              <IndianRupee
                size={16}
                color="#00D09C"
                style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
              />
            </div>
          </div>

          {/* Recipient */}
          <div className="form-group">
            <label className="form-label" htmlFor="recipient-input">
              Recipient Name or UPI ID:
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="recipient-input"
                type="text"
                className="text-input"
                placeholder="e.g. Mom, Grocery Store, or unknown-id@upi"
                value={recipient}
                onChange={(e) => handleRecipientChange(e.target.value)}
                style={{ paddingLeft: "36px" }}
              />
              <User
                size={16}
                color="#94A3B8"
                style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
              />
            </div>
          </div>

          {/* New Recipient Toggle */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 14px",
              background: "#FFFFFF",
              borderRadius: "14px",
              border: "1.5px solid #E2E8F0",
            }}
          >
            <div>
              <div style={{ fontSize: "13px", fontWeight: "700", color: "#1E293B" }}>
                First-time / Unfamiliar Recipient?
              </div>
              <div style={{ fontSize: "11px", color: "#64748B" }}>
                {isNewRecipient ? "⚠ Flags +15 risk for new entity" : "✓ Trusted verified contact"}
              </div>
            </div>

            <div style={{ display: "flex", gap: "4px" }}>
              <button
                type="button"
                onClick={() => setIsNewRecipient(false)}
                style={{
                  padding: "5px 12px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: "700",
                  cursor: "pointer",
                  border: "1px solid",
                  borderColor: !isNewRecipient ? "#10B981" : "#E2E8F0",
                  background: !isNewRecipient ? "#ECFDF5" : "#FFFFFF",
                  color: !isNewRecipient ? "#065F46" : "#64748B",
                }}
              >
                No
              </button>
              <button
                type="button"
                onClick={() => setIsNewRecipient(true)}
                style={{
                  padding: "5px 12px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: "700",
                  cursor: "pointer",
                  border: "1px solid",
                  borderColor: isNewRecipient ? "#F59E0B" : "#E2E8F0",
                  background: isNewRecipient ? "#FFFBEB" : "#FFFFFF",
                  color: isNewRecipient ? "#92400E" : "#64748B",
                }}
              >
                Yes
              </button>
            </div>
          </div>

          {/* Transaction Time */}
          <div className="form-group">
            <label className="form-label">Transaction Time:</label>
            <select
              className="select-input"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >
              {timeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div className="form-group">
            <label className="form-label">Category:</label>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "10px",
                    fontSize: "12px",
                    fontWeight: "600",
                    cursor: "pointer",
                    border: "1px solid",
                    borderColor: category === cat ? "#00D09C" : "#E2E8F0",
                    background: category === cat ? "#ECFDF5" : "#FFFFFF",
                    color: category === cat ? "#065F46" : "#475569",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Location Anomaly Option */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 12px",
              background: "#F8FAFC",
              borderRadius: "12px",
              border: "1px solid #E2E8F0",
            }}
          >
            <span style={{ fontSize: "12px", color: "#475569" }}>
              Simulate unusual location / travel IP:
            </span>
            <input
              type="checkbox"
              checked={locationAnomaly}
              onChange={(e) => setLocationAnomaly(e.target.checked)}
              style={{ width: "18px", height: "18px", accentColor: "#00D09C", cursor: "pointer" }}
            />
          </div>

          {error && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "#DC2626",
                fontSize: "12px",
                fontWeight: "600",
              }}
            >
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-accent"
            disabled={isLoading}
            style={{ marginTop: "4px" }}
          >
            {isLoading ? (
              <>
                <Shield size={18} style={{ animation: "spinShield 1s infinite linear" }} />
                <span>Comparing with Baseline Profile...</span>
              </>
            ) : (
              <>
                <Receipt size={18} />
                <span>Analyze Transaction</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Demo Quick Presets */}
        <div style={{ marginTop: "8px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "11px",
              fontWeight: "700",
              color: "#64748B",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "8px",
            }}
          >
            <Sparkles size={12} color="#00D09C" />
            1-CLICK TEST PRESETS
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <button
              type="button"
              onClick={() =>
                handleApplyPreset({
                  amount: "500",
                  recipient: "Mom",
                  isNewRecipient: false,
                  time: "18:30",
                  category: "Transfer",
                  locationAnomaly: false,
                })
              }
              style={{
                textAlign: "left",
                padding: "10px 12px",
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "12px",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <span style={{ fontSize: "11px", fontWeight: "700", color: "#10B981" }}>
                  Case 1: Safe Payment (₹500)
                </span>
                <div style={{ fontSize: "11px", color: "#64748B" }}>Mom • 6:30 PM • Normal baseline</div>
              </div>
              <span style={{ fontSize: "10px", color: "#10B981", fontWeight: "700" }}>LOW RISK</span>
            </button>

            <button
              type="button"
              onClick={() =>
                handleApplyPreset({
                  amount: "10000",
                  recipient: "Wholesale Inventory Hub",
                  isNewRecipient: true,
                  time: "19:00",
                  category: "Shopping",
                  locationAnomaly: false,
                })
              }
              style={{
                textAlign: "left",
                padding: "10px 12px",
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "12px",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <span style={{ fontSize: "11px", fontWeight: "700", color: "#F59E0B" }}>
                  Case 2: Medium Risk (₹10,000)
                </span>
                <div style={{ fontSize: "11px", color: "#64748B" }}>New recipient • 7:00 PM • Elevated</div>
              </div>
              <span style={{ fontSize: "10px", color: "#D97706", fontWeight: "700" }}>MEDIUM RISK</span>
            </button>

            <button
              type="button"
              onClick={() =>
                handleApplyPreset({
                  amount: "35000",
                  recipient: "Prize Desk Global",
                  isNewRecipient: true,
                  time: "02:30",
                  category: "Transfer",
                  locationAnomaly: true,
                })
              }
              style={{
                textAlign: "left",
                padding: "10px 12px",
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "12px",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <span style={{ fontSize: "11px", fontWeight: "700", color: "#EF4444" }}>
                  Case 3: High Risk (₹35,000)
                </span>
                <div style={{ fontSize: "11px", color: "#64748B" }}>New entity • 2:30 AM night • 17x spike</div>
              </div>
              <span style={{ fontSize: "10px", color: "#EF4444", fontWeight: "700" }}>HIGH RISK</span>
            </button>
          </div>
        </div>

        <PrivacyNotice compact={true} />
      </div>
    </div>
  );
}
