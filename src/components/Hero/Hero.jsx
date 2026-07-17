import React from "react";
import "../Hero/Hero.css";
import { useLocation, useNavigate } from "react-router-dom";

const Hero = ({ title }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <section className="page-hero">
      <div className="page-hero-text-container">
        <h1 className="sub-header-text">
          {title ? title : "Welcome To Wealth Wise"}
        </h1>
        <p className="sub-p">
          Create your Wealth Wise Account and make your first direct deposit
          into this account within 60 days. We are a bank without borders.
        </p>
      </div>
      {pathname !== "/register" && (
        <div className="hero-actions">
          <button
            className="hero-btn-primary"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="hero-btn-outline"
            onClick={() => navigate("/register")}
          >
            Create Account
          </button>
        </div>
      )}
    </section>
  );
};

export default Hero;
