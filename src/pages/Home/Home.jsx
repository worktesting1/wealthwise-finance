import React from "react";
import { Footer, Header, Loader, Contact } from "../../components";
import { HashLink } from "react-router-hash-link";
import { BsArrowRight } from "react-icons/bs";
import { MdAccountBalance, MdOutlinePayment } from "react-icons/md";
import { TbSend } from "react-icons/tb";
import { RiLuggageDepositLine } from "react-icons/ri";
import { useGlobalContext } from "../../context/context";
import { useNavigate } from "react-router-dom";

import payment from "../../assets/payments.png";
import commercial from "../../assets/commercial.png";
import invest from "../../assets/invest.png";
import loan from "../../assets/loan.png";
import onlineBanking from "../../assets/online-banking.png";
import manage from "../../assets/manage.png";
import transacLogo from "../../assets/3.png";
import transacLogo2 from "../../assets/payment-service-3.png";
import transacLogo3 from "../../assets/online-payment.png";
import briefLogo from "../../assets/scrn-1.png";
import cardLogo1 from "../../assets/feature-icon-1.png";
import cardLogo2 from "../../assets/feature-icon-2.png";
import cardLogo3 from "../../assets/feature-icon-3.png";

import "./Home.css";

const cardDetails = [
  {
    title: "Fully Secure Payment",
    para: "Every transaction is protected with bank-grade encryption.",
    image: cardLogo1,
    id: "1",
  },
  {
    title: "No Hidden Charges",
    para: "Fund transfers are completely free of hidden fees.",
    image: cardLogo2,
    id: "2",
  },
  {
    title: "Instant Cashout",
    para: "Withdraw funds at our branches and ATMs instantly, nationwide.",
    image: cardLogo3,
    id: "3",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const { loading } = useGlobalContext();

  if (loading) return <Loader />;

  return (
    <div className="home">
      <Header />

      {/* ── HERO ── */}
      <section className="home-hero">
        <div className="home-hero-content">
          <span className="home-hero-eyebrow">Trusted by 1M+ customers</span>
          <h1 className="home-hero-title">
            Banking That <span>Works</span> For You
          </h1>
          <p className="home-hero-sub">
            Send money across the globe in minutes, manage your wealth in one
            place, and experience the security of a modern digital bank.
          </p>
          <div className="home-hero-actions">
            <button className="btn-primary" onClick={() => navigate("/register")}>
              Open an Account
            </button>
            <button className="btn-outline-white" onClick={() => navigate("/login")}>
              Sign In
            </button>
          </div>
        </div>
        <div className="home-hero-visual">
          <img src={transacLogo} alt="Online Banking" />
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="home-stats">
        <div className="home-stat-item">
          <div className="home-stat-number">1M+</div>
          <div className="home-stat-label">Happy Customers</div>
        </div>
        <div className="home-stat-item">
          <div className="home-stat-number">$1.7T</div>
          <div className="home-stat-label">Assets Under Management</div>
        </div>
        <div className="home-stat-item">
          <div className="home-stat-number">190+</div>
          <div className="home-stat-label">Countries Supported</div>
        </div>
        <div className="home-stat-item">
          <div className="home-stat-number">100yr</div>
          <div className="home-stat-label">Banking Experience</div>
        </div>
      </div>

      {/* ── FEATURE ROW 1 ── */}
      <section className="home-feature-row" data-aos="fade-up">
        <div className="home-feature-image">
          <img src={transacLogo} alt="Payment Service" />
        </div>
        <div className="home-feature-text">
          <span className="home-feature-eyebrow">On Time, Every Time</span>
          <h2 className="home-feature-title">
            World-Class Online Payment Service
          </h2>
          <p className="home-feature-body">
            Our local and international money transfer is the fastest you can
            find. Transfer funds across countries in minutes — instantly and
            securely.
          </p>
          <p className="home-feature-body">
            With over a million customers, we have stood the test of time.
          </p>
          <button className="btn-primary" onClick={() => navigate("/login")}>
            Transfer Funds
          </button>
        </div>
      </section>

      {/* ── FEATURE ROW 2 ── */}
      <section className="home-feature-row reverse" data-aos="fade-up">
        <div className="home-feature-image">
          <img src={transacLogo2} alt="Why We Stand Out" />
        </div>
        <div className="home-feature-text">
          <span className="home-feature-eyebrow">Do More Your Way</span>
          <h2 className="home-feature-title">Why We Stand Out</h2>
          <p className="home-feature-body">
            With years of investment experience and $1.7 trillion in assets
            under management, access world-class investment expertise to help
            meet your important financial goals.
          </p>
          <p className="home-feature-body">
            Experience the very best of internet banking provided by any
            financial institution.
          </p>
          <HashLink smooth to={"#footer"} className="btn-primary" style={{ display: "inline-block" }}>
            Find a Location
          </HashLink>
        </div>
      </section>

      {/* ── FEATURE ROW 3 ── */}
      <section className="home-feature-row" data-aos="fade-up">
        <div className="home-feature-image">
          <img src={transacLogo3} alt="Online Payment" />
        </div>
        <div className="home-feature-text">
          <span className="home-feature-eyebrow">Online Payment</span>
          <h2 className="home-feature-title">
            Make Payments on Almost Any Site
          </h2>
          <p className="home-feature-body">
            Take advantage of premium banking privileges, relationship benefits,
            and access to investment expertise tailored to your needs. Insights
            to empower confident financial decisions.
          </p>
          <button className="btn-primary" onClick={() => navigate("/login")}>
            Make a Payment
          </button>
        </div>
      </section>

      {/* ── APP PREVIEW ── */}
      <section className="home-app-preview">
        <h2 className="home-section-title">Everything in One Place</h2>
        <p className="home-section-sub">
          Convenient account options for businesses of all sizes. Offer your
          customers a variety of secure and convenient payment options.
        </p>
        <img src={briefLogo} alt="App Preview" className="home-app-preview-img" />
      </section>

      {/* ── CORPORATE BANKING ── */}
      <section className="home-corporate">
        <div className="home-corporate-inner">
          <div className="home-corporate-left">
            <img src={payment} alt="Corporate Banking" />
          </div>
          <div className="home-corporate-right">
            <h2 className="home-section-title dark" style={{ textAlign: "left" }}>
              Banking for Corporates
            </h2>
            <p className="home-section-sub dark" style={{ textAlign: "left", margin: "0 0 32px" }}>
              High-end banking solutions for large enterprises and growing businesses.
            </p>
            <div className="home-corporate-grid">
              <HashLink smooth to={"#commercial"} className="home-corporate-item">
                <img src={commercial} alt="" />
                <p>Commercial C/A</p>
                <BsArrowRight />
              </HashLink>
              <HashLink smooth to={"#commercial"} className="home-corporate-item">
                <img src={onlineBanking} alt="" />
                <p>Website &amp; Web App</p>
                <BsArrowRight />
              </HashLink>
              <HashLink smooth to={"#commercial"} className="home-corporate-item">
                <img src={loan} alt="" />
                <p>Business Loan</p>
                <BsArrowRight />
              </HashLink>
              <HashLink smooth to={"#commercial"} className="home-corporate-item">
                <img src={invest} alt="" />
                <p>Debit Cards</p>
                <BsArrowRight />
              </HashLink>
              <HashLink smooth to={"#commercial"} className="home-corporate-item" style={{ gridColumn: "span 2" }}>
                <img src={manage} alt="" />
                <p>Cash Management</p>
                <BsArrowRight />
              </HashLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="home-services" id="commercial">
        <p className="home-section-label">Our Services</p>
        <h2 className="home-section-title">Get Your Wealth Wise Account</h2>
        <p className="home-section-sub">
          Everything your business or personal finances need, in one place.
        </p>
        <div className="home-services-grid">
          <div className="home-service-card" data-aos="fade-up">
            <div className="home-service-icon"><MdAccountBalance /></div>
            <div className="home-service-info">
              <h3>Commercial C/A</h3>
              <p>
                A wide range of banking products designed to help you achieve
                your goals — from checking and savings accounts to business
                loans and lines of credit.
              </p>
            </div>
          </div>
          <div className="home-service-card" data-aos="fade-up">
            <div className="home-service-icon"><TbSend /></div>
            <div className="home-service-info">
              <h3>Online Banking</h3>
              <p>
                Manage your finances anytime, anywhere. View account balances,
                transfer funds, pay bills, and more from the comfort of your
                home or office.
              </p>
            </div>
          </div>
          <div className="home-service-card" data-aos="fade-up">
            <div className="home-service-icon"><RiLuggageDepositLine /></div>
            <div className="home-service-info">
              <h3>Debit Cards</h3>
              <p>
                Secure debit cards linked to your account for everyday spending
                — shop in-store or online, withdraw cash, and manage
                transactions in real-time.
              </p>
            </div>
          </div>
          <div className="home-service-card" data-aos="fade-up">
            <div className="home-service-icon"><MdOutlinePayment /></div>
            <div className="home-service-info">
              <h3>Business Loan</h3>
              <p>
                Personal loans, business loans, and mortgages designed to help
                you achieve your financial goals — whatever they may be.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SPECIALITY ── */}
      <section className="home-speciality">
        <p className="home-section-label" style={{ color: "#2563eb" }}>Our Speciality</p>
        <h2 className="home-section-title dark">We Bring Everything in One Place</h2>
        <p className="home-section-sub dark">
          Earn 5,000 bonus points as a Wealth Wise customer. Terms and conditions apply.
        </p>
        <div className="spec-grid" data-aos="fade-right">
          {cardDetails.map((card) => (
            <div className="spec-card" key={card.id}>
              <div className="spec-card-icon">
                <img src={card.image} alt={card.title} />
              </div>
              <h3 className="spec-card-title">{card.title}</h3>
              <p className="spec-card-body">{card.para}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="home-testimonials">
        <p className="home-section-label" style={{ color: "#2563eb" }}>Clients' Opinion</p>
        <h2 className="home-section-title dark">What Our Users Say</h2>
        <p className="home-section-sub dark">Over a million customers cannot be wrong.</p>
        <div className="home-testimonials-grid">
          <div className="testimonial-card" data-aos="fade-right">
            <p className="testimonial-quote">
              I am very glad I made the right choice banking with Wealth Wise. The experience has been seamless from day one.
            </p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">H</div>
              <div>
                <p className="testimonial-name">Harrison</p>
                <p className="testimonial-role">Entrepreneur</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card" data-aos="fade-left">
            <p className="testimonial-quote">
              Transactions are fast and easy. Banking with Wealth Wise has completely transformed how I manage my money.
            </p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">B</div>
              <div>
                <p className="testimonial-name">Betty</p>
                <p className="testimonial-role">Entrepreneur</p>
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

export default Home;
