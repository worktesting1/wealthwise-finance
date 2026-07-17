import React, { useEffect, useState } from "react";
import "./styles.css";
import { client } from "../../../../utils/client";
import axios from "axios";
import { useGlobalContext } from "../../../../context/context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DepositDetailsModal = ({ show, onClose, setActiveTab, activeTab }) => {
  const [copied, setCopied] = useState(null);
  const [walletAddress, setWalletAddress] = useState([]);
  const [bankDetails, setBankDetails] = useState([]);
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({});
  const { userDetails, baseUrl, cardFormData, pathHistory } =
    useGlobalContext();
  const { _id, firstName, lastName, email, cardAmount } =
    JSON.parse(sessionStorage.getItem("user")) || userDetails || {};
  const [amount, setAmount] = useState(
    pathHistory.length === 0 ? "" : cardAmount
  );

  const [paymentProof, setPaymentProof] = useState(null);
  const token = JSON.parse(sessionStorage.getItem("userToken"));
  const naviage = useNavigate();

  const handleCard = () => {
    axios
      .post(`${baseUrl}/api/card`, cardFormData, { headers: { token } })
      .then((response) => {
      })
      .catch((error) => {
      });
  };

  async function getAddresses() {
    const addresses = await client.fetch('*[_type == "addresses"]');
    setWalletAddress(addresses);
  }
  async function getBankDetails() {
    const bankD = await client.fetch('*[_type == "bankdetails"]');
    setBankDetails(bankD[0]);
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file
    const validTypes = ["image/jpeg", "image/png", "application/pdf"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      setErrors({
        ...errors,
        paymentProof: "Only JPG, PNG, or PDF files allowed",
      });
      return;
    }

    if (file.size > maxSize) {
      setErrors({ ...errors, paymentProof: "File size exceeds 5MB limit" });
      return;
    }

    setPaymentProof(file);
    setErrors({ ...errors, paymentProof: "" });
  };

  useEffect(() => {
    getAddresses();
    getBankDetails();
  }, []);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!amount || isNaN(amount)) {
      newErrors.amount = "Please enter a valid amount";
    }

    if (!paymentProof) {
      newErrors.paymentProof = "Proof of payment is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const depositData = new FormData();
    depositData.append("amount", amount);
    depositData.append("userId", _id);
    depositData.append("transactionType", activeTab);
    depositData.append("name", `${firstName} ${lastName}`);
    depositData.append("email", email);
    depositData.append("image", paymentProof);
    depositData.append("path", pathHistory.length > 0 && "card");
    setLoader(true);
    axios
      .post(`${baseUrl}/api/deposit`, depositData, { headers: { token } })
      .then((response) => {
        toast.success("Your deposit is successful");
        setLoader(false);
        if (pathHistory.length > 0) {
          handleCard();
        }
        setTimeout(() => {
          naviage("/dashboard/accountHistory");
        }, 2500);
      })
      .catch((error) => {
        setLoader(false);
      });
  };

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setAmount(pathHistory.length > 0 ? cardAmount : value);
    if (errors.amount) setErrors({ ...errors, amount: "" });
  };

  if (!show) return null;

  return (
    <div className="deposit-modal-overlay">
      <div className="deposit-modal">
        <button className="deposit-close-button" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>

        <div className="modal-header">
          <h2>Deposit Funds</h2>
          <div className="tab-switcher">
            <button
              className={`tab-button ${activeTab === "crypto" ? "active" : ""}`}
              onClick={() => setActiveTab("crypto")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 1.75L6.57 6.61l1.43 1.43L12 4.75l4 3.29 1.43-1.43L12 1.75zM12 16.75l-5.43-4.86-1.43 1.43L12 19.25l6.86-5.93-1.43-1.43L12 16.75zM12 10.75l-5.43-4.86-1.43 1.43L12 13.25l6.86-5.93-1.43-1.43L12 10.75z" />
              </svg>
              Crypto
            </button>
            <button
              className={`tab-button ${activeTab === "bank" ? "active" : ""}`}
              onClick={() => setActiveTab("bank")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
              </svg>
              Bank Transfer
            </button>
          </div>
        </div>

        <div className="modal-body">
          {/* Amount Input Field */}
          <div className="form-group">
            <label>
              Deposit Amount ({activeTab === "crypto" ? "USD" : "$"})
            </label>
            <input
              type="text"
              disabled={pathHistory.length > 0 && true}
              value={amount}
              onChange={handleAmountChange}
              placeholder="0.00"
              className={errors.amount ? "error" : ""}
            />
            {errors.amount && (
              <div className="error-message">{errors.amount}</div>
            )}
          </div>

          {activeTab === "crypto" ? (
            <div className="crypto-deposit">
              <div className="info-box">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
                <p>
                  Send only {walletAddress.map((c) => c.name).join(", ")} to
                  this address
                </p>
              </div>

              {walletAddress.map((crypto) => (
                <div key={crypto.network} className="crypto-wallet">
                  <div className="crypto-header">
                    <h3>{crypto.name}</h3>
                  </div>
                  <div className="address-container">
                    <div className="address">{crypto.address}</div>
                    <button
                      className={`copy-button ${
                        copied === crypto.network ? "copied" : ""
                      }`}
                      onClick={() =>
                        copyToClipboard(crypto.address, crypto.network)
                      }
                    >
                      {copied === crypto.network ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <div className="qr-code-placeholder">
                    <div className="qr-code">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size&data=${crypto.address}`}
                        alt=""
                      />
                      <span>QR Code for {crypto.network}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bank-deposit">
              <div className="info-box">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
                <p>Use these details for wire transfers or direct deposits</p>
              </div>

              <div className="bank-details-grid">
                <div className="detail-row">
                  <span>Bank Name:</span>
                  <span>{bankDetails.bankName}</span>
                </div>
                <div className="detail-row">
                  <span>Account Name:</span>
                  <span>{bankDetails.accountName}</span>
                </div>
                <div className="detail-row">
                  <span>Account Number:</span>
                  <span>
                    {bankDetails.accountNumber}
                    <button
                      className={`copy-button small ${
                        copied === "account" ? "copied" : ""
                      }`}
                      onClick={() =>
                        copyToClipboard(bankDetails.accountNumber, "account")
                      }
                    >
                      {copied === "account" ? "Copied!" : "Copy"}
                    </button>
                  </span>
                </div>
                <div className="detail-row">
                  <span>Account Type:</span>
                  <span>
                    {bankDetails.accountType}
                    <button
                      className={`copy-button small ${
                        copied === "accountType" ? "copied" : ""
                      }`}
                      onClick={() =>
                        copyToClipboard(bankDetails.accountType, "accountType")
                      }
                    >
                      {copied === "accountType" ? "Copied!" : "Copy"}
                    </button>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Proof of Payment Upload */}
          <div className="form-group">
            <label>Upload Proof of Payment</label>
            <div
              className={`file-upload ${errors.paymentProof ? "error" : ""}`}
            >
              {paymentProof ? (
                <div className="file-preview">
                  <div className="file-info">
                    <span className="file-name">{paymentProof.name}</span>
                    <span className="file-size">
                      {(paymentProof.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </div>
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => setPaymentProof(null)}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <input
                    type="file"
                    id="paymentProof"
                    onChange={handleFileChange}
                    accept="image/*,.pdf"
                    style={{ display: "none" }}
                  />
                  <label htmlFor="paymentProof" className="upload-prompt">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                    </svg>
                    <span>Click to browse or drag and drop</span>
                    <span className="file-types">
                      JPG, PNG, or PDF (Max 5MB)
                    </span>
                  </label>
                </>
              )}
            </div>
            {errors.paymentProof && (
              <div className="error-message">{errors.paymentProof}</div>
            )}
            <p className="hint-text">
              {activeTab === "crypto"
                ? "Upload screenshot of transaction confirmation"
                : "Upload scanned copy of bank receipt"}
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="submit-button"
            onClick={handleSubmit}
          >
            {loader ? "Processing..." : " Submit Deposit Request"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepositDetailsModal;
