import React from "react";
import "../Footer/Footer.css";
import logo from "../../assets/wealthwise.png";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Footer = () => {
  const { handleSubmit, register, reset } = useForm();

  const handleNewsLetter = async (data) => {
    try {
      // newsletter subscription handler
      reset();
    } catch (error) {}
  };

  return (
    <footer className="footer" id="footer">
      <div className="footer-inner">
        {/* Brand */}
        <div className="footer-brand">
          <img src={logo} alt="Wealth Wise" />
          <p className="footer-brand-tagline">
            Wealth Wise is a leading digital banking institution serving over a
            million customers worldwide with secure, fast, and reliable financial
            services.
          </p>
          <div className="footer-socials">
            <a className="footer-social-btn" href="#!" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a className="footer-social-btn" href="#!" aria-label="Twitter">
              <AiOutlineTwitter />
            </a>
            <a className="footer-social-btn" href="#!" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a
              className="footer-social-btn"
              href="https://wa.me/18257894067"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* Services */}
        <div className="footer-col">
          <h4 className="footer-col-title">Services</h4>
          <div className="footer-col-links">
            <p>Transfer Money</p>
            <p>Savings Account</p>
            <p>Receive Money</p>
            <p>Business Loans</p>
            <p>Debit Cards</p>
          </div>
        </div>

        {/* Help */}
        <div className="footer-col">
          <h4 className="footer-col-title">Help Centre</h4>
          <div className="footer-col-links">
            <a href="mailto:wealthwise@cosultant.online">Customer Care</a>
            <Link to="/contact">Contact Us</Link>
            <Link to="/faq">FAQs</Link>
            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>

        {/* Newsletter */}
        <div className="footer-col">
          <h4 className="footer-col-title">Stay Updated</h4>
          <p className="footer-address">
            141 First Floor, 12 St Roots Terrace,<br />
            Los Angeles, United States 90010
          </p>
          <form
            className="footer-newsletter-form"
            onSubmit={handleSubmit(handleNewsLetter)}
          >
            <input
              type="email"
              className="footer-newsletter-input"
              placeholder="Your email address"
              {...register("email")}
            />
            <button type="submit" className="footer-newsletter-btn">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <span className="footer-bottom-copy">
          © {new Date().getFullYear()} Wealth Wise. All rights reserved.
        </span>
        <div className="footer-bottom-links">
          <Link to="/terms">Terms</Link>
          <Link to="/privacy">Privacy</Link>
          <a href="mailto:wealthwise@cosultant.online">Legal</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
