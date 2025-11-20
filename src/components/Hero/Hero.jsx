import React from "react";
import "../Hero/Hero.css";
import { useLocation, useNavigate } from "react-router-dom";

const Hero = ({ title }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <section className={`page-hero`}>
      <div className="page-hero-text-container">
        <h1 className="sub-header-text">
          {title ? title : "Welcome To Wealth Wise"}
        </h1>
        <p className="sub-p">
          Create your Wealth Wise Account and make your first direct deposit
          into this account within 60 days. Keep an average beginning day
          balance of $10,000. We are a bank without border
        </p>
      </div>
      {pathname !== "/register" && (
        <div className="flex">
          <button
            className="purple-btn"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
          <button
            className="purple-btn"
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </button>
        </div>
      )}
    </section>
  );
};

export default Hero;
