import React from "react";
import "./TemporarySuspendedModal.css";

const TemporarySuspendedModal = ({ onContinue }) => {
  return (
    <div className="suspended-modal-backdrop">
      <div
        className="suspended-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="suspended-modal-title"
        aria-describedby="suspended-modal-description"
      >
        <div className="suspended-modal-icon" aria-hidden="true">
          !
        </div>
        <p className="suspended-modal-eyebrow">Account notice</p>
        <h2 id="suspended-modal-title">Your account is temporarily suspended</h2>
        <p id="suspended-modal-description">
          Your account has been temporarily suspended by the account team. You can
          continue to your dashboard, but some account actions may be unavailable
          until the suspension is lifted.
        </p>
        <button
          type="button"
          className="suspended-modal-button"
          onClick={onContinue}
        >
          Continue to dashboard
        </button>
      </div>
    </div>
  );
};

export default TemporarySuspendedModal;