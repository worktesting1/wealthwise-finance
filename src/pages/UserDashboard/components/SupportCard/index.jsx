import React from "react";
import "./SupportCard.css"; // Regular CSS import

const SupportCard = () => {
  const handleContactSupport = () => {
    const subject = "Support Request";
    const body =
      "Hello Wealthwise Support Team,\n\nI need assistance with:\n\n";
    window.location.href = `mailto:wealthwise@cosultant.online?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="help-card-container">
      <div className="help-card-content">
        <div className="help-card-icon-wrapper">
          <div className="help-card-icon-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="help-card-icon"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <path d="M12 17h.01" />
            </svg>
          </div>
        </div>

        <h3 className="help-card-title">Need Help?</h3>
        <p className="help-card-description">
          Our support team is here to assist you 24/7
        </p>

        <div className="help-card-button-wrapper">
          <button onClick={handleContactSupport} className="help-card-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="help-card-message-icon"
            >
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
            </svg>
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportCard;
