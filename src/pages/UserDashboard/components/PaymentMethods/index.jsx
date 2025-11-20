import React, { useState } from "react";
import "./style.css";
import { useGlobalContext } from "../../../../context/context";
import { useLocation } from "react-router-dom";

const primaryPaymentMethods = [
  {
    id: "wire-transfer",
    name: "Wire Transfer",
    description: "Transfer funds directly to international bank accounts.",
    icon: "https://www.svgrepo.com/download/1155/wire-transfer-logo.svg",
    iconSize: "h-5 w-5",
    bgColor: "bg-blue-100",
  },
  {
    id: "cryptocurrency",
    name: "Cryptocurrency",
    description: "Send funds to your cryptocurrency wallet.",
    icon: "https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/btc.svg",
    iconSize: "h-10 w-10",
    bgColor: "bg-purple-100",
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "Transfer funds to your PayPal account.",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/paypal.svg",
    iconSize: "h-6 w-6",
    bgColor: "bg-indigo-100",
  },
  {
    id: "wise-transfer",
    name: "Wise Transfer",
    description: "Transfer with lower fees using Wise.",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/wise.svg",
    iconSize: "h-5 w-5",
    bgColor: "bg-green-100",
  },
  {
    id: "cash-app",
    name: "Cash App",
    description: "Quick transfers to your Cash App account.",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/cashapp.svg",
    iconSize: "h-5 w-5",
    bgColor: "bg-pink-100",
  },
  // {
  //   id: "more-options",
  //   name: "More Options",
  //   description: "Zelle, Venmo, Revolut, and more.",
  //   icon: null,
  //   bgColor: "bg-amber-100",
  // },
];
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

const additionalPaymentMethods = [
  {
    id: "skrill",
    name: "Skrill",
    description: "Transfer funds to your Skrill account.",
    icon: "https://www.svgrepo.com/download/508724/skrill.svg",
    iconSize: "h-5 w-5",
    bgColor: "bg-indigo-100",
  },
  {
    id: "venmo",
    name: "Venmo",
    description: "Send funds to your Venmo account.",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/venmo.svg",
    iconSize: "h-5 w-5",
    bgColor: "bg-blue-100",
  },
  {
    id: "zelle",
    name: "Zelle",
    description: "Quick transfers to your Zelle account.",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/zelle.svg",
    iconSize: "h-5 w-5",
    bgColor: "bg-purple-100",
  },
  {
    id: "revolut",
    name: "Revolut",
    description: "Transfer to your Revolut account with low fees.",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/revolut.svg",
    iconSize: "h-5 w-5",
    bgColor: "bg-cyan-100",
  },
  {
    id: "alipay",
    name: "Alipay",
    description: "Send funds to your Alipay account.",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/alipay.svg",
    iconSize: "h-5 w-5",
    bgColor: "bg-blue-100",
  },
  {
    id: "wechat-pay",
    name: "WeChat Pay",
    description: "Transfer to your WeChat Pay wallet.",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/wechat.svg",
    iconSize: "h-5 w-5",
    bgColor: "bg-green-100",
  },
];
const PaymentMethods = ({ setShowWithdrawalModal }) => {
  const [withdrawMethod, setWithdrawMethod] = useState("");
  const [showMoreMethods, setShowMoreMethods] = useState(false);
  const { setSelectedTransferMethod } = useGlobalContext();
  const { pathname } = useLocation();

  const changeMethod = (method) => {
    setWithdrawMethod(method);
    setShowWithdrawalModal(true);
  };

  return (
    <div className="payment-methods-container">
      {/* Primary Payment Methods Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(pathname === "/dashboard/deposit"
          ? primaryPaymentMethodss
          : primaryPaymentMethods
        ).map((method) => (
          <div
            key={method.id}
            onClick={() => {
              setSelectedTransferMethod(method);
              return method.id === "more-options"
                ? setShowMoreMethods(true)
                : changeMethod(method.name);
            }}
            className={`cursor-pointer bg-white rounded-xl border border-gray-200 p-4 hover:border-primary-500 hover:shadow-md transition-all ${
              withdrawMethod === method.name
                ? "border-primary-500 shadow-md"
                : ""
            }`}
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

      {/* Additional Payment Methods Modal */}
      {/* {showMoreMethods && (
        <div
          style={{ marginTop: 20 }}
          className="flex items-center justify-center"
        >
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center mb-6">
              <button
                onClick={() => setShowMoreMethods(false)}
                className="mr-3 bg-white rounded-full p-2 text-gray-500 border border-gray-200 hover:bg-gray-50 transition-colors"
              >
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
                  className="h-5 w-5"
                >
                  <path d="m12 19-7-7 7-7"></path>
                  <path d="M19 12H5"></path>
                </svg>
              </button>
              <h4 className="text-xl font-bold text-gray-900">
                Additional Transfer Methods
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {additionalPaymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => {
                    setSelectedTransferMethod(method);
                    changeMethod(method.name);
                    setShowMoreMethods(false);
                  }}
                  className={`cursor-pointer bg-white rounded-xl border border-gray-200 p-4 hover:border-primary-500 hover:shadow-md transition-all ${
                    withdrawMethod === method.name
                      ? "border-primary-500 shadow-md"
                      : ""
                  }`}
                >
                  <div className="flex items-center mb-3">
                    <div
                      className={`h-10 w-10 rounded-full ${method.bgColor} flex items-center justify-center`}
                    >
                      <img
                        src={method.icon}
                        alt={method.name}
                        className={method.iconSize}
                      />
                    </div>
                    <h3 className="ml-3 font-medium text-gray-900">
                      {method.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default PaymentMethods;
