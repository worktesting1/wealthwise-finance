import { useState } from "react";
import "./styles.css";
import { ColorRing } from "react-loader-spinner";
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
  } = JSON.parse(sessionStorage.getItem("user")) || userDetails;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    } else {
      if (transferStep === 1) {
        if (otp === firstCode) {
          handleTransferStep();
        } else {
          setError("Please enter a valid 6-digit OTP");
        }
      } else if (transferStep === 2) {
        if (otp === secondCode) {
          handleTransferStep();
        } else {
          setError("Please enter a valid 6-digit OTP");
        }
      } else if (transferStep === 3) {
        if (otp === thirdCode) {
          handleTransferStep();
        } else {
          setError("Please enter a valid 6-digit OTP");
        }
      } else {
        if (otp === forthCode) {
          submitTransfer();
        } else {
          setError("Please enter a valid 6-digit OTP");
        }
      }
    }
  };

  const submitTransfer = () => {
    setLoading(true);
    axios
      .post(`${baseUrl}/api/wallet/withdraw`, transferDetails, {
        headers: { token: accessToken },
      })
      .then((data) => {
        setShowOTPModal(false);
        setShowSuccessModal(true);
        setLoading(false);
        getUser(accessToken, _id);
        getUserWithdrawals(accessToken, _id);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const handleTransferStep = () => {
    setLoading(true);
    axios
      .put(
        `${baseUrl}/api/users/user/${_id}`,
        {
          transferStep: transferStep + 1,
        },
        { headers: { token: accessToken } }
      )
      .then((response) => {
        setShowOTPModal(false);
        setShowTransferPendingModal(true);
        setLoading(false);
        getUser(accessToken, _id);
        toast.success("Thank you! Your Withdrawal has been processed");
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const showAppropriateMessage =
    transferStep === 1
      ? firstMessage
      : transferStep === 2
      ? secondMessage
      : transferStep === 3
      ? thirdMessage
      : forthMessage;

  if (!show) {
    return null;
  }

  return (
    <div className="otp-modal-overlay">
      <div className="otp-modal">
        <button className="close-button" onClick={onClose}>
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

        <div className="otp-header">
          <div className="otp-icon">
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
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <h2>{showAppropriateMessage}</h2>
          <p>We've sent a 6-digit OTP to your registered email/phone</p>
        </div>

        <form onSubmit={handleSubmit} className="otp-form">
          <div className="otp-input-group">
            <label htmlFor="otp">Enter Code</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                setError("");
              }}
              maxLength="6"
              placeholder="123456"
              autoComplete="off"
            />
            {error && <p className="error-message">{error}</p>}
          </div>

          <div className="otp-footer">
            <p className="resend-text">
              Didn't receive the code?{" "}
              <button type="button" className="resend-button">
                Resend OTP
              </button>
            </p>
            <button type="submit" className="verify-button">
              {loading ? (
                <ColorRing
                  visible={true}
                  height="37"
                  width="37"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
                />
              ) : (
                "Verify"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPModal;
