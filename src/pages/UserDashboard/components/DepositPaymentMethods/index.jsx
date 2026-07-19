import React from "react";
import "./style.css";
import { useGlobalContext } from "../../../../context/context";

const methods = [
  {
    id: "bank-transfer",
    name: "Bank Transfer",
    label: "Wire / SWIFT",
    description:
      "Deposit funds directly via international bank wire or SWIFT transfer.",
    color: "#2563eb",
    bg: "#dbeafe",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    id: "cryptocurrency",
    name: "Cryptocurrency",
    label: "BTC · ETH · USDT",
    description:
      "Deposit using your crypto wallet — fast, borderless, and fee-efficient.",
    color: "#7c3aed",
    bg: "#ede9fe",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M9.5 9H13a2 2 0 0 1 0 4H9.5V9zm0 4h3.5a2 2 0 0 1 0 4H9.5v-4zM9.5 7v2m0 8v2" />
      </svg>
    ),
  },
];

const DepositPaymentMethods = ({ setShowWithdrawalModal }) => {
  const { setSelectedTransferMethod } = useGlobalContext();

  return (
    <div className="dp_methods_grid">
      {methods.map((method) => (
        <button
          key={method.id}
          className="dp_method_card"
          onClick={() => {
            setSelectedTransferMethod(method);
            setShowWithdrawalModal(method.name);
          }}
        >
          <div
            className="dp_method_icon"
            style={{ background: method.bg, color: method.color }}
          >
            {method.icon}
          </div>

          <div className="dp_method_info">
            <span className="dp_method_sublabel">{method.label}</span>
            <h3 className="dp_method_name">{method.name}</h3>
            <p className="dp_method_desc">{method.description}</p>
          </div>

          <div className="dp_method_arrow" style={{ color: method.color }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </button>
      ))}
    </div>
  );
};

export default DepositPaymentMethods;
