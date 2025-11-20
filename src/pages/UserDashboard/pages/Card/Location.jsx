import { useMemo, useState } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import axios from "axios";
// import SelectPaymentMethod from "../../../widget/select-payment-method";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../../../context/context";
import { useLocation, useNavigate } from "react-router-dom";

const cardOptions = [
  { label: "Mastercard", value: "Mastercard" },
  { label: "Visa", value: "Visa" },
];

const Location = () => {
  const [cardType, setCardType] = useState("");
  const [address, setAddress] = useState("");
  const [amount, setamount] = useState("");
  const [country, setcountry] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { baseUrl, formatNumber, setPathHistory, setCardFormData } =
    useGlobalContext();
  const options = useMemo(() => countryList().getData(), []);
  const { firstName, lastName, _id, cardAmount, email } = JSON.parse(
    sessionStorage.getItem("user")
  );
  const token = JSON.parse(sessionStorage.getItem("accessToken"));
  const { pathname } = useLocation();

  function generate16DigitNumber() {
    let number = "";
    for (let i = 0; i < 16; i++) {
      const digit = Math.floor(Math.random() * 10);
      // Prevent leading zero on the first digit
      if (i === 0 && digit === 0) {
        i--; // repeat this iteration
      } else {
        number += digit;
      }
    }
    return number;
  }
  function generateCcvNumber() {
    let number = "";
    for (let i = 0; i < 3; i++) {
      const digit = Math.floor(Math.random() * 10);
      // Prevent leading zero on the first digit
      if (i === 0 && digit === 0) {
        i--; // repeat this iteration
      } else {
        number += digit;
      }
    }
    return number;
  }

  const cardNumber = generate16DigitNumber();
  const name = `${firstName} ${lastName}`;
  const userId = _id;
  const ccv = generateCcvNumber();

  const handleCardCreation = () => {
    if (
      amount !== "" &&
      amount == cardAmount &&
      cardType !== "" &&
      country !== "" &&
      address !== ""
    ) {
      setLoading(true);
      toast.success("Please pay Issuing fee amount to get your card");
      setTimeout(() => {
        setLoading(false);
        navigate("/dashboard/deposit");
        setPathHistory((prev) => [...prev, pathname]);
        setCardFormData({
          cardNumber,
          cardType,
          name,
          userId,
          ccv,
          address,
          country,
          amount,
          email,
        });
      }, 4000);
    } else {
      toast.error("Please fill out all fields");
    }
  };

  return (
    <div className="location_sect">
      <h3 className="location_sect_h3">Put Card Details for Delivery</h3>
      <Select
        placeholder="Mastercard or Visa"
        defaultValue="Select type of Card"
        options={cardOptions}
        onChange={(e) => setCardType(e.label)}
      />
      <p className="location_sect_p">Amount</p>
      <p className="location_sect_p">Amount must be equal to {cardAmount}</p>
      <input
        type="text"
        className="input"
        onChange={(e) => setamount(e.target.value)}
      />
      <div className="location_country">
        <Select
          options={options}
          placeholder="Select Country"
          onChange={(e) => setcountry(e.label)}
        />
      </div>
      <p className="location_sect_p">Address</p>
      <input
        type="text"
        className="input"
        placeholder="Delware, USA"
        onChange={(e) => setAddress(e.target.value)}
      />
      <button className="btn" onClick={handleCardCreation}>
        {loading
          ? "Loading..."
          : `Issuing Fee $${formatNumber(cardAmount)} Refundable`}
      </button>
    </div>
  );
};

export default Location;
