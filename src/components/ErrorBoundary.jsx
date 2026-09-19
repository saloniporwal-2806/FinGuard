import React from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("FinGuard ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    } else {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "360px",
            textAlign: "center",
            background: "#F8FAFC",
            borderRadius: "20px",
            margin: "16px",
            border: "1.5px solid #E2E8F0",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "#FEF2F2",
              color: "#EF4444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px",
            }}
          >
            <AlertTriangle size={28} />
          </div>

          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "18px",
              fontWeight: "800",
              color: "#0F172A",
              marginBottom: "6px",
            }}
          >
            Something went wrong
          </h3>
          <p
            style={{
              fontSize: "12.5px",
              color: "#64748B",
              lineHeight: 1.45,
              maxWidth: "280px",
              marginBottom: "20px",
            }}
          >
            We encountered a temporary display issue. Your saved data and security profile are safe.
          </p>

          <div style={{ display: "flex", gap: "10px", width: "100%", maxWidth: "260px" }}>
            <button
              onClick={this.handleReset}
              className="btn-primary"
              style={{ padding: "12px 16px", fontSize: "13px" }}
            >
              <RotateCcw size={15} />
              <span>Retry</span>
            </button>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                if (this.props.onHome) this.props.onHome();
              }}
              className="btn-secondary"
              style={{ padding: "12px 16px", fontSize: "13px" }}
            >
              <Home size={15} />
              <span>Home</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
