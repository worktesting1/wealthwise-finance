import React, { useState } from "react";
import "./ForgetPass.css";
import logo from "../../assets/wealthwise.png";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import { useGlobalContext } from "../../context/context";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColorRing } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { MdEmail, MdArrowBack } from "react-icons/md";

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const ForgetPass = () => {
  const [loading, setLoading] = useState(false);
  const { baseUrl } = useGlobalContext();
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLoginForm = async (data) => {
    setLoading(true);
    try {
      const resetPassword = await axios.post(`${baseUrl}/api/auth/forget`, {
        email: data.email,
      });
      if (resetPassword.status === 200) {
        toast.success("Reset link sent! Check your inbox.");
        setLoading(false);
      }
    } catch (error) {
      if (error.response?.data === "Wrong credentials") {
        toast.error("No account found with that email.");
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
              <MdEmail />
            </div>

            <h2 className="forget-panel-title">Forgot your password?</h2>
            <p className="forget-panel-sub">
              No worries — it happens. Enter your email address and we'll send
              you a secure link to reset your password.
            </p>

            <div className="forget-steps">
              <div className="forget-step">
                <div className="forget-step-num">1</div>
                <span className="forget-step-text">Enter your registered email address</span>
              </div>
              <div className="forget-step">
                <div className="forget-step-num">2</div>
                <span className="forget-step-text">Check your inbox for the reset link</span>
              </div>
              <div className="forget-step">
                <div className="forget-step-num">3</div>
                <span className="forget-step-text">Create a new secure password</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="forget-right-panel">
          <span className="forget-form-eyebrow">Password Reset</span>
          <h1 className="forget-form-title">Reset your password</h1>
          <p className="forget-form-sub">
            Enter the email address linked to your Wealth Wise account and we'll
            email you a reset link.
          </p>

          <form onSubmit={handleSubmit(handleLoginForm)}>
            <div className="forget-field">
              <label htmlFor="forget-email">Email Address</label>
              <input
                id="forget-email"
                type="email"
                placeholder="you@example.com"
                {...register("email", { required: true })}
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
                "Send Reset Link"
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

export default ForgetPass;
