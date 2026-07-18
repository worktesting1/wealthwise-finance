import { useState } from "react";
import chip from "../../../../assets/images/chip.png";
import visa from "../../../../assets/images/visa.png";
import master from "../../../../assets/images/master.png";
import pattern from "../../../../assets/images/pattern.png";

const NfcIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M9 12c0-1.66 1.34-3 3-3" stroke="rgba(255,255,255,0.8)" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M6.5 12c0-3.03 2.47-5.5 5.5-5.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M4 12c0-4.42 3.58-8 8-8" stroke="rgba(255,255,255,0.25)" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="12" r="1.2" fill="white" />
  </svg>
);

const DebitCard = ({ name, card_number, ccv, cardType, createdAt }) => {
  const [tapped, setTapped] = useState(false);

  const cardNumberStr = card_number?.toString() || "0000000000000000";
  const seg1 = cardNumberStr.slice(0, 4);
  const seg2 = cardNumberStr.slice(4, 8);
  const seg3 = cardNumberStr.slice(8, 12);
  const seg4 = cardNumberStr.slice(12, 16);

  const dateObj  = new Date(createdAt);
  const expMonth = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const expYear  = (dateObj.getFullYear() % 100) + 4;

  // Default to Visa design when cardType is missing / unrecognised
  const isMastercard = cardType === "Mastercard";
  const logo = isMastercard ? master : visa;

  const gradient = isMastercard
    ? "linear-gradient(145deg, #0d0d0d 0%, #1c0800 55%, #2e1100 100%)"
    : "linear-gradient(145deg, #0d0d0d 0%, #060d20 55%, #0b1a3e 100%)";

  const glowColor = isMastercard
    ? "radial-gradient(circle at 80% 20%, rgba(234,88,12,0.6) 0%, transparent 58%)"
    : "radial-gradient(circle at 80% 20%, rgba(37,99,235,0.6) 0%, transparent 58%)";

  return (
    <div
      className={`bank_card${tapped ? " bank_card_tapped" : ""}`}
      onClick={() => setTapped((t) => !t)}
    >
      <div className="bank_card_inner">

        {/* ── Front ── */}
        <div className="bank_card_front" style={{ background: gradient }}>
          <div className="bank_card_glow" style={{ background: glowColor }} />

          <div className="bank_card_top">
            <span className="bank_card_brand">WealthWise</span>
            <span className="bank_card_nfc"><NfcIcon /></span>
          </div>

          <img src={chip} alt="" className="bank_card_chip" />

          <div className="bank_card_number">
            <span>{seg1}</span>
            <span>{seg2}</span>
            <span>{seg3}</span>
            <span>{seg4}</span>
          </div>

          <div className="bank_card_bottom">
            <div className="bank_card_field">
              <span className="bank_card_field_label">Card Holder</span>
              <span className="bank_card_field_value">{name}</span>
            </div>
            <div className="bank_card_field">
              <span className="bank_card_field_label">Expires</span>
              <span className="bank_card_field_value">{expMonth} / {expYear}</span>
            </div>
            <img src={logo} alt={cardType} className="bank_card_logo" />
          </div>
        </div>

        {/* ── Back ── */}
        <div className="bank_card_back" style={{ background: gradient }}>
          <div className="bank_card_glow" style={{ background: glowColor }} />
          <div className="bank_card_stripe" />
          <div className="bank_card_sig_area">
            <div className="bank_card_sig_strip">
              <img src={pattern} alt="" />
            </div>
            <div className="bank_card_cvv_box">
              <span className="bank_card_field_label">CVV</span>
              <span className="bank_card_cvv_code">{ccv}</span>
            </div>
          </div>
          <div className="bank_card_back_footer">
            <p className="bank_card_back_text">
              Property of WealthWise. If found, please return to the nearest branch.
            </p>
            <img src={logo} alt={cardType} className="bank_card_logo_sm" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default DebitCard;
