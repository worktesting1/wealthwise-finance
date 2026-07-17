import React, { useState, useEffect } from "react";
import "../Header/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { useGlobalContext } from "../../context/context";
import logo from "../../assets/wealthwise.png";

const Header = () => {
  const { headerNav, setHeaderNav, toggleNave } = useGlobalContext();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [dash, setDash] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      setDash(window.scrollY > 700);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeNav = () => setHeaderNav(false);

  return (
    <header className={`header flex ${scrolled ? "scrolled" : ""}`}>
      <div className="header-logo-container">
        <Link to={"/"} onClick={closeNav}>
          <img src={logo} alt="Wealth Wise" />
        </Link>
      </div>

      <ul className={headerNav ? "open-nav" : ""}>
        <AiOutlineClose
          className="close-icon"
          id="header_nav"
          onClick={toggleNave}
        />
        <li>
          <Link to={"/"} onClick={closeNav}>Home</Link>
        </li>
        <li>
          <Link to={"/about"} onClick={closeNav}>About</Link>
        </li>
        <li>
          <Link to={"/faq"} onClick={closeNav}>FAQs</Link>
        </li>
        <li>
          <Link to={"/contact"} onClick={closeNav}>Contact</Link>
        </li>
        <button
          className="header-login-btn"
          onClick={() => { closeNav(); navigate("/login"); }}
        >
          Login
        </button>
        <button
          className={`header-dashboard-btn ${!dash ? "hidden" : ""}`}
          onClick={() => { closeNav(); navigate("/dashboard"); }}
        >
          Dashboard
        </button>
      </ul>

      <RxHamburgerMenu
        className="hamburger-icon"
        id="header_nav"
        onClick={toggleNave}
      />
    </header>
  );
};

export default Header;
