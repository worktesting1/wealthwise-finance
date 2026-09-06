import React, { useState } from "react";
import "./Login.css";
import mac from "../../assets/mac.png";
import logo from "../../assets/wealthwise.png";
import { Loader } from "../../components";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import { useGlobalContext } from "../../context/context";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TemporarySuspendedModal from "../../components/TemporarySuspendedModal";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(14).required(),
});

const Login = () => {
  const [loginLoading, setLoginLoading] = useState(false);
  const [showSuspendedModal, setShowSuspendedModal] = useState(false);
  const { baseUrl, setHeaderNav, loading } = useGlobalContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();

  const handleLoginForm = async (data) => {
    setLoginLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/api/auth/login`, data);
      if (response.status === 200) {
        setLoginLoading(false);
        sessionStorage.setItem("user", JSON.stringify(response.data));
        sessionStorage.setItem(
          "userToken",
          JSON.stringify(response.data.accessToken)
        );
        if (response.data.isSuspended) {
          setShowSuspendedModal(true);
          return;
        }
        toast.success("Login successful!");
        setTimeout(() => navigate("/dashboard"), 2000);
      }
    } catch (error) {
      setLoginLoading(false);
      if (error?.response?.data === "Wrong credentials") {
        toast.error("Wrong email or password.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} transition={Bounce} />
      <section className="login-page">
        {/* Left decorative panel */}
        <div className="login-left-panel">
          <div className="login-panel-content">
            <img src={logo} alt="Wealth Wise" className="login-panel-logo" />
            <img src={mac} alt="Banking" className="login-panel-image" />
            <h2 className="login-panel-title">All-in-One Transfer Solution</h2>
            <p className="login-panel-sub">
              Transfer funds across every country in minutes.<br />
              Fast, secure, and always on time.
            </p>
          </div>
        </div>

        {/* Right form panel */}
        <div className="login-right-panel">
          <div className="login-form-header">
            <span className="login-form-eyebrow">Welcome back</span>
            <h1 className="login-form-title">Sign in to your account</h1>
            <p className="login-form-subtitle">
              Enter your credentials to access your Wealth Wise dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit(handleLoginForm)}>
            <div className="login-field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="field-error">{errors.email.message}</p>
              )}
            </div>

            <div className="login-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Your password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="field-error">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="login-submit-btn"
              disabled={loginLoading}
            >
              {loginLoading ? "Signing in…" : "Sign In"}
            </button>

            <div className="login-footer-links">
              <p className="login-footer-text">
                Don't have an account?{" "}
                <span
                  onClick={() => {
                    setHeaderNav(false);
                    navigate("/register");
                  }}
                >
                  Create one
                </span>
              </p>
              <p className="login-footer-text">
                <span onClick={() => navigate("/forget-password")}>
                  Forgot your password?
                </span>
              </p>
            </div>
          </form>
        </div>
      </section>
      {showSuspendedModal && (
        <TemporarySuspendedModal
          onContinue={() => {
            setShowSuspendedModal(false);
            navigate("/dashboard");
          }}
        />
      )}
    </>
  );
};

export default Login;
