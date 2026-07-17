import React from "react";
import "./About.css";
import { useGlobalContext } from "../../context/context";
import { Card, Contact, Footer, Header, Loader } from "../../components";
import { useNavigate } from "react-router-dom";

import cardLogo1 from "../../assets/feature-icon-1.png";
import cardLogo2 from "../../assets/feature-icon-2.png";
import cardLogo3 from "../../assets/feature-icon-3.png";
import transacLogo3 from "../../assets/payment-service-3.png";
import transacLogo2 from "../../assets/3.jpg";

const cardDetails = [
  {
    title: "Fully Secure Payment",
    para: "Every transaction protected with bank-grade security.",
    image: cardLogo1,
  },
  {
    title: "No Hidden Charges",
    para: "Fund transfers are completely free of hidden fees.",
    image: cardLogo2,
  },
  {
    title: "Instant Cashout",
    para: "Withdraw funds at any of our ATMs or branches instantly.",
    image: cardLogo3,
  },
];

const About = () => {
  const { loading } = useGlobalContext();
  const navigate = useNavigate();

  if (loading) return <Loader />;

  return (
    <div className="about-page">
      <Header />

      {/* Hero Banner */}
      <section
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #2563eb 100%)",
          padding: "140px 80px 80px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#fff", fontSize: "46px", fontWeight: 800, marginBottom: "16px" }}>
          About Wealth Wise
        </h1>
        <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "17px", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
          The world's most trusted digital banking platform, empowering millions to take control of their finances.
        </p>
      </section>

      {/* Intro */}
      <section className="about-intro">
        <div className="about-intro-text">
          <span className="home-feature-eyebrow">Who We Are</span>
          <h2 className="about-intro-title">What Service We Provide</h2>
          <p className="about-intro-body">
            Wealth Wise is a front-liner in digital and in-house banking. With over a million
            customers, we ensure the best use of your digital assets by putting your money to
            work for you. We are ahead of the banking business any day, any time.
          </p>
          <p className="about-intro-body" style={{ marginTop: "16px" }}>
            With over 100 years in banking, we offer the safest options any financial institution
            can give — from Savings and Checking Accounts to Investment Accounts. Our international
            fund transfer is the best and most secure you can ever experience.
          </p>
        </div>
        <div className="about-intro-image">
          <img src={transacLogo2} alt="About Wealth Wise" />
        </div>
      </section>

      {/* Feature cards */}
      <div style={{ background: "#fff" }}>
        <Card cards={cardDetails} aos={"fade-up-left"} />
      </div>

      {/* What We Do */}
      <section className="about-what-we-do">
        <h2 className="about-what-we-do-title">What We Do For You</h2>
        <p className="about-what-we-do-sub">
          We ensure your money is safe and works for you — even while you sleep.
        </p>
        <div className="about-pills">
          <span className="about-pill active">Money Transactions</span>
          <span className="about-pill">Activity Tracking</span>
          <span className="about-pill">Secure Storage</span>
        </div>
      </section>

      {/* Transfer section */}
      <section className="about-transfer">
        <div className="about-transfer-image" data-aos="flip-right">
          <img src={transacLogo3} alt="Fund Transfer" />
        </div>
        <div className="about-transfer-text" data-aos="fade-down-left">
          <h2 className="about-transfer-title">
            The Easiest Way to Transfer Money
          </h2>
          <p className="about-transfer-body">
            Fund transfer is as easy as ABC with Wealth Wise.
          </p>
          <p className="about-transfer-body">
            Create an account today, log in to your dashboard, and initiate a
            fund transfer — experience the safest transfer ever.
          </p>
          <button className="about-transfer-btn" onClick={() => navigate("/register")}>
            Get Started
          </button>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="about-cta">
        <h2 className="about-cta-title">Make Payments & Withdraw Anytime</h2>
        <p className="about-cta-sub">
          Log into your account or register today to start making payments and withdrawals with ease.
        </p>
        <div className="about-cta-actions">
          <button className="about-cta-btn-primary" onClick={() => navigate("/login")}>
            Login to Account
          </button>
          <button className="about-cta-btn-outline" onClick={() => navigate("/register")}>
            Create Account
          </button>
        </div>
      </section>

      {/* Mission Vision Goal */}
      <section className="about-mvg">
        <div className="about-mvg-image" data-aos="zoom-in-up">
          <img src={transacLogo2} alt="Our Mission" />
        </div>
        <div className="about-mvg-content" data-aos="zoom-out-down">
          <h2 className="about-mvg-title">Built on Purpose</h2>
          <div className="about-mvg-items">
            <div className="about-mvg-item">
              <div className="about-mvg-dot">🎯</div>
              <div className="about-mvg-item-text">
                <h3>Our Mission</h3>
                <p>To be the best online banking platform in the world, delivering unmatched service and security.</p>
              </div>
            </div>
            <div className="about-mvg-item">
              <div className="about-mvg-dot">🔭</div>
              <div className="about-mvg-item-text">
                <h3>Our Vision</h3>
                <p>To bring digital banking to the doorstep of everyone, everywhere — regardless of location.</p>
              </div>
            </div>
            <div className="about-mvg-item">
              <div className="about-mvg-dot">💡</div>
              <div className="about-mvg-item-text">
                <h3>Our Goal</h3>
                <p>To ensure your money works for you 24/7 — even when you're sleeping.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Contact />
    </div>
  );
};

export default About;
