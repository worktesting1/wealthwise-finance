import React, { useState } from "react";
import "./style.css";
import { useGlobalContext } from "../../../../context/context";

const primaryPaymentMethodss = [
  {
    id: "wire-transfer",
    name: "Bank Transfer",
    description: "Deposit funds directly to our international bank accounts.",
    icon: "https://www.svgrepo.com/download/1155/wire-transfer-logo.svg",
    iconSize: "h-5 w-5",
    bgColor: "bg-blue-100",
  },
  {
    id: "cryptocurrency",
    name: "Cryptocurrency",
    description: "Deposit funds through our cryptocurrency wallet.",
    icon: "https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/btc.svg",
    iconSize: "h-10 w-10",
    bgColor: "bg-purple-100",
  },
];

const DepositPaymentMethods = ({ setShowWithdrawalModal }) => {
  const { setSelectedTransferMethod } = useGlobalContext();

  const changeMethod = (method) => {
    setShowWithdrawalModal(method);
  };

  return (
    <div className="payment-methods-container">
      {/* Primary Payment Methods Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {primaryPaymentMethodss.map((method) => (
          <div
            key={method.id}
            onClick={() => {
              setSelectedTransferMethod(method);

              changeMethod(method.name);
            }}
            className={`cursor-pointer bg-white rounded-xl border border-gray-200 p-4 hover:border-primary-500 hover:shadow-md transition-all
             `}
          >
            <div className="flex items-center mb-3">
              <div
                className={`h-10 w-10 rounded-full ${method.bgColor} flex items-center justify-center`}
              >
                {method.icon ? (
                  <img
                    src={method.icon}
                    alt={method.name}
                    className={method.iconSize}
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-amber-600"
                  >
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg>
                )}
              </div>
              <h3 className="ml-3 font-medium text-gray-900">{method.name}</h3>
            </div>
            <p className="text-sm text-gray-500">{method.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepositPaymentMethods;
