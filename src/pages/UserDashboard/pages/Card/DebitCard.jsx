import chip from "../../../../assets/images/chip.png";
import visa from "../../../../assets/images/visa.png";
import map from "../../../../assets/images/map.png";
import pattern from "../../../../assets/images/pattern.png";
import master from "../../../../assets/images/master.png";

const DebitCard = ({ name, card_number, ccv, cardType, createdAt, margin }) => {
  const cardNumbersToString = card_number.toString();
  const firstNumbers = 4 + cardNumbersToString.slice(0, 3);
  const secondsNumbers = cardNumbersToString.slice(3, 7);
  const thirdNumbers = cardNumbersToString.slice(7, 11);
  const fourthNumbers = cardNumbersToString.slice(11, 15);

  const dateObj = new Date(createdAt);
  const year = dateObj.getFullYear().toString();
  const expiryYear = year.slice(2, 4);
  const month = dateObj.getMonth() + 1; // getMonth() returns 0–11

  return (
    <div style={{ marginTop: margin }} className="card">
      <div className="card_inner">
        <div
          style={{
            backgroundImage: `linear-gradient(45deg, #0045c7,${
              cardNumbersToString[0] % 2 === 1 ? "black" : "#ff2c7d"
            })`,
          }}
          className="card_front"
        >
          <img src={map} alt="map" className="map_image" />
          <div className="row">
            <img src={chip} alt="chip" />
            {cardType === "Visa" ? (
              <img src={visa} alt="visa" className="visa" />
            ) : (
              <img src={master} alt="visa" className="visa" />
            )}
          </div>
          <div className="row card_number_wrappepr">
            <p>{firstNumbers}</p>
            <p>{secondsNumbers}</p>
            <p>{thirdNumbers}</p>
            <p>{fourthNumbers}</p>
          </div>
          <div className="row card_details_sect">
            <p>CARD HOLDER</p>
            <p>VALID TILL</p>
          </div>
          <div className="row card_name_sect">
            <p>{name}</p>
            <p>
              {createdAt ? month : 9} /{" "}
              {createdAt ? Number(expiryYear) + 4 : 25}
            </p>
          </div>
        </div>
        <div
          style={{
            backgroundImage: `linear-gradient(45deg, #0045c7,${
              cardNumbersToString[0] % 2 === 1 ? "black" : "#ff2c7d"
            })`,
          }}
          className="card_back"
        >
          <img src={map} alt="map" className="map_image" />
          <div className="bar_code"></div>
          <div className="row card_cvv">
            <div>
              <img src={pattern} alt="pattern" />
            </div>
            <p>{ccv}</p>
          </div>
          <div className="row card_text">
            <p>
              With our International Debit Card, Spend easily and securely
              anywhere, at any time.
            </p>
          </div>

          <div className="row signature">
            <p>CUSTOMER SIGNATURE</p>
            {cardType === "Visa" ? <img src={visa} alt="" /> : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebitCard;
