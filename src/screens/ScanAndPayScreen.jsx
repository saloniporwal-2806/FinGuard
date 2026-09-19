import React, { useState, useEffect, useRef } from "react";
import {
  QrCode,
  Camera,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  X,
  ArrowRight,
  Shield,
  RefreshCw,
  IndianRupee,
} from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";
import { Header } from "../components/Header";
import { parseUpiQr } from "../services/upiParser";
import { useLanguage } from "../context/LanguageContext";
import { KNOWN_RECIPIENTS } from "../data/sampleTransactions";

export function ScanAndPayScreen({ onBack, onSelectRecipient }) {
  const { t } = useLanguage();

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [decodedData, setDecodedData] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [facingMode, setFacingMode] = useState("environment"); // "environment" | "user"

  const html5QrCodeRef = useRef(null);
  const fileInputRef = useRef(null);

  const quickContacts = [
    { name: "Mom", initials: "M", bg: "#EC4899", vpa: "mom@upi" },
    { name: "Rohan", initials: "R", bg: "#3B82F6", vpa: "rohan@okhdfcbank" },
    { name: "Aman", initials: "A", bg: "#10B981", vpa: "aman@paytm" },
  ];

  const stopCamera = async () => {
    if (html5QrCodeRef.current) {
      try {
        if (html5QrCodeRef.current.isScanning) {
          await html5QrCodeRef.current.stop();
        }
        await html5QrCodeRef.current.clear();
      } catch (err) {
        console.warn("Error stopping Html5Qrcode:", err);
      }
      html5QrCodeRef.current = null;
    }
    setIsCameraActive(false);
  };

  // Stop camera when unmounting
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async (mode = facingMode) => {
    setCameraError("");
    setIsProcessing(true);

    try {
      if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
        await stopCamera();
      }

      const qrCode = new Html5Qrcode("finguard-qr-viewfinder");
      html5QrCodeRef.current = qrCode;

      const config = {
        fps: 15,
        qrbox: { width: 200, height: 200 },
        aspectRatio: 1.0,
      };

      await qrCode.start(
        { facingMode: mode },
        config,
        (decodedText) => {
          handleQrDecoded(decodedText);
        },
        () => {
          // ignore scan frame errors
        }
      );

      setIsCameraActive(true);
      setIsProcessing(false);
    } catch (err) {
      console.error("Camera start error:", err);
      setIsProcessing(false);
      setIsCameraActive(false);
      setCameraError(
        err?.message?.includes("NotAllowedError")
          ? "Camera permission was denied. Please allow camera access in your device settings."
          : "Could not open camera stream. You can upload a QR image from your gallery or choose a demo case."
      );
    }
  };

  const handleSwitchCamera = async () => {
    const newMode = facingMode === "environment" ? "user" : "environment";
    setFacingMode(newMode);
    if (isCameraActive) {
      await startCamera(newMode);
    }
  };

  const handleQrDecoded = async (rawText) => {
    await stopCamera();
    const parsed = parseUpiQr(rawText);
    setDecodedData(parsed);
    setCustomAmount(parsed.amount || "");
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setCameraError("");

    try {
      const qrCode = new Html5Qrcode("finguard-qr-temp-reader");
      const decodedText = await qrCode.scanFile(file, true);
      qrCode.clear();
      setIsProcessing(false);
      handleQrDecoded(decodedText);
    } catch (err) {
      setIsProcessing(false);
      setCameraError("No valid QR code could be found in this image. Please try another image or use Demo QR.");
    }
  };

  // Demo fallback simulation
  const handleTriggerDemoScan = (demoType = "merchant") => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      let demoPayload = "upi://pay?pa=quickmerchant@icici&pn=QuickMerchant%20Store&am=500&cu=INR&tn=Store%20Purchase";
      if (demoType === "high") {
        demoPayload = "upi://pay?pa=lottery-claim-prize@freeupi&pn=Prize%20Reward%20Desk&am=35000&cu=INR&tn=Claim%20Fee";
      } else if (demoType === "friend") {
        demoPayload = "upi://pay?pa=mom@upi&pn=Mom&am=250&cu=INR&tn=Milk%20and%20groceries";
      }
      handleQrDecoded(demoPayload);
    }, 600);
  };

  const handleConfirmPayment = () => {
    if (!decodedData) return;

    const finalAmount = customAmount || decodedData.amount || "500";
    const recipientName = decodedData.payeeName || decodedData.payeeVpa || "Merchant";
    const recipientVpa = decodedData.payeeVpa || recipientName;

    const isKnown = KNOWN_RECIPIENTS.some(
      (k) => k.toLowerCase() === recipientName.toLowerCase() || k.toLowerCase() === recipientVpa.toLowerCase()
    );

    onSelectRecipient({
      recipient: recipientName,
      vpa: recipientVpa,
      amount: String(finalAmount),
      isNewRecipient: !isKnown,
      note: decodedData.note || "",
      category: "Transfer",
      rawQr: decodedData.raw,
    });
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
      {/* Unified Consistent Header */}
      <Header
        title={t("scan_title", "Scan & Pay")}
        subtitle={t("scan_subtitle", "Secure • Fast • UPI")}
        showBack={true}
        onBack={() => {
          stopCamera();
          onBack();
        }}
        dark={true}
      />

      <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
        {/* Hidden container for image decoding */}
        <div id="finguard-qr-temp-reader" style={{ display: "none" }} />

        {/* QR Scanner Viewfinder with Neon Cyan Corners */}
        <div
          style={{
            position: "relative",
            width: "240px",
            height: "240px",
            background: "rgba(15, 23, 42, 0.85)",
            borderRadius: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 40px rgba(6, 182, 212, 0.2)",
            border: "1.5px solid rgba(6, 182, 212, 0.3)",
            overflow: "hidden",
          }}
        >
          {/* 4 Neon Corners */}
          <div style={{ position: "absolute", top: 12, left: 12, width: 28, height: 28, borderTop: "3.5px solid #06B6D4", borderLeft: "3.5px solid #06B6D4", borderTopLeftRadius: 10, zIndex: 10 }} />
          <div style={{ position: "absolute", top: 12, right: 12, width: 28, height: 28, borderTop: "3.5px solid #06B6D4", borderRight: "3.5px solid #06B6D4", borderTopRightRadius: 10, zIndex: 10 }} />
          <div style={{ position: "absolute", bottom: 12, left: 12, width: 28, height: 28, borderBottom: "3.5px solid #06B6D4", borderLeft: "3.5px solid #06B6D4", borderBottomLeftRadius: 10, zIndex: 10 }} />
          <div style={{ position: "absolute", bottom: 12, right: 12, width: 28, height: 28, borderBottom: "3.5px solid #06B6D4", borderRight: "3.5px solid #06B6D4", borderBottomRightRadius: 10, zIndex: 10 }} />

          {/* Animated Laser */}
          <div className="scanner-laser" style={{ zIndex: 10 }} />

          {/* HTML5 QR Camera Element */}
          <div
            id="finguard-qr-viewfinder"
            style={{
              width: "100%",
              height: "100%",
              display: isCameraActive ? "block" : "none",
              objectFit: "cover",
            }}
          />

          {/* Fallback Display if Camera is not actively streaming */}
          {!isCameraActive && (
            <div
              style={{
                width: "140px",
                height: "140px",
                background: "#FFFFFF",
                borderRadius: "16px",
                padding: "8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
              }}
            >
              <QrCode size={100} color="#0F172A" />
              <span style={{ fontSize: "9px", color: "#64748B", fontWeight: "700" }}>
                {isProcessing ? t("scan_processing", "Scanning...") : "UPI QR READY"}
              </span>
            </div>
          )}
        </div>

        {/* Camera Error Alert */}
        {cameraError && (
          <div
            style={{
              width: "100%",
              maxWidth: "340px",
              padding: "10px 14px",
              background: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.35)",
              borderRadius: "14px",
              color: "#FCA5A5",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <AlertCircle size={16} color="#EF4444" style={{ flexShrink: 0 }} />
            <span>{cameraError}</span>
          </div>
        )}

        {/* Primary Camera & Gallery Scan Controls */}
        <div style={{ display: "flex", gap: "10px", width: "100%", maxWidth: "340px" }}>
          {!isCameraActive ? (
            <button
              className="btn-accent"
              onClick={() => startCamera()}
              disabled={isProcessing}
              style={{
                flex: 1,
                background: "linear-gradient(135deg, #06B6D4 0%, #4F46E5 100%)",
                padding: "14px 16px",
                borderRadius: "16px",
                boxShadow: "0 6px 20px rgba(6, 182, 212, 0.35)",
                fontSize: "13px",
              }}
            >
              <Camera size={16} />
              <span>{isProcessing ? "Starting Camera..." : t("scan_open_camera", "Open Camera Scanner")}</span>
            </button>
          ) : (
            <>
              <button
                className="btn-secondary"
                onClick={stopCamera}
                style={{
                  flex: 1,
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#FFFFFF",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  padding: "12px 14px",
                  borderRadius: "14px",
                  fontSize: "12.5px",
                }}
              >
                <X size={15} />
                <span>{t("scan_close_camera", "Close Camera")}</span>
              </button>
              <button
                className="icon-btn"
                onClick={handleSwitchCamera}
                title="Switch Camera Front/Back"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#06B6D4",
                }}
              >
                <RefreshCw size={16} />
              </button>
            </>
          )}

          {/* Hidden File Input for Image Scanning */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Scan QR from image/gallery"
            style={{
              padding: "12px 14px",
              borderRadius: "16px",
              background: "rgba(30, 41, 59, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#CBD5E1",
              fontSize: "12.5px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <ImageIcon size={16} color="#06B6D4" />
            <span>Image</span>
          </button>
        </div>

        {/* 1-Click Demo Scenarios (Preserved as requested) */}
        <div style={{ width: "100%", maxWidth: "340px", marginTop: "2px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {t("scan_demo_pill", "Demo Test QR Options")}
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px" }}>
            <button
              onClick={() => handleTriggerDemoScan("friend")}
              style={{
                background: "rgba(16, 185, 129, 0.12)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                color: "#34D399",
                borderRadius: "10px",
                padding: "8px 4px",
                fontSize: "11px",
                fontWeight: "700",
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              Safe (Mom)
            </button>
            <button
              onClick={() => handleTriggerDemoScan("merchant")}
              style={{
                background: "rgba(245, 158, 11, 0.12)",
                border: "1px solid rgba(245, 158, 11, 0.3)",
                color: "#FBBF24",
                borderRadius: "10px",
                padding: "8px 4px",
                fontSize: "11px",
                fontWeight: "700",
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              Merchant
            </button>
            <button
              onClick={() => handleTriggerDemoScan("high")}
              style={{
                background: "rgba(239, 68, 68, 0.12)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                color: "#F87171",
                borderRadius: "10px",
                padding: "8px 4px",
                fontSize: "11px",
                fontWeight: "700",
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              Suspicious
            </button>
          </div>
        </div>

        {/* Quick Pay Contacts */}
        <div style={{ width: "100%", maxWidth: "340px", marginTop: "4px" }}>
          <span style={{ fontSize: "11px", fontWeight: "700", color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            {t("scan_quick_pay", "Quick Pay")}
          </span>

          <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
            {quickContacts.map((c, i) => (
              <div
                key={i}
                onClick={() =>
                  onSelectRecipient({
                    recipient: c.name,
                    vpa: c.vpa,
                    amount: "500",
                    isNewRecipient: false,
                    category: "Transfer",
                  })
                }
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
                    background: c.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "800",
                    color: "#FFFFFF",
                    fontSize: "14px",
                    boxShadow: `0 4px 12px ${c.bg}55`,
                  }}
                >
                  {c.initials}
                </div>
                <span style={{ fontSize: "11px", color: "#E2E8F0" }}>{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal: Decoded QR Verification Card */}
      {decodedData && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10, 15, 30, 0.8)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#1E293B",
              borderRadius: "24px",
              padding: "20px",
              width: "100%",
              maxWidth: "340px",
              border: "1px solid rgba(6, 182, 212, 0.3)",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
              color: "#FFFFFF",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "8px",
                    background: "#06B6D4",
                    color: "#0F172A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CheckCircle2 size={16} />
                </div>
                <h3 style={{ fontSize: "15px", fontWeight: "800" }}>
                  {t("scan_detected_title", "UPI Payment Detected")}
                </h3>
              </div>
              <button onClick={() => setDecodedData(null)} style={{ color: "#94A3B8" }}>
                <X size={20} />
              </button>
            </div>

            {/* Payee Info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", background: "#0F172A", padding: "14px", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
              <div>
                <span style={{ fontSize: "10.5px", color: "#94A3B8", textTransform: "uppercase", fontWeight: "700" }}>
                  {t("scan_payee_name", "Payee Name")}
                </span>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "#FFFFFF", marginTop: "2px" }}>
                  {decodedData.payeeName || "Verified Merchant"}
                </div>
              </div>

              {decodedData.payeeVpa && (
                <div>
                  <span style={{ fontSize: "10.5px", color: "#94A3B8", textTransform: "uppercase", fontWeight: "700" }}>
                    {t("scan_payee_vpa", "UPI ID / VPA")}
                  </span>
                  <div style={{ fontSize: "12px", color: "#06B6D4", fontWeight: "600", marginTop: "2px", wordBreak: "break-all" }}>
                    {decodedData.payeeVpa}
                  </div>
                </div>
              )}

              {decodedData.note && (
                <div>
                  <span style={{ fontSize: "10.5px", color: "#94A3B8", textTransform: "uppercase", fontWeight: "700" }}>
                    {t("scan_note", "Note / Purpose")}
                  </span>
                  <div style={{ fontSize: "12px", color: "#E2E8F0", marginTop: "2px" }}>
                    {decodedData.note}
                  </div>
                </div>
              )}

              {/* Amount Input */}
              <div style={{ marginTop: "4px" }}>
                <label style={{ fontSize: "10.5px", color: "#94A3B8", textTransform: "uppercase", fontWeight: "700", display: "block", marginBottom: "4px" }}>
                  {t("scan_amount", "Amount (INR)")}:
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder={t("scan_enter_amount", "Enter amount to pay")}
                    style={{
                      width: "100%",
                      padding: "10px 12px 10px 32px",
                      borderRadius: "10px",
                      background: "#1E293B",
                      border: "1px solid #334155",
                      color: "#FFFFFF",
                      fontSize: "16px",
                      fontWeight: "800",
                      boxSizing: "border-box",
                    }}
                  />
                  <IndianRupee
                    size={15}
                    color="#06B6D4"
                    style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }}
                  />
                </div>
              </div>
            </div>

            {/* Verification Button */}
            <button
              onClick={handleConfirmPayment}
              className="btn-accent"
              style={{
                width: "100%",
                marginTop: "14px",
                background: "linear-gradient(135deg, #06B6D4 0%, #4F46E5 100%)",
                padding: "14px",
                borderRadius: "14px",
                fontSize: "13.5px",
              }}
            >
              <Shield size={16} />
              <span>{t("scan_verify_btn", "Verify & Analyze Risk")}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
