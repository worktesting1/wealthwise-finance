import React from "react";
import "../Header/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { useGlobalContext } from "../../context/context";
import logo from "../../assets/wealthwise.png";
import { useState } from "react";
import { useEffect } from "react";

const Header = () => {
  const { headerNav, setHeaderNav, toggleNave } = useGlobalContext();
  const navigate = useNavigate();
  const [dash, setDash] = useState(false);

  const listenScrollEvent = () => {
    if (window.scrollY < 700) {
      return setDash(false);
    } else if (window.scrollY > 700) {
      return setDash(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);

  return (
    <header className="header flex">
      <div className="header-logo-container">
        <Link to={"/"}>
          <img src={logo} alt="" />
        </Link>
      </div>
      <ul
        className={`flex ${
          headerNav === true ? "open-nav" : dash === false ? "relative" : ""
        }`}
      >
        <AiOutlineClose
          id="header_nav"
          onClick={toggleNave}
          style={{ fontSize: "30px", color: "white" }}
        />
        <Link
          onClick={() => {
            setHeaderNav(false);
          }}
          to={"/"}
        >
          Home
        </Link>
        <Link
          onClick={() => {
            setHeaderNav(false);
          }}
          to={"/about"}
        >
          About
        </Link>
        <Link
          onClick={() => {
            setHeaderNav(false);
          }}
          to={"/faq"}
        >
          FAQs
        </Link>
        <Link
          onClick={() => {
            setHeaderNav(false);
          }}
          to={"/contact"}
        >
          Contact
        </Link>
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="purple-btn"
        >
          Login
        </button>
        <button
          onClick={() => {
            navigate("/dashboard");
          }}
          className={`purple-btn ${dash === false ? "dash_btn" : ""}`}
        >
          Dashboard
        </button>
      </ul>
      <RxHamburgerMenu
        id="header_nav"
        style={{ fontSize: "30px" }}
        onClick={toggleNave}
      />
    </header>
  );
};

export default Header;
