import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../../../context/context";

const OTPModal = ({}) => {
  const { userData, baseUrl, getUser } = useGlobalContext();
  const { otpMessage, userOtp, transferStep } = userData;
  const [otpError, setOtpError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const accessToken = JSON.parse(sessionStorage.getItem("userToken"));

  const navigate = useNavigate();

  const updateOTPStep = () => {
    setLoading(true);
    axios
      .put(
        `${baseUrl}/api/users/user/${userData._id}`,
        { transferStep: transferStep + 1 },
        { headers: { token: accessToken } }
      )
      .then((data) => {
        setLoading(false);
        getUser(accessToken);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const notify = () =>
    toast.success(
      "The OTP check was successful, Please come back in ten minutes time"
    );

  //Check OTP
  const checkOtp = () => {
    if (inputValue !== userOtp) {
      setOtpError(true);
    }
    if (inputValue == userOtp) {
      setOtpError(false);
      updateOTPStep();
      if (!loading) {
        notify();
        setTimeout(() => {
          navigate("/dash/dashboard");
        }, 3000);
      }
    }
  };

  return (
    <>
      <div className="otp_modal">
        <div>
          <p className="otp_message">{otpMessage}</p>
          <input
            type="text"
            placeholder="Enter OTP"
            onChange={(e) => setInputValue(e.target.value)}
          />
          {otpError && (
            <p className="error" style={{ marginTop: "15px" }}>
              Invalid OTP
            </p>
          )}
          <button className="btn" type="submit" onClick={checkOtp}>
            {loading ? "loading..." : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
};

export default OTPModal;
