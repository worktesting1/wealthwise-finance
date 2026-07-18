import chip from "../../../../assets/images/chip.png";
import visa from "../../../../assets/images/visa.png";
import map from "../../../../assets/images/map.png";
import pattern from "../../../../assets/images/pattern.png";
import master from "../../../../assets/images/master.png";

const DebitCard = ({ name, card_number, ccv, cardType, createdAt }) => {
  const cardNumbersToString = card_number?.toString() || "0000000000000000";
  const firstNumbers  = "4" + cardNumbersToString.slice(0, 3);
  const secondNumbers = cardNumbersToString.slice(3, 7);
  const thirdNumbers  = cardNumbersToString.slice(7, 11);
  const fourthNumbers = cardNumbersToString.slice(11, 15);

  const dateObj   = new Date(createdAt);
  const expiryYear = (dateObj.getFullYear() % 100) + 4;
  const month      = dateObj.getMonth() + 1;

  /* gradient: Visa = navy→blue, Mastercard = navy→deep-red */
  const gradient =
    cardType === "Visa"
      ? "linear-gradient(135deg, #0f172a 0%, #1e3a5f 55%, #1d4ed8 100%)"
      : "linear-gradient(135deg, #0f172a 0%, #3b0764 55%, #7c3aed 100%)";

  return (
    <div className="card">
      <div className="card_inner">
        {/* ── Front ── */}
        <div className="card_front" style={{ backgroundImage: gradient }}>
          <img src={map} alt="" className="map_image" />
          <div className="row">
            <img src={chip} alt="chip" />
            {cardType === "Visa" ? (
              <img src={visa} alt="Visa" className="visa" />
            ) : (
              <img src={master} alt="Mastercard" className="visa" />
            )}
          </div>
          <div className="row card_number_wrappepr">
            <p>{firstNumbers}</p>
            <p>{secondNumbers}</p>
            <p>{thirdNumbers}</p>
            <p>{fourthNumbers}</p>
          </div>
          <div className="row card_details_sect">
            <p>CARD HOLDER</p>
            <p>VALID TILL</p>
          </div>
          <div className="row card_name_sect">
            <p>{name}</p>
            <p>{month.toString().padStart(2, "0")} / {expiryYear}</p>
          </div>
        </div>

        {/* ── Back ── */}
        <div className="card_back" style={{ backgroundImage: gradient }}>
          <img src={map} alt="" className="map_image" />
          <div className="bar_code" />
          <div className="row card_cvv">
            <div>
              <img src={pattern} alt="pattern" />
            </div>
            <p>{ccv}</p>
          </div>
          <div className="row card_text">
            <p>
              With our International Debit Card, spend easily and securely
              anywhere, at any time.
            </p>
          </div>
          <div className="row signature">
            <p>CUSTOMER SIGNATURE</p>
            {cardType === "Visa" && <img src={visa} alt="Visa" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebitCard;
