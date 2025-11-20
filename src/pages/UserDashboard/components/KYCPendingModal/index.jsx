import "./styles.css";

const KYCPendingModal = ({ show, onClose, estimatedTime = "24-48 hours" }) => {
  const handleContactSupport = () => {
    const subject = "Support Request";
    const body =
      "Hello Wealthwise Support Team,\n\nI need assistance with:\n\n";
    window.location.href = `mailto:wealthwise@cosultant.online?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };
  if (!show) return null;

  return (
    <div className="kyc-pending-overlay">
      <div className="kyc-pending-modal">
        <div className="kyc-pending-content">
          <div className="status-icon pending">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
              <path d="M12 7c-.55 0-1 .45-1 1v5c0 .55.45 1 1 1s1-.45 1-1V8c0-.55-.45-1-1-1zm0 9c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" />
            </svg>
          </div>

          <h2>KYC Verification Pending</h2>

          <div className="status-message">
            <p>Your documents are under review by our verification team.</p>
            <p>
              Estimated completion time: <strong>{estimatedTime}</strong>
            </p>
          </div>

          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
            <span className="progress-text">Verification in progress</span>
          </div>

          <div className="whats-next">
            <h3>What's Next?</h3>
            <ul>
              <li>You'll receive an email notification once verified</li>
              <li>
                Contact support if verification takes longer than expected
              </li>
            </ul>
          </div>

          <div className="action-buttons">
            <button className="support-button" onClick={handleContactSupport}>
              Contact Support
            </button>
            <button className="pending_kyc_close_button" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYCPendingModal;
