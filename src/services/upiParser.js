/**
 * UPI QR Code Parser
 * Complies with NPCI UPI QR specification:
 * Format: upi://pay?pa={vpa}&pn={name}&am={amount}&cu={currency}&tn={note}&tr={ref}
 */
export function parseUpiQr(rawPayload) {
  if (!rawPayload || typeof rawPayload !== "string") {
    return {
      isUpi: false,
      payeeVpa: "",
      payeeName: "",
      amount: "",
      note: "",
      refId: "",
      raw: "",
    };
  }

  const trimmed = rawPayload.trim();

  // 1. Check if it's a UPI protocol URI: upi://pay?...
  if (trimmed.toLowerCase().startsWith("upi://pay")) {
    try {
      // Normalize to parse query params reliably
      const queryString = trimmed.includes("?") ? trimmed.split("?")[1] : "";
      const searchParams = new URLSearchParams(queryString);

      const pa = searchParams.get("pa") || "";
      const pn = searchParams.get("pn") || "";
      const am = searchParams.get("am") || "";
      const tn = searchParams.get("tn") || "";
      const tr = searchParams.get("tr") || searchParams.get("tid") || "";
      const cu = searchParams.get("cu") || "INR";

      // Clean up encoded strings
      const decodedName = pn ? decodeURIComponent(pn.replace(/\+/g, " ")) : "";
      const decodedNote = tn ? decodeURIComponent(tn.replace(/\+/g, " ")) : "";

      return {
        isUpi: true,
        payeeVpa: pa.trim(),
        payeeName: decodedName.trim() || pa.trim(),
        amount: am ? String(parseFloat(am)) : "",
        note: decodedNote.trim(),
        refId: tr.trim(),
        currency: cu,
        raw: trimmed,
      };
    } catch (e) {
      console.warn("UPI parsing exception:", e);
    }
  }

  // 2. Check if string is a raw VPA (e.g., example@upi, 9876543210@paytm, merchant@okaxis)
  const vpaRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
  if (vpaRegex.test(trimmed)) {
    return {
      isUpi: true,
      payeeVpa: trimmed,
      payeeName: trimmed.split("@")[0],
      amount: "",
      note: "",
      refId: "",
      currency: "INR",
      raw: trimmed,
    };
  }

  // 3. Fallback for other QR codes or URLs
  return {
    isUpi: false,
    payeeVpa: "",
    payeeName: trimmed.length > 30 ? trimmed.substring(0, 30) + "..." : trimmed,
    amount: "",
    note: "",
    refId: "",
    raw: trimmed,
  };
}
