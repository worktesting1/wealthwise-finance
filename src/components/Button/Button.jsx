import React from "react";
import "../Button/Button.css";

const Button = ({ title, icon }) => {
  return (
    <button className="btn flex">
      {title} {icon}
    </button>
  );
};

export default Button;
