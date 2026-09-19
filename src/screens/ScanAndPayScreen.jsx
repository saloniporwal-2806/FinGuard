import React, { useState, useEffect, useRef, useCallback } from "react";
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
  Settings,
  SwitchCamera,
} from "lucide-react";
import jsQR from "jsqr";
import { Header } from "../components/Header";
import { parseUpiQr } from "../services/upiParser";
import { useLanguage } from "../context/LanguageContext";
import { KNOWN_RECIPIENTS } from "../data/sampleTransactions";
import { registerBackHandler } from "../services/backHandler";

export function ScanAndPayScreen({ onBack, onSelectRecipient }) {
  const { t } = useLanguage();

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [cameraErrorType, setCameraErrorType] = useState(""); // "permission" | "not_found" | "busy" | "generic" | ""
  const [isProcessing, setIsProcessing] = useState(false);
  const [decodedData, setDecodedData] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [facingMode, setFacingMode] = useState("environment"); // "environment" | "user"

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const isScanningRef = useRef(false);
  const animationFrameRef = useRef(null);
  const barcodeDetectorRef = useRef(null);

  const quickContacts = [
    { name: "Mom", initials: "M", bg: "#EC4899", vpa: "mom@upi" },
    { name: "Rohan", initials: "R", bg: "#3B82F6", vpa: "rohan@okhdfcbank" },
    { name: "Aman", initials: "A", bg: "#10B981", vpa: "aman@paytm" },
  ];

  // Initialize native BarcodeDetector if supported in Android Chromium WebView
  useEffect(() => {
    if ("BarcodeDetector" in window) {
      try {
        barcodeDetectorRef.current = new window.BarcodeDetector({
          formats: ["qr_code"],
        });
      } catch (e) {
        console.warn("BarcodeDetector init fallback to jsQR:", e);
      }
    }
  }, []);

  const stopCamera = useCallback(() => {
    isScanningRef.current = false;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        try {
          track.stop();
          track.enabled = false;
        } catch (e) {
          console.warn("Track stop error:", e);
        }
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      try {
        videoRef.current.pause();
      } catch (e) {}
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    setIsProcessing(false);
  }, []);

  // Stop camera when unmounting or navigating away
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  // Intercept Android Back and in-app back: close modal first, then close camera, then screen back
  useEffect(() => {
    return registerBackHandler(() => {
      if (decodedData) {
        setDecodedData(null);
        return true;
      }
      if (isCameraActive) {
        stopCamera();
        return true;
      }
      return false;
    });
  }, [decodedData, isCameraActive, stopCamera]);

  const handleQrDecoded = useCallback(
    (rawText) => {
      stopCamera();
      const parsed = parseUpiQr(rawText);
      setDecodedData(parsed);
      setCustomAmount(parsed.amount || "");
    },
    [stopCamera]
  );

  const scanVideoFrame = useCallback(() => {
    if (!isScanningRef.current || !videoRef.current) return;

    const video = videoRef.current;
    if (
      video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
      video.videoWidth > 0 &&
      video.videoHeight > 0
    ) {
      // 1. Try Hardware-Accelerated BarcodeDetector if available
      if (barcodeDetectorRef.current) {
        barcodeDetectorRef.current
          .detect(video)
          .then((barcodes) => {
            if (barcodes && barcodes.length > 0 && barcodes[0].rawValue) {
              handleQrDecoded(barcodes[0].rawValue);
              return;
            }
            if (isScanningRef.current) {
              animationFrameRef.current = requestAnimationFrame(scanVideoFrame);
            }
          })
          .catch(() => {
            runJsQrScan(video);
          });
        return;
      }

      // 2. jsQR Canvas fallback
      runJsQrScan(video);
      return;
    }

    if (isScanningRef.current) {
      animationFrameRef.current = requestAnimationFrame(scanVideoFrame);
    }
  }, [handleQrDecoded]);

  const runJsQrScan = (video) => {
    try {
      let canvas = canvasRef.current;
      if (!canvas) {
        canvas = document.createElement("canvas");
        canvasRef.current = canvas;
      }

      const maxDim = 640;
      let width = video.videoWidth;
      let height = video.videoHeight;
      if (width > maxDim || height > maxDim) {
        const scale = Math.min(maxDim / width, maxDim / height);
        width = Math.floor(width * scale);
        height = Math.floor(height * scale);
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (ctx) {
        ctx.drawImage(video, 0, 0, width, height);
        const imageData = ctx.getImageData(0, 0, width, height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });
        if (code && code.data) {
          handleQrDecoded(code.data);
          return;
        }
      }
    } catch (e) {
      console.warn("jsQR frame error:", e);
    }

    if (isScanningRef.current) {
      animationFrameRef.current = requestAnimationFrame(scanVideoFrame);
    }
  };

  const startCamera = async (mode = facingMode) => {
    setCameraError("");
    setCameraErrorType("");
    setIsProcessing(true);

    try {
      // Ensure previous session is terminated cleanly
      stopCamera();

      // Trigger Android bridge permission check if available
      if (window.AndroidCameraBridge?.hasCameraPermission) {
        const hasPerm = window.AndroidCameraBridge.hasCameraPermission();
        if (!hasPerm && window.AndroidCameraBridge.requestCameraPermission) {
          window.AndroidCameraBridge.requestCameraPermission();
        }
      }

      let stream;
      const primaryConstraints = {
        video: {
          facingMode: { ideal: mode },
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 },
        },
        audio: false,
      };

      try {
        stream = await navigator.mediaDevices.getUserMedia(primaryConstraints);
      } catch (firstErr) {
        console.warn("Primary constraints failed, falling back to basic:", firstErr);
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: mode },
          audio: false,
        });
      }

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("autoplay", "");
        videoRef.current.setAttribute("playsinline", "");
        videoRef.current.setAttribute("webkit-playsinline", "true");
        videoRef.current.muted = true;

        await videoRef.current.play().catch((err) => {
          console.warn("Video play error:", err);
        });

        setIsCameraActive(true);
        setIsProcessing(false);
        isScanningRef.current = true;
        animationFrameRef.current = requestAnimationFrame(scanVideoFrame);
      } else {
        setIsCameraActive(true);
        setIsProcessing(false);
      }
    } catch (err) {
      console.error("Camera start error:", err);
      setIsProcessing(false);
      setIsCameraActive(false);
      isScanningRef.current = false;

      if (
        err?.name === "NotAllowedError" ||
        err?.name === "PermissionDeniedError" ||
        err?.message?.toLowerCase().includes("denied")
      ) {
        setCameraErrorType("permission");
        setCameraError(
          "Camera permission was denied. Camera access is required to scan QR codes."
        );
      } else if (
        err?.name === "NotFoundError" ||
        err?.name === "DevicesNotFoundError"
      ) {
        setCameraErrorType("not_found");
        setCameraError("No camera hardware was detected on this device.");
      } else if (
        err?.name === "NotReadableError" ||
        err?.name === "TrackStartError"
      ) {
        setCameraErrorType("busy");
        setCameraError(
          "Camera is currently busy or in use by another app. Please close other camera apps and retry."
        );
      } else {
        setCameraErrorType("generic");
        setCameraError(
          "Could not open live camera stream. You can upload a QR image from your gallery or choose a demo case."
        );
      }
    }
  };

  const handleSwitchCamera = async () => {
    const newMode = facingMode === "environment" ? "user" : "environment";
    setFacingMode(newMode);
    if (isCameraActive) {
      await startCamera(newMode);
    }
  };

  const handleRefreshCamera = async () => {
    setCameraError("");
    setCameraErrorType("");
    await startCamera(facingMode);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setCameraError("");
    setCameraErrorType("");

    try {
      // 1. Try Hardware-Accelerated BarcodeDetector with ImageBitmap
      if ("BarcodeDetector" in window && window.createImageBitmap) {
        try {
          const bitmap = await createImageBitmap(file);
          const detector =
            barcodeDetectorRef.current ||
            new window.BarcodeDetector({ formats: ["qr_code"] });
          const barcodes = await detector.detect(bitmap);
          if (barcodes && barcodes.length > 0 && barcodes[0].rawValue) {
            setIsProcessing(false);
            handleQrDecoded(barcodes[0].rawValue);
            return;
          }
        } catch (bitmapErr) {
          console.warn("BarcodeDetector image decode fallback to jsQR:", bitmapErr);
        }
      }

      // 2. jsQR Canvas fallback
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          try {
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth || img.width;
            canvas.height = img.naturalHeight || img.height;
            const ctx = canvas.getContext("2d");
            if (!ctx) {
              setIsProcessing(false);
              setCameraError("Unable to initialize image canvas.");
              return;
            }
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height, {
              inversionAttempts: "attemptBoth",
            });
            setIsProcessing(false);
            if (code && code.data) {
              handleQrDecoded(code.data);
            } else {
              setCameraError(
                "No valid QR code found in this image. Please select another image or use Demo QR."
              );
            }
          } catch (decodeErr) {
            setIsProcessing(false);
            setCameraError("Could not decode QR code from the selected image.");
          }
        };
        img.onerror = () => {
          setIsProcessing(false);
          setCameraError("Failed to render the selected image file.");
        };
        img.src = reader.result;
      };
      reader.onerror = () => {
        setIsProcessing(false);
        setCameraError("Failed to read the selected file.");
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setIsProcessing(false);
      setCameraError("Failed to process QR image.");
    } finally {
      e.target.value = "";
    }
  };

  // Demo fallback simulation
  const handleTriggerDemoScan = (demoType = "merchant") => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      let demoPayload =
        "upi://pay?pa=quickmerchant@icici&pn=QuickMerchant%20Store&am=500&cu=INR&tn=Store%20Purchase";
      if (demoType === "high") {
        demoPayload =
          "upi://pay?pa=lottery-claim-prize@freeupi&pn=Prize%20Reward%20Desk&am=35000&cu=INR&tn=Claim%20Fee";
      } else if (demoType === "friend") {
        demoPayload =
          "upi://pay?pa=mom@upi&pn=Mom&am=250&cu=INR&tn=Milk%20and%20groceries";
      }
      handleQrDecoded(demoPayload);
    }, 500);
  };

  const handleConfirmPayment = () => {
    if (!decodedData) return;

    const finalAmount = customAmount || decodedData.amount || "500";
    const recipientName =
      decodedData.payeeName || decodedData.payeeVpa || "Merchant";
    const recipientVpa = decodedData.payeeVpa || recipientName;

    const isKnown = KNOWN_RECIPIENTS.some(
      (k) =>
        k.toLowerCase() === recipientName.toLowerCase() ||
        k.toLowerCase() === recipientVpa.toLowerCase()
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
          if (decodedData) {
            setDecodedData(null);
            return;
          }
          if (isCameraActive) {
            stopCamera();
            return;
          }
          stopCamera();
          onBack();
        }}
        dark={true}
      />

      <div
        style={{
          padding: "16px 18px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {/* QR Scanner Viewfinder with Neon Cyan Corners */}
        <div
          style={{
            position: "relative",
            width: "240px",
            height: "240px",
            background: "rgba(15, 23, 42, 0.95)",
            borderRadius: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 40px rgba(6, 182, 212, 0.2)",
            border: "1.5px solid rgba(6, 182, 212, 0.3)",
            overflow: "hidden",
          }}
        >
          {/* Real Live HTML5 Video Element */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            webkit-playsinline="true"
            muted
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "26px",
              display: isCameraActive ? "block" : "none",
              zIndex: 2,
            }}
          />

          {/* 4 Neon Corners */}
          <div
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              width: 28,
              height: 28,
              borderTop: "3.5px solid #06B6D4",
              borderLeft: "3.5px solid #06B6D4",
              borderTopLeftRadius: 10,
              zIndex: 10,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              width: 28,
              height: 28,
              borderTop: "3.5px solid #06B6D4",
              borderRight: "3.5px solid #06B6D4",
              borderTopRightRadius: 10,
              zIndex: 10,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 12,
              left: 12,
              width: 28,
              height: 28,
              borderBottom: "3.5px solid #06B6D4",
              borderLeft: "3.5px solid #06B6D4",
              borderBottomLeftRadius: 10,
              zIndex: 10,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 12,
              right: 12,
              width: 28,
              height: 28,
              borderBottom: "3.5px solid #06B6D4",
              borderRight: "3.5px solid #06B6D4",
              borderBottomRightRadius: 10,
              zIndex: 10,
              pointerEvents: "none",
            }}
          />

          {/* Animated Laser (Cyan-Purple gradient scan beam) */}
          <div
            className="scanner-laser"
            style={{ zIndex: 10, pointerEvents: "none" }}
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
                zIndex: 3,
              }}
            >
              <QrCode size={100} color="#0F172A" />
              <span
                style={{
                  fontSize: "9px",
                  color: "#64748B",
                  fontWeight: "700",
                }}
              >
                {isProcessing
                  ? t("scan_processing", "Opening Camera...")
                  : "UPI QR READY"}
              </span>
            </div>
          )}
        </div>

        {/* Camera Error Alert with Actionable Recovery */}
        {cameraError && (
          <div
            style={{
              width: "100%",
              maxWidth: "340px",
              padding: "12px 14px",
              background: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.35)",
              borderRadius: "14px",
              color: "#FCA5A5",
              fontSize: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <AlertCircle
                size={16}
                color="#EF4444"
                style={{ flexShrink: 0 }}
              />
              <span style={{ lineHeight: "1.4" }}>{cameraError}</span>
            </div>

            <div style={{ display: "flex", gap: "8px", marginTop: "2px" }}>
              <button
                type="button"
                onClick={() => startCamera(facingMode)}
                style={{
                  padding: "6px 12px",
                  background: "rgba(239, 68, 68, 0.25)",
                  border: "1px solid rgba(239, 68, 68, 0.4)",
                  borderRadius: "8px",
                  color: "#FFFFFF",
                  fontSize: "11px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Try Again
              </button>

              {cameraErrorType === "permission" &&
                window.AndroidCameraBridge?.openAppSettings && (
                  <button
                    type="button"
                    onClick={() => window.AndroidCameraBridge.openAppSettings()}
                    style={{
                      padding: "6px 12px",
                      background: "rgba(6, 182, 212, 0.2)",
                      border: "1px solid rgba(6, 182, 212, 0.4)",
                      borderRadius: "8px",
                      color: "#67E8F9",
                      fontSize: "11px",
                      fontWeight: "600",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Settings size={12} />
                    <span>App Settings</span>
                  </button>
                )}
            </div>
          </div>
        )}

        {/* Primary Camera & Gallery Scan Controls */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            width: "100%",
            maxWidth: "340px",
          }}
        >
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
              <span>
                {isProcessing
                  ? "Starting Camera..."
                  : t("scan_open_camera", "Open Camera Scanner")}
              </span>
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
                onClick={handleRefreshCamera}
                title="Refresh Camera"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#06B6D4",
                  padding: "12px",
                  borderRadius: "14px",
                  cursor: "pointer",
                }}
              >
                <RefreshCw size={16} />
              </button>

              <button
                className="icon-btn"
                onClick={handleSwitchCamera}
                title="Switch Camera (Rear/Front)"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#A855F7",
                  padding: "12px",
                  borderRadius: "14px",
                  cursor: "pointer",
                }}
              >
                <SwitchCamera size={16} />
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
