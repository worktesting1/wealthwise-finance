import React from "react";
import "./style.css";
import { useGlobalContext } from "../../../../context/context";

const methods = [
  {
    id: "wire-transfer",
    name: "Wire Transfer",
    label: "SWIFT · IBAN",
    description:
      "Send funds directly to any international bank account via SWIFT or wire.",
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
      "Withdraw to your crypto wallet — fast, borderless, and fee-efficient.",
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
  {
    id: "paypal",
    name: "PayPal",
    label: "Instant · Secure",
    description:
      "Transfer funds directly to your PayPal account with instant processing.",
    color: "#003087",
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
        <path d="M7 11c0-3.87 3.13-7 7-7h1a5 5 0 0 1 0 10h-1" />
        <path d="M5 20c0-3.87 3.13-7 7-7h1a5 5 0 0 1 0 10H5" />
      </svg>
    ),
  },
  {
    id: "wise-transfer",
    name: "Wise Transfer",
    label: "Low Fees · Multi-Currency",
    description:
      "Send money abroad at the real exchange rate with minimal conversion fees.",
    color: "#059669",
    bg: "#d1fae5",
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
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },
  {
    id: "cash-app",
    name: "Cash App",
    label: "Quick · USA",
    description:
      "Instantly send funds to any Cash App account — no delays, no hassle.",
    color: "#16a34a",
    bg: "#dcfce7",
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
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];

const TransferPaymentMethods = ({ setShowWithdrawalModal }) => {
  const { setSelectedTransferMethod } = useGlobalContext();

  return (
    <div className="tr_methods_grid">
      {methods.map((method) => (
        <button
          key={method.id}
          className="tr_method_card"
          onClick={() => {
            setSelectedTransferMethod(method);
            setShowWithdrawalModal(true);
          }}
        >
          <div
            className="tr_method_icon"
            style={{ background: method.bg, color: method.color }}
          >
            {method.icon}
          </div>

          <div className="tr_method_info">
            <span className="tr_method_sublabel">{method.label}</span>
            <h3 className="tr_method_name">{method.name}</h3>
            <p className="tr_method_desc">{method.description}</p>
          </div>

          <div className="tr_method_arrow" style={{ color: method.color }}>
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

export default TransferPaymentMethods;
