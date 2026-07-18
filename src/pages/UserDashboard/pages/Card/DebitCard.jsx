import { useState } from "react";
import chip from "../../../../assets/images/chip.png";
import visa from "../../../../assets/images/visa.png";
import map from "../../../../assets/images/map.png";
import pattern from "../../../../assets/images/pattern.png";
import master from "../../../../assets/images/master.png";

const DebitCard = ({ name, card_number, ccv, cardType, createdAt }) => {
  const [tapped, setTapped] = useState(false);
  const cardNumberStr = card_number?.toString() || "0000000000000000";
  const seg1 = "4" + cardNumberStr.slice(0, 3);
  const seg2 = cardNumberStr.slice(3, 7);
  const seg3 = cardNumberStr.slice(7, 11);
  const seg4 = cardNumberStr.slice(11, 15);

  const dateObj   = new Date(createdAt);
  const expMonth  = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const expYear   = (dateObj.getFullYear() % 100) + 4;

  // Default to the Visa (first) design when cardType is missing or unrecognised
  const isMastercard = cardType === "Mastercard";
  const gradient = isMastercard
    ? "linear-gradient(135deg, #0f172a 0%, #3b0764 55%, #7c3aed 100%)"
    : "linear-gradient(135deg, #0f172a 0%, #1e3a5f 55%, #1d4ed8 100%)";

  return (
    <div
      className={`bank_card${tapped ? " bank_card_tapped" : ""}`}
      onClick={() => setTapped((t) => !t)}
    >
      <div className="bank_card_inner">
        {/* ── Front ── */}
        <div className="bank_card_front" style={{ backgroundImage: gradient }}>
          <img src={map} alt="" className="bank_card_map" />

          <div className="bank_card_row">
            <img src={chip} alt="chip" />
            {cardType === "Visa" ? (
              <img src={visa} alt="Visa" className="bank_card_logo" />
            ) : (
              <img src={master} alt="Mastercard" className="bank_card_logo" />
            )}
          </div>

          <div className="bank_card_number">
            <span>{seg1}</span>
            <span>{seg2}</span>
            <span>{seg3}</span>
            <span>{seg4}</span>
          </div>

          <div className="bank_card_row bank_card_labels">
            <span>CARD HOLDER</span>
            <span>VALID TILL</span>
          </div>
          <div className="bank_card_row bank_card_name">
            <span>{name}</span>
            <span>{expMonth} / {expYear}</span>
          </div>
        </div>

        {/* ── Back ── */}
        <div className="bank_card_back" style={{ backgroundImage: gradient }}>
          <img src={map} alt="" className="bank_card_map" />
          <div className="bank_card_barcode" />
          <div className="bank_card_cvv">
            <div className="bank_card_cvv_strip">
              <img src={pattern} alt="pattern" />
            </div>
            <span className="bank_card_cvv_code">{ccv}</span>
          </div>
          <div className="bank_card_text">
            <p>
              With our International Debit Card, spend easily and securely
              anywhere, at any time.
            </p>
          </div>
          <div className="bank_card_sig">
            <span>CUSTOMER SIGNATURE</span>
            {cardType === "Visa" && <img src={visa} alt="Visa" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebitCard;
