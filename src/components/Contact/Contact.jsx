import React from "react";
import "../Contact/Contact.css";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="contact-info flex">
      <ul className="flex">
        <div className="flex">
          <Link to={"/terms"}>Terms and Conditions</Link>
        </div>
        <div className="flex">
          <Link to={"/privacy"}>Privacy & Policy</Link>
        </div>
        <div className="flex">
          <p>Legal</p>
        </div>
        <div className="flex">
          <p>Notice</p>
        </div>
      </ul>
      <ul className="flex">
        <p> Copyright © Wealth Wise - 2025</p>
      </ul>
    </div>
  );
};

export default Contact;
