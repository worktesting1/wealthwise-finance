import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const TransferSuccessModal = ({ show, onClose, amount }) => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  // Lightweight confetti burst
  useEffect(() => {
    if (!show) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const colors = ["#2563eb", "#16a34a", "#f59e0b", "#ec4899", "#8b5cf6", "#06b6d4"];
    const particles = Array.from({ length: 60 }, () => ({
      x: canvas.width / 2 + (Math.random() - 0.5) * 20,
      y: canvas.height * 0.38,
      vx: (Math.random() - 0.5) * 8,
      vy: -(Math.random() * 7 + 3),
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 6 + 3,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 8,
      gravity: 0.28,
      alpha: 1,
      shape: Math.random() > 0.5 ? "rect" : "circle",
    }));

    let frame;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.rotSpeed;
        p.alpha -= 0.012;
        if (p.alpha > 0) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          if (p.shape === "rect") {
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.5);
          } else {
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
      });
      if (alive) frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [show]);

  if (!show) return null;

  const displayAmount = amount != null
    ? `$${Number(amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : null;

  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  const dateStr = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const refId = `WW-${Math.random().toString(36).slice(2, 9).toUpperCase()}`;

  return (
    <div className="tsm-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="tsm-card">
        <canvas ref={canvasRef} className="tsm-canvas" />

        {/* Close */}
        <button className="tsm-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Animated checkmark */}
        <div className="tsm-icon-wrap">
          <svg className="tsm-check-svg" viewBox="0 0 52 52">
            <circle className="tsm-check-circle" cx="26" cy="26" r="24" fill="none" />
            <path className="tsm-check-tick" fill="none" d="M14 27l8 8 16-16" />
          </svg>
        </div>

        <p className="tsm-label">Transfer Successful</p>
        {displayAmount && <p className="tsm-amount">{displayAmount}</p>}

        {/* Receipt strip */}
        <div className="tsm-receipt">
          <div className="tsm-receipt-row">
            <span>Status</span>
            <span className="tsm-badge-success">Completed</span>
          </div>
          <div className="tsm-divider" />
          <div className="tsm-receipt-row">
            <span>Date</span>
            <span>{dateStr}</span>
          </div>
          <div className="tsm-receipt-row">
            <span>Time</span>
            <span>{timeStr}</span>
          </div>
          <div className="tsm-divider" />
          <div className="tsm-receipt-row">
            <span>Reference</span>
            <span className="tsm-ref">{refId}</span>
          </div>
        </div>

        <div className="tsm-actions">
          <button className="tsm-btn-primary" onClick={() => navigate("/dashboard/accountHistory")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
            </svg>
            View Transactions
          </button>
          <button className="tsm-btn-ghost" onClick={onClose}>
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransferSuccessModal;
