import React, { useState } from "react";
import "./styles.css";
import { useGlobalContext } from "../../../../context/context";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getKYCBadgeConfig } from "../../../../utils/kycBadge";

const DesktopHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { totalAmount, formatNumber, userDetails, isKYC } = useGlobalContext();
  const navigate = useNavigate();
  const { accountNum, firstName, profileImage, lastName } =
    JSON.parse(sessionStorage.getItem("user")) || userDetails || {};

  const totalBalance =
    JSON.parse(sessionStorage.getItem("totalBalance")) || totalAmount;

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <header className="desktop-header">
      <div className="header-container">
        {/* Mobile: Logo + Menu button */}
        <div className="mobile-logo-container">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="mobile-menu-button"
            aria-label="Toggle menu"
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
              className="menu-icon"
            >
              <path d="M4 12h16"></path>
              <path d="M4 18h16"></path>
              <path d="M4 6h16"></path>
            </svg>
          </button>
          <a href="/" className="mobile-logo-link">
            <img
              src={
                profileImage?.length === 1
                  ? profileImage[0]?.url
                  : "https://fwiseb.online/storage/app/public/photos/3N7b4OlUEd4Vsl8Wfe3npP81eOp11bQoLLIYtB8y.png"
              }
              alt="Logo"
              className="mobile-logo-image"
            />
          </a>
        </div>

        {/* Desktop: Current Date & Time */}
        <div className="date-container">
          <div className="date-text">
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
              className="calendar-icon"
            >
              <path d="M8 2v4"></path>
              <path d="M16 2v4"></path>
              <rect width="18" height="18" x="3" y="4" rx="2"></rect>
              <path d="M3 10h18"></path>
            </svg>
            <span>{currentDate}</span>
          </div>
        </div>

        {/* Right Nav Items (Both mobile & desktop) */}
        <div className="right-nav-items">
          {/* Balance indicator (desktop only) */}
          <div className="balance-indicator">
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
              className="wallet-icon"
            >
              <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path>
              <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path>
            </svg>
            <span className="balance-text">${formatNumber(totalBalance)}</span>
          </div>

          {/* User Profile Dropdown */}
          <div className="user-dropdown-container">
            <button
              onClick={() => {
                setUserDropdownOpen(!userDropdownOpen);
                setNotificationsOpen(false);
              }}
              className="user-menu-button"
              aria-expanded={userDropdownOpen}
              aria-haspopup="true"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="user-avatar"
                src={
                  profileImage?.length === 1
                    ? profileImage[0]?.url
                    : "https://fwiseb.online/storage/app/public/photos/X1hQX7splash-2048x2732.png1745340280"
                }
                alt="Jacob"
              />
            </button>

            {/* User dropdown menu */}
            {userDropdownOpen && (
              <div
                className="user-dropdown-menu"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="user-info-section">
                  <p className="user-name">
                    {firstName} {lastName}
                  </p>
                  <p className="user-id">ID: {accountNum}</p>

                  {/* KYC Verification Status */}
                  {(() => {
                    const badge = getKYCBadgeConfig(isKYC);
                    return (
                      <div className="kyc-status">
                        <span className={`kyc-badge ${badge.colorClass}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="kyc-icon">
                            <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                            <path d="m9 11 3 3L22 4"></path>
                          </svg>{" "}
                          {badge.label}
                        </span>
                      </div>
                    );
                  })()}
                </div>

                <a
                  href="maitlto:wealthwise@cosultant.online"
                  className="dropdown-item"
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
                    className="dropdown-icon"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <path d="M12 17h.01"></path>
                  </svg>{" "}
                  Support Ticket
                </a>
                <Link
                  to="/dashboard/account-settings"
                  className="dropdown-item"
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
                    className="dropdown-icon"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>{" "}
                  My Profile
                </Link>
                <a onClick={handleLogout} className="dropdown-item">
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
                    className="dropdown-icon"
                  >
                    <path d="m16 17 5-5-5-5"></path>
                    <path d="M21 12H9"></path>
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  </svg>{" "}
                  Sign Out
                </a>
                <form
                  id="logout-form-header"
                  action="https://fwiseb.online/logout"
                  method="POST"
                  style={{ display: "none" }}
                >
                  <input
                    type="hidden"
                    name="_token"
                    value="O3fUUxLWUcMB1x9rRpn4gWFBV9C1NSVUsiNwgwlD"
                  />
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DesktopHeader;
