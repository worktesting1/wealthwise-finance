import { useState } from "react";
import "./styles.css";
import axios from "axios";
import { useGlobalContext } from "../../../../context/context";
import { toast } from "react-toastify";

const OTPModal = ({ show, onClose, transferDetails, setShowSuccessModal }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    baseUrl,
    userDetails,
    setShowTransferPendingModal,
    setShowOTPModal,
    getUser,
    getUserWithdrawals,
  } = useGlobalContext();
  const accessToken = JSON.parse(sessionStorage.getItem("userToken"));
  const {
    _id,
    transferStep,
    secondCode,
    secondMessage,
    firstCode,
    firstMessage,
    thirdCode,
    thirdMessage,
    forthCode,
    forthMessage,
  } = JSON.parse(sessionStorage.getItem("user")) || userDetails || {};

  const handleChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(val);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("Please enter the 6-digit code");
      return;
    }

    if (!transferStep || transferStep === 0) {
      if (otp === forthCode || !forthCode) {
        submitTransfer();
      } else {
        setError("Incorrect code. Please try again.");
      }
      return;
    }

    if (transferStep === 1) {
      otp === firstCode ? handleTransferStep() : setError("Incorrect code. Please try again.");
    } else if (transferStep === 2) {
      otp === secondCode ? handleTransferStep() : setError("Incorrect code. Please try again.");
    } else if (transferStep === 3) {
      otp === thirdCode ? handleTransferStep() : setError("Incorrect code. Please try again.");
    } else {
      otp === forthCode ? submitTransfer() : setError("Incorrect code. Please try again.");
    }
  };

  const submitTransfer = () => {
    setLoading(true);
    axios
      .post(`${baseUrl}/api/wallet/withdraw`, transferDetails, {
        headers: { token: accessToken },
      })
      .then(() => {
        setShowOTPModal(false);
        setShowSuccessModal(true);
        setLoading(false);
        getUser(accessToken, _id);
        getUserWithdrawals(accessToken, _id);
      })
      .catch(() => setLoading(false));
  };

  const handleTransferStep = () => {
    setLoading(true);
    axios
      .put(
        `${baseUrl}/api/users/user/${_id}`,
        { transferStep: transferStep + 1 },
        { headers: { token: accessToken } }
      )
      .then(() => {
        setShowOTPModal(false);
        setShowTransferPendingModal(true);
        setLoading(false);
        getUser(accessToken, _id);
        toast.success("Thank you! Your Withdrawal has been processed");
      })
      .catch(() => setLoading(false));
  };

  const showAppropriateMessage =
    transferStep === 1 ? firstMessage
    : transferStep === 2 ? secondMessage
    : transferStep === 3 ? thirdMessage
    : forthMessage;

  if (!show) return null;

  return (
    <div className="otp-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="otp-card">
        {/* Close */}
        <button className="otp-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Shield icon */}
        <div className="otp-icon-ring">
          <div className="otp-icon-inner">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
        </div>

        <h2 className="otp-title">Verification Required</h2>
        <p className="otp-subtitle">
          {showAppropriateMessage || "Enter the 6-digit code sent to your registered contact"}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="otp-input-wrap">
            <input
              className={`otp-input${error ? " otp-input--error" : ""}`}
              type="text"
              inputMode="numeric"
              placeholder="Enter 6-digit code"
              value={otp}
              onChange={handleChange}
              autoFocus
              autoComplete="one-time-code"
              maxLength={6}
            />
          </div>

          {error && (
            <div className="otp-error">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
              {error}
            </div>
          )}

          <button type="submit" className="otp-submit" disabled={loading}>
            {loading ? (
              <span className="otp-spinner" />
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                Verify &amp; Continue
              </>
            )}
          </button>
        </form>

        <p className="otp-resend">
          Didn't receive the code?{" "}
          <button type="button" className="otp-resend-btn">Resend</button>
        </p>

        <div className="otp-security-note">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect width="18" height="11" x="3" y="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          256-bit encrypted &amp; secure
        </div>
      </div>
    </div>
  );
};

export default OTPModal;
