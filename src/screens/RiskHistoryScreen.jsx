import React, { useState } from "react";
import { Clock, AlertTriangle, ShieldCheck, ChevronRight, Filter, AlertCircle } from "lucide-react";
import { Header } from "../components/Header";
import { RiskBadge } from "../components/RiskBadge";

export function RiskHistoryScreen({ scans = [], onSelectScan, onSettings }) {
  const [filter, setFilter] = useState("ALL");

  const filteredScans = scans.filter((scan) => {
    if (filter === "ALL") return true;
    if (filter === "HIGH") return scan.score >= 70;
    if (filter === "MEDIUM") return scan.score >= 40 && scan.score < 70;
    if (filter === "LOW") return scan.score < 40;
    return true;
  });

  const formatDate = (isoString) => {
    if (!isoString) return "Recently";
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
    } catch (e) {
      return "Recently";
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header
        title="Risk History"
        subtitle="Chronological safety log & audit trail"
        onSettings={onSettings}
      />

      <div className="screen-content" style={{ flex: 1 }}>
        {/* Filter Pills */}
        <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "4px" }}>
          {["ALL", "HIGH", "MEDIUM", "LOW"].map((f) => {
            const isActive = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "9999px",
                  border: "1px solid",
                  borderColor: isActive ? "#0A192F" : "#E2E8F0",
                  background: isActive ? "#0A192F" : "#FFFFFF",
                  color: isActive ? "#FFFFFF" : "#475569",
                  fontSize: "11px",
                  fontWeight: "700",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {f === "ALL" ? "All Scans" : `${f} Risk`}
              </button>
            );
          })}
        </div>

        {/* List of Scans */}
        {filteredScans.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {filteredScans.map((scan) => {
              const isHigh = scan.score >= 70;
              const isMed = scan.score >= 40 && scan.score < 70;
              const tx = scan.inputs?.transaction;

              return (
                <div
                  key={scan.id}
                  onClick={() => onSelectScan(scan)}
                  className="card"
                  style={{
                    padding: "14px 16px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderLeft: `4px solid ${isHigh ? "#EF4444" : isMed ? "#F59E0B" : "#10B981"}`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "10px",
                        background: isHigh ? "#FEF2F2" : isMed ? "#FFFBEB" : "#ECFDF5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: isHigh ? "#EF4444" : isMed ? "#F59E0B" : "#10B981",
                        flexShrink: 0,
                      }}
                    >
                      {isHigh ? <AlertTriangle size={18} /> : <ShieldCheck size={18} />}
                    </div>

                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                        <RiskBadge level={scan.level} score={scan.score} size="sm" />
                        <span style={{ fontSize: "11px", color: "#94A3B8" }}>
                          {formatDate(scan.timestamp)}
                        </span>
                      </div>

                      <h4 style={{ fontFamily: "var(--font-display)", fontSize: "13.5px", fontWeight: "700", color: "#0F172A" }}>
                        {tx ? `₹${tx.amount.toLocaleString("en-IN")} to ${tx.recipient}` : scan.inputs?.url ? "Link Analysis" : "Message Analysis"}
                      </h4>

                      <p style={{ fontSize: "11px", color: "#64748B" }}>
                        {scan.reasons && scan.reasons[0] ? scan.reasons[0].title : scan.actionTitle}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div style={{ textAlign: "right" }}>
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "800",
                          fontFamily: "var(--font-display)",
                          color: isHigh ? "#EF4444" : isMed ? "#D97706" : "#059669",
                        }}
                      >
                        {scan.score}
                      </span>
                      <span style={{ fontSize: "10px", color: "#94A3B8" }}>/100</span>
                    </div>
                    <ChevronRight size={16} color="#94A3B8" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Friendly Empty State (Requirement 23) */
          <div
            className="card"
            style={{
              padding: "40px 20px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <Clock size={36} color="#CBD5E1" />
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: "700", color: "#0F172A" }}>
              No Risk History Yet
            </h3>
            <p style={{ fontSize: "12.5px", color: "#64748B", maxWidth: "260px" }}>
              Your analyzed transactions, messages, and suspicious links will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
