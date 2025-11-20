import React, { useState } from "react";
import "./FilingIDForm.css";

const FilingIDForm = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [filingId, setFilingId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle form submission to your backend
    setShowSuccessAlert(true);

    // Hide the alert after 5 seconds
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 5000);
  };

  return (
    <div className="filing-id-container">
      <div className="filing-id-wrapper">
        {/* Success Alert */}
        {showSuccessAlert && (
          <div className="alert-container animate-fade-in-down">
            <div className="alert-success">
              <div className="alert-stripe"></div>
              <div className="alert-content">
                <div className="alert-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                </div>
                <div className="alert-message">
                  Your refund request has been submitted successfully. Please
                  enter your filing ID to proceed.
                </div>
                <button
                  className="alert-close"
                  onClick={() => setShowSuccessAlert(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="filing-id-content">
          {/* Header with Icon */}
          <div className="filing-id-header">
            <div className="header-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                <path d="M10 9H8"></path>
                <path d="M16 13H8"></path>
                <path d="M16 17H8"></path>
              </svg>
            </div>
            <h1>Enter Your Filing ID</h1>
            <p>Please enter the filing ID provided by our support team</p>
          </div>

          {/* Success Message */}
          <div className="success-message">
            <div className="message-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                <path d="m9 11 3 3L22 4"></path>
              </svg>
            </div>
            <p>
              Your refund request has been submitted successfully. Please enter
              your filing ID to proceed.
            </p>
          </div>

          {/* Form Card */}
          <div className="filing-id-card">
            <div className="card-content">
              {/* Support Notice */}
              <div className="support-notice">
                <div className="notice_svg_con">
                  <div className="notice-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 16v-4"></path>
                      <path d="M12 8h.01"></path>
                    </svg>
                  </div>
                  <h3>Need a Filing ID?</h3>
                </div>
                <div className="notice-content">
                  <p>
                    Please contact our support team to receive your filing ID.
                    This ID is required to process your refund request.
                  </p>
                  <div className="notice-action">
                    <a href="/dashboard/support" className="support-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path>
                      </svg>
                      Contact Support
                    </a>
                  </div>
                </div>
              </div>

              {/* Filing ID Form */}
              <form onSubmit={handleSubmit} className="filing-id-form">
                <div className="form-section">
                  <h3 className="section-title">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"></path>
                      <path d="m21 2-9.6 9.6"></path>
                      <circle cx="7.5" cy="15.5" r="5.5"></circle>
                    </svg>
                    Filing ID Information
                  </h3>

                  <div className="form-group">
                    <label htmlFor="filing_id">Filing ID</label>
                    <div className="input-group">
                      <div className="input-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="4" x2="20" y1="9" y2="9"></line>
                          <line x1="4" x2="20" y1="15" y2="15"></line>
                          <line x1="10" x2="8" y1="3" y2="21"></line>
                          <line x1="16" x2="14" y1="3" y2="21"></line>
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="filing_id"
                        id="filing_id"
                        required
                        value={filingId}
                        onChange={(e) => setFilingId(e.target.value)}
                        placeholder="Enter your filing ID"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="form-actions">
                  <button type="submit" className="submit-button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
                      <path d="m21.854 2.147-10.94 10.939"></path>
                    </svg>
                    Submit Filing ID
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilingIDForm;
