import React, { useState } from "react";
import { ArrowLeft, Zap, QrCode, Image as ImageIcon, User, Check, ShieldCheck } from "lucide-react";

export function ScanAndPayScreen({ onBack, onSelectRecipient }) {
  const [isScanning, setIsScanning] = useState(false);

  const quickContacts = [
    { name: "Mom", initials: "M", bg: "#EC4899" },
    { name: "Rohan", initials: "R", bg: "#3B82F6" },
    { name: "Aman", initials: "A", bg: "#10B981" },
  ];

  const handleTriggerScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      onSelectRecipient({ recipient: "QuickMerchant Store", amount: "500", isNewRecipient: false });
    }, 1200);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#080F1E",
        color: "#FFFFFF",
        paddingBottom: "80px",
        overflowY: "auto",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <button
          onClick={onBack}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            border: "none",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <ArrowLeft size={18} />
        </button>

        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: "700" }}>
            Scan & Pay
          </h2>
          <span style={{ fontSize: "10px", color: "#06B6D4", letterSpacing: "0.5px" }}>
            Secure • Fast • UPI
          </span>
        </div>

        <button
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            border: "none",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <ImageIcon size={17} />
        </button>
      </div>

      <div style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
        {/* QR Scanner Viewfinder with Neon Cyan Corners */}
        <div
          style={{
            position: "relative",
            width: "240px",
            height: "240px",
            background: "rgba(15, 23, 42, 0.6)",
            borderRadius: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 40px rgba(6, 182, 212, 0.15)",
            border: "1px solid rgba(6, 182, 212, 0.2)",
            overflow: "hidden",
          }}
        >
          {/* 4 Neon Corners */}
          <div style={{ position: "absolute", top: 12, left: 12, width: 28, height: 28, borderTop: "3.5px solid #06B6D4", borderLeft: "3.5px solid #06B6D4", borderTopLeftRadius: 10 }} />
          <div style={{ position: "absolute", top: 12, right: 12, width: 28, height: 28, borderTop: "3.5px solid #06B6D4", borderRight: "3.5px solid #06B6D4", borderTopRightRadius: 10 }} />
          <div style={{ position: "absolute", bottom: 12, left: 12, width: 28, height: 28, borderBottom: "3.5px solid #06B6D4", borderLeft: "3.5px solid #06B6D4", borderBottomLeftRadius: 10 }} />
          <div style={{ position: "absolute", bottom: 12, right: 12, width: 28, height: 28, borderBottom: "3.5px solid #06B6D4", borderRight: "3.5px solid #06B6D4", borderBottomRightRadius: 10 }} />

          {/* Animated Laser */}
          <div className="scanner-laser" />

          {/* Simulated QR Pattern */}
          <div
            style={{
              width: "150px",
              height: "150px",
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <QrCode size={130} color="#0F172A" />
          </div>
        </div>

        <p style={{ fontSize: "13px", color: "#94A3B8", fontWeight: "600" }}>
          Scan any UPI QR
        </p>

        {/* UPI Apps Row (GPay, PhonePe, Paytm, Others) */}
        <div style={{ display: "flex", gap: "12px", width: "100%", justifyContent: "center" }}>
          {[
            { name: "GPay", color: "#3B82F6", letter: "G" },
            { name: "PhonePe", color: "#673AB7", letter: "P" },
            { name: "Paytm", color: "#00BAF2", letter: "P" },
            { name: "Others", color: "#64748B", letter: "•••" },
          ].map((app, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "#1E293B",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "800",
                  fontSize: "14px",
                  color: app.color,
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                {app.letter}
              </div>
              <span style={{ fontSize: "10px", color: "#CBD5E1" }}>{app.name}</span>
            </div>
          ))}
        </div>

        {/* Quick Pay Contacts */}
        <div style={{ width: "100%" }}>
          <span style={{ fontSize: "12px", fontWeight: "700", color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Quick Pay
          </span>

          <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
            {quickContacts.map((c, i) => (
              <div
                key={i}
                onClick={() => onSelectRecipient({ recipient: c.name, amount: "500", isNewRecipient: false })}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "50%",
                    background: c.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "800",
                    color: "#FFFFFF",
                    fontSize: "15px",
                    boxShadow: `0 4px 12px ${c.bg}55`,
                  }}
                >
                  {c.initials}
                </div>
                <span style={{ fontSize: "11px", color: "#E2E8F0" }}>{c.name}</span>
              </div>
            ))}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "50%",
                  background: "#1E293B",
                  border: "1px dashed rgba(255, 255, 255, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#94A3B8",
                  fontSize: "12px",
                }}
              >
                ::
              </div>
              <span style={{ fontSize: "11px", color: "#94A3B8" }}>More</span>
            </div>
          </div>
        </div>

        {/* Action Button: Scan QR */}
        <button
          className="btn-accent"
          onClick={handleTriggerScan}
          style={{
            marginTop: "10px",
            background: "linear-gradient(135deg, #06B6D4 0%, #4F46E5 50%, #A855F7 100%)",
            padding: "16px 20px",
            borderRadius: "9999px",
            boxShadow: "0 8px 25px rgba(6, 182, 212, 0.4)",
          }}
        >
          <QrCode size={18} />
          <span>{isScanning ? "Processing QR..." : "Scan QR"}</span>
        </button>
      </div>
    </div>
  );
}
