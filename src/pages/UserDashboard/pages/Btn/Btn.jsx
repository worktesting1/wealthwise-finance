import React from "react";
import "./Btn.css";

const Btn = ({
  title,
  color,
  width,
  height,
  background,
  fontSize,
  border,
  fontWeight,
  action,
  icon,
  id,
}) => {
  return (
    <button
      id={id}
      onClick={(e) => {
        action(e);
      }}
      className="button"
      style={{ color, width, height, background, fontSize, border, fontWeight }}
    >
      {icon}
      {title}
    </button>
  );
};

export default Btn;
