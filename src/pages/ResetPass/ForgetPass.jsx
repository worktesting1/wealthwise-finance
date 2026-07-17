import React, { useState } from "react";
import "../ForgetPass/ForgetPass.css";
import logo from "../../assets/wealthwise.png";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import { useGlobalContext } from "../../context/context";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColorRing } from "react-loader-spinner";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdLockReset, MdArrowBack } from "react-icons/md";

const schema = yup.object().shape({
  password: yup.string().required(),
  confirmpassword: yup.string().required(),
});

const ResetPass = () => {
  const [loading, setLoading] = useState(false);
  const { baseUrl } = useGlobalContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLoginForm = async (data) => {
    data.resetToken = id;
    setLoading(true);
    try {
      const resetPassword = await axios.post(`${baseUrl}/api/auth/reset`, data);
      if (resetPassword.status === 200) {
        toast.success("Password reset successfully! Redirecting…");
        setLoading(false);
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (error) {
      if (error.response?.data === "Wrong credentials") {
        toast.error("Invalid or expired reset link.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3500} />
      <div className="forget-page">
        {/* Left branding panel */}
        <div className="forget-left-panel">
          <div className="forget-panel-content">
            <img src={logo} alt="Wealth Wise" className="forget-panel-logo" />

            <div className="forget-panel-icon">
              <MdLockReset />
            </div>

            <h2 className="forget-panel-title">Create a new password</h2>
            <p className="forget-panel-sub">
              Choose a strong, unique password for your Wealth Wise account. You
              will be redirected to sign in once it's saved.
            </p>

            <div className="forget-steps">
              <div className="forget-step">
                <div className="forget-step-num">✓</div>
                <span className="forget-step-text">Email verified successfully</span>
              </div>
              <div className="forget-step">
                <div className="forget-step-num">2</div>
                <span className="forget-step-text">Enter and confirm your new password</span>
              </div>
              <div className="forget-step">
                <div className="forget-step-num">3</div>
                <span className="forget-step-text">Sign in with your new credentials</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="forget-right-panel">
          <span className="forget-form-eyebrow">New Password</span>
          <h1 className="forget-form-title">Set a new password</h1>
          <p className="forget-form-sub">
            Your new password must be different from any previously used
            passwords.
          </p>

          <form onSubmit={handleSubmit(handleLoginForm)}>
            <div className="forget-field">
              <label htmlFor="new-password">New Password</label>
              <input
                id="new-password"
                type="password"
                placeholder="Enter new password"
                {...register("password", { required: true })}
              />
            </div>
            <div className="forget-field">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                id="confirm-password"
                type="password"
                placeholder="Confirm new password"
                {...register("confirmpassword", { required: true })}
              />
            </div>

            <button
              type="submit"
              className="forget-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <ColorRing
                  visible
                  height="36"
                  width="36"
                  ariaLabel="loading"
                  colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
                />
              ) : (
                "Reset Password"
              )}
            </button>
          </form>

          <Link to="/login" className="forget-back-link">
            <MdArrowBack />
            Back to sign in
          </Link>
        </div>
      </div>
    </>
  );
};

export default ResetPass;
