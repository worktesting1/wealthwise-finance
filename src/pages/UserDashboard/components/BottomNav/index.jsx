import React from "react";
import "./BottomNav.css";
import { Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../../../context/context";

const BottomNav = () => {
  const { pathname } = useLocation();
  const { setIsMenuOpen } = useGlobalContext();

  return (
    <div className="bottom-nav-container">
      <div className="bottom-nav-content">
        {/* Home Button */}
        <Link to="/dashboard" className="nav-item">
          <div className="nav-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className={`nav-svg ${pathname === "/dashboard" && "active"}`}
            >
              <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
              <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            </svg>
          </div>
          <span
            className={`nav-label ${pathname === "/dashboard" && "active"}`}
          >
            Home
          </span>
        </Link>

        {/* Stats Button */}
        <Link to="/dashboard/accountHistory" className="nav-item">
          <div className="nav-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className={`nav-svg ${
                pathname === "/dashboard/accountHistory" && "active"
              }`}
            >
              <line x1="18" x2="18" y1="20" y2="10"></line>
              <line x1="12" x2="12" y1="20" y2="4"></line>
              <line x1="6" x2="6" y1="20" y2="14"></line>
            </svg>
          </div>
          <span
            className={`nav-label ${
              pathname === "/dashboard/accountHistory" && "active"
            }`}
          >
            Stats
          </span>
        </Link>

        {/* Center Floating Button */}
        <div className="floating-button-container">
          <button
            className="floating-button"
            onClick={() => {
              setIsMenuOpen(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="floating-icon"
            >
              <rect width="18" height="18" x="3" y="3" rx="2"></rect>
              <path d="M3 9h18"></path>
              <path d="M3 15h18"></path>
              <path d="M9 3v18"></path>
              <path d="M15 3v18"></path>
            </svg>
          </button>
        </div>

        {/* Cards Button */}
        <Link to="/dashboard/cards" className="nav-item">
          <div className="nav-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className={`nav-svg ${
                pathname === "/dashboard/cards" && "active"
              }`}
            >
              <rect width="20" height="14" x="2" y="5" rx="2"></rect>
              <line x1="2" x2="22" y1="10" y2="10"></line>
            </svg>
          </div>
          <span
            className={`nav-label ${
              pathname === "/dashboard/cards" && "active"
            }`}
          >
            Cards
          </span>
        </Link>

        {/* Profile Button */}
        <Link to="/dashboard/account-settings" className="nav-item">
          <div className="nav-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className={`nav-svg ${
                pathname === "/dashboard/account-settings" && "active"
              }`}
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <span
            className={`nav-label ${
              pathname === "/dashboard/account-settings" && "active"
            }`}
          >
            Profile
          </span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;
