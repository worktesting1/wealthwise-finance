import { useMemo, useState } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../../../context/context";
import { useLocation, useNavigate } from "react-router-dom";

const cardOptions = [
  { label: "Visa", value: "Visa" },
  { label: "Mastercard", value: "Mastercard" },
];

function generate16DigitNumber() {
  let number = "";
  for (let i = 0; i < 16; i++) {
    const digit = Math.floor(Math.random() * 10);
    if (i === 0 && digit === 0) { i--; } else { number += digit; }
  }
  return number;
}

function generateCcv() {
  let number = "";
  for (let i = 0; i < 3; i++) {
    const digit = Math.floor(Math.random() * 10);
    if (i === 0 && digit === 0) { i--; } else { number += digit; }
  }
  return number;
}

const Location = () => {
  const [cardType, setCardType]   = useState("");
  const [address, setAddress]     = useState("");
  const [amount, setAmount]       = useState("");
  const [country, setCountry]     = useState("");
  const [loading, setLoading]     = useState(false);

  const navigate  = useNavigate();
  const { formatNumber, setPathHistory, setCardFormData } = useGlobalContext();
  const options   = useMemo(() => countryList().getData(), []);
  const { firstName, lastName, _id, cardAmount, email } =
    JSON.parse(sessionStorage.getItem("user")) || {};
  const { pathname } = useLocation();

  const cardNumber = generate16DigitNumber();
  const name       = `${firstName} ${lastName}`;
  const ccv        = generateCcv();

  const handleSubmit = () => {
    if (!amount || String(amount) !== String(cardAmount) || !cardType || !country || !address) {
      toast.error("Please fill in all fields correctly.");
      return;
    }
    setLoading(true);
    toast.success("Please pay the issuing fee to receive your card.");
    setTimeout(() => {
      setLoading(false);
      setPathHistory((prev) => [...prev, pathname]);
      setCardFormData({ cardNumber, cardType, name, userId: _id, ccv, address, country, amount, email });
      navigate("/dashboard/deposit");
    }, 3500);
  };

  return (
    <div className="location_form">
      <div className="location_form_header">
        <div className="location_form_icon">📦</div>
        <div>
          <p className="location_form_title">Card Delivery Details</p>
          <p className="location_form_sub">Fill in your delivery information below</p>
        </div>
      </div>

      {/* Fee summary */}
      <div className="fee_summary">
        <div>
          <p className="fee_summary_label">Issuance Fee</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p className="fee_summary_amount">
            ${formatNumber ? formatNumber(cardAmount) : cardAmount}
          </p>
          <p className="fee_summary_note">Refundable</p>
        </div>
      </div>

      {/* Card type */}
      <div className="form_field">
        <label className="form_label">Card Network</label>
        <Select
          placeholder="Select card type"
          options={cardOptions}
          onChange={(e) => setCardType(e.label)}
          styles={{
            control: (base, state) => ({
              ...base,
              background: "#f8fafc",
              border: `1px solid ${state.isFocused ? "#93c5fd" : "#e2e8f0"}`,
              borderRadius: 10,
              minHeight: 46,
              boxShadow: state.isFocused ? "0 0 0 3px rgba(147,197,253,0.2)" : "none",
              fontFamily: "Poppins, sans-serif",
              fontSize: "0.875rem",
            }),
            indicatorSeparator: () => ({ display: "none" }),
          }}
        />
      </div>

      {/* Amount */}
      <div className="form_field">
        <label className="form_label">
          Payment Amount — must equal ${formatNumber ? formatNumber(cardAmount) : cardAmount}
        </label>
        <input
          type="number"
          className="form_input"
          placeholder={`${cardAmount}`}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      {/* Country */}
      <div className="form_field">
        <label className="form_label">Delivery Country</label>
        <Select
          options={options}
          placeholder="Select country"
          onChange={(e) => setCountry(e.label)}
          styles={{
            control: (base, state) => ({
              ...base,
              background: "#f8fafc",
              border: `1px solid ${state.isFocused ? "#93c5fd" : "#e2e8f0"}`,
              borderRadius: 10,
              minHeight: 46,
              boxShadow: state.isFocused ? "0 0 0 3px rgba(147,197,253,0.2)" : "none",
              fontFamily: "Poppins, sans-serif",
              fontSize: "0.875rem",
            }),
            indicatorSeparator: () => ({ display: "none" }),
          }}
        />
      </div>

      {/* Address */}
      <div className="form_field">
        <label className="form_label">Street Address</label>
        <input
          type="text"
          className="form_input"
          placeholder="e.g. 123 Main St, Delaware, USA"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <button
        className="submit_btn"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Processing…" : `Pay Issuance Fee — $${formatNumber ? formatNumber(cardAmount) : cardAmount}`}
      </button>
    </div>
  );
};

export default Location;
