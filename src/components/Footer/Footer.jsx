import React from "react";
import "../Footer/Footer.css";
import logo from "../../assets/wealthwise.png";

import { FaFacebookF, FaLinkedinIn, FaPinterestP } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Footer = () => {
  const { handleSubmit, register } = useForm();

  const handleNewsLetter = async (data) => {
    try {
    } catch (error) {}
  };
  return (
    <>
      <footer className="footer flex" id="footer">
        <div className="footer-item-one">
          <img src={logo} alt="" />
          <p>
            Wealth Wise is a leading bank in the worldzone and a prominent
            international banking institution
          </p>
          <div className="footer-icons-con flex">
            <div className="flex">
              <FaFacebookF />
            </div>
            <div className="flex">
              <AiOutlineTwitter />
            </div>
            <div className="flex">
              <FaLinkedinIn />
            </div>
            <div className="flex">
              <FaPinterestP />
            </div>
          </div>
        </div>
        <div className="footer-item-two">
          <h3>Services</h3>
          <p>Transfer Money</p>
          <p>Savings Account</p>
          <p>Received Money</p>
        </div>
        <div className="footer-item-two">
          <h3>Help Center</h3>
          <a href="mailto:wealthwise@cosultant.online">Customer Care</a>
          <Link style={{ color: "white" }} to={"/contact"}>
            Contact Us
          </Link>
          <p>wealthwise@cosultant.online</p>
        </div>
        <div className="footer-item-two">
          <h3>Subscribe & Address</h3>
          <p>
            141, First Floor, 12 St Roots Terrace, Los Angeles United States
            90010.
          </p>
          <form
            className="footer-newletter-form"
            onSubmit={handleSubmit((data) => handleNewsLetter(data))}
          >
            <input
              type="email"
              placeholder="Your Email"
              {...register("email")}
            />
            <Button title="Subscribe" />
          </form>
        </div>
      </footer>
    </>
  );
};

export default Footer;
