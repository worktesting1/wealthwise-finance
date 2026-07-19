import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export const WhatsApp = () => {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href="https://wa.me/18257894067"
      className="whatsapp_wrapper"
      aria-label="Chat with us on WhatsApp"
    >
      <FaWhatsapp />
    </a>
  );
};
