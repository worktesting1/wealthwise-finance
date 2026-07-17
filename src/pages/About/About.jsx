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
    para: "Every transaction is protected with 256-bit encryption and bank-grade security standards — your money is always safe.",
    image: cardLogo1,
  },
  {
    title: "No Hidden Charges",
    para: "Transparent pricing, always. Fund transfers carry zero hidden fees so you keep every cent of what you send.",
    image: cardLogo2,
  },
  {
    title: "Instant Cashout",
    para: "Withdraw funds instantly at any of our ATMs or partner branches — 24 hours a day, 7 days a week.",
    image: cardLogo3,
  },
];

const features = [
  {
    icon: "💸",
    title: "Global Money Transfers",
    desc: "Send money to 150+ countries in minutes with real-time exchange rates and zero surprise fees.",
  },
  {
    icon: "📊",
    title: "Activity Tracking",
    desc: "Get a full picture of your spending, income, and savings with beautiful real-time dashboards.",
  },
  {
    icon: "🔒",
    title: "Secure Storage",
    desc: "Your funds are held in FDIC-insured accounts backed by our 100-year banking heritage.",
  },
  {
    icon: "📱",
    title: "Mobile First",
    desc: "Manage your entire financial life from your phone — deposits, transfers, and statements on the go.",
  },
  {
    icon: "🏦",
    title: "Savings & Investments",
    desc: "Open high-yield savings or investment accounts and let your money grow while you sleep.",
  },
  {
    icon: "🛎️",
    title: "24/7 Support",
    desc: "Real human support whenever you need it — live chat, email, and phone, around the clock.",
  },
];

const stats = [
  { value: "1M+", label: "Customers Worldwide" },
  { value: "150+", label: "Countries Supported" },
  { value: "$50B+", label: "Transferred Safely" },
  { value: "100+", label: "Years in Banking" },
];

const trustBadges = [
  { icon: "🔐", label: "256-bit SSL Encryption" },
  { icon: "🏛️", label: "FDIC Insured" },
  { icon: "✅", label: "PCI DSS Compliant" },
  { icon: "🌍", label: "ISO 27001 Certified" },
  { icon: "🛡️", label: "2FA Protected" },
];

const About = () => {
  const { loading } = useGlobalContext();
  const navigate = useNavigate();

  if (loading) return <Loader />;

  return (
    <div className="about-page">
      <Header />

      {/* Hero Banner */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <span className="about-hero-tag">Trusted Since 1924</span>
          <h1 className="about-hero-title">About Wealth Wise</h1>
          <p className="about-hero-sub">
            The world's most trusted digital banking platform, empowering
            millions to take control of their finances.
          </p>
          <div className="about-hero-actions">
            <button className="about-hero-btn-primary" onClick={() => navigate("/register")}>
              Open an Account
            </button>
            <button className="about-hero-btn-outline" onClick={() => navigate("/login")}>
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="about-stats">
        {stats.map((s, i) => (
          <div className="about-stat-item" key={i}>
            <span className="about-stat-value">{s.value}</span>
            <span className="about-stat-label">{s.label}</span>
          </div>
        ))}
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
          <div className="about-intro-checklist">
            {["Bank-grade security on every transaction", "Zero hidden fees — ever", "Available in 150+ countries", "24/7 live customer support"].map((item, i) => (
              <div className="about-intro-check" key={i}>
                <span className="about-intro-check-icon">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="about-intro-image">
          <img src={transacLogo2} alt="About Wealth Wise" />
        </div>
      </section>

      {/* Feature cards */}
      <div style={{ background: "#f8fafc" }}>
        <Card cards={cardDetails} aos={"fade-up"} />
      </div>

      {/* What We Do — Feature Grid */}
      <section className="about-features">
        <div className="about-features-header">
          <span className="home-feature-eyebrow">What We Do</span>
          <h2 className="about-features-title">Everything You Need in One Place</h2>
          <p className="about-features-sub">
            From global transfers to investment accounts — Wealth Wise gives you every tool to
            manage, grow, and protect your money.
          </p>
        </div>
        <div className="about-features-grid">
          {features.map((f, i) => (
            <div className="about-feature-card" key={i}>
              <div className="about-feature-icon">{f.icon}</div>
              <h3 className="about-feature-card-title">{f.title}</h3>
              <p className="about-feature-card-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Transfer section */}
      <section className="about-transfer">
        <div className="about-transfer-image" data-aos="flip-right">
          <img src={transacLogo3} alt="Fund Transfer" />
        </div>
        <div className="about-transfer-text" data-aos="fade-down-left">
          <span className="home-feature-eyebrow">How It Works</span>
          <h2 className="about-transfer-title">
            The Easiest Way to Transfer Money
          </h2>
          <p className="about-transfer-body">
            Fund transfer is as easy as ABC with Wealth Wise. No paperwork, no delays — just
            secure, instant transfers anywhere in the world.
          </p>
          <div className="about-transfer-steps">
            {[
              { step: "1", text: "Create a free account in minutes" },
              { step: "2", text: "Verify your identity securely" },
              { step: "3", text: "Send money anywhere, instantly" },
            ].map((s) => (
              <div className="about-transfer-step" key={s.step}>
                <div className="about-step-num">{s.step}</div>
                <span>{s.text}</span>
              </div>
            ))}
          </div>
          <button className="about-transfer-btn" onClick={() => navigate("/register")}>
            Get Started — It's Free
          </button>
        </div>
      </section>

      {/* Trust & Security */}
      <section className="about-trust">
        <h2 className="about-trust-title">Your Security Is Our Priority</h2>
        <p className="about-trust-sub">
          Wealth Wise meets the highest global standards for financial security and data protection.
        </p>
        <div className="about-trust-badges">
          {trustBadges.map((b, i) => (
            <div className="about-trust-badge" key={i}>
              <span className="about-trust-badge-icon">{b.icon}</span>
              <span className="about-trust-badge-label">{b.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="about-cta">
        <h2 className="about-cta-title">Make Payments & Withdraw Anytime</h2>
        <p className="about-cta-sub">
          Join over a million customers who trust Wealth Wise with their finances every day.
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
          <span className="home-feature-eyebrow">Our Purpose</span>
          <h2 className="about-mvg-title">Built on Purpose</h2>
          <div className="about-mvg-items">
            <div className="about-mvg-item">
              <div className="about-mvg-dot">🎯</div>
              <div className="about-mvg-item-text">
                <h3>Our Mission</h3>
                <p>To be the best online banking platform in the world, delivering unmatched service and security to every customer.</p>
              </div>
            </div>
            <div className="about-mvg-item">
              <div className="about-mvg-dot">🔭</div>
              <div className="about-mvg-item-text">
                <h3>Our Vision</h3>
                <p>To bring digital banking to the doorstep of everyone, everywhere — regardless of location or background.</p>
              </div>
            </div>
            <div className="about-mvg-item">
              <div className="about-mvg-dot">💡</div>
              <div className="about-mvg-item-text">
                <h3>Our Goal</h3>
                <p>To ensure your money works for you 24/7 — growing, protected, and always available when you need it.</p>
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
