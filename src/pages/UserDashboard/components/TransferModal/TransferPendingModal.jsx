import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../../context/context";

const TransferPendingModal = ({ show, amount }) => {
  const { formatNumber } = useGlobalContext();
  const navigate = useNavigate();
  if (!show) return null;

  const displayAmount = amount != null
    ? `$${formatNumber(amount)}`
    : null;

  const eta = "1 – 3 business days";
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const refId = `WW-${Math.random().toString(36).slice(2, 9).toUpperCase()}`;

  return (
    <div className="tpm-overlay">
      <div className="tpm-card">
        {/* Animated processing ring */}
        <div className="tpm-ring-wrap">
          <div className="tpm-ring-outer">
            <div className="tpm-ring-inner">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            </div>
          </div>
          {/* Orbit dot */}
          <div className="tpm-orbit">
            <div className="tpm-orbit-dot" />
          </div>
        </div>

        <p className="tpm-title">Processing Transfer</p>
        {displayAmount && <p className="tpm-amount">{displayAmount}</p>}
        <p className="tpm-subtitle">
          Your transfer is being processed securely. You will receive a confirmation once it's complete.
        </p>

        {/* Info strip */}
        <div className="tpm-info-strip">
          <div className="tpm-info-row">
            <span className="tpm-info-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4l2 2" />
              </svg>
            </span>
            <div>
              <p className="tpm-info-label">Estimated Arrival</p>
              <p className="tpm-info-value">{eta}</p>
            </div>
          </div>
          <div className="tpm-info-sep" />
          <div className="tpm-info-row">
            <span className="tpm-info-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="18" height="18" x="3" y="4" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </span>
            <div>
              <p className="tpm-info-label">Submitted</p>
              <p className="tpm-info-value">{dateStr}</p>
            </div>
          </div>
          <div className="tpm-info-sep" />
          <div className="tpm-info-row">
            <span className="tpm-info-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </span>
            <div>
              <p className="tpm-info-label">Reference ID</p>
              <p className="tpm-info-value tpm-ref">{refId}</p>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="tpm-steps">
          <div className="tpm-step tpm-step--done">
            <div className="tpm-step-dot">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>Transfer initiated</span>
          </div>
          <div className="tpm-step-line tpm-step-line--active" />
          <div className="tpm-step tpm-step--active">
            <div className="tpm-step-dot tpm-step-dot--pulse" />
            <span>Processing</span>
          </div>
          <div className="tpm-step-line" />
          <div className="tpm-step tpm-step--pending">
            <div className="tpm-step-dot tpm-step-dot--empty" />
            <span>Completed</span>
          </div>
        </div>

        <button className="tpm-btn" onClick={() => navigate("/dashboard")}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
            <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default TransferPendingModal;
