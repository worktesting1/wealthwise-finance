import "./styles.css";
import { useGlobalContext } from "../../../../context/context";
import logo from "../../../../assets/Logo-black.svg";
import avatarFallback from "../../../../assets/mobilewealth.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Sidebar = () => {
  const { userDetails } = useGlobalContext();
  const { accountNum, firstName, profileImage, lastName, isKYC } =
    JSON.parse(sessionStorage.getItem("user")) || userDetails || {};
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        {/* Logo */}
        <div className="logo-container">
          <Link to="/dashboard" className="logo-link">
            <img src={logo} alt="Logo" className="logo-image" />
          </Link>
        </div>

        {/* User Info Card */}
        <div className="user-card-container">
          <div className="user-card">
            <div className="user-info">
              <div className="side-user-avatar">
                <img
                  src={
                    profileImage?.length === 1
                      ? profileImage[0]?.url
                      : avatarFallback
                  }
                  alt="Jacob"
                  className="avatar-image"
                />
              </div>
              <div className="user-details">
                <p className="user-name">
                  {firstName} {lastName}
                </p>
                <p className="user-id">ID: {accountNum}</p>
              </div>
            </div>

            {/* KYC Verification Status */}
            <div className="kyc-status">
              <div className="kyc-verified">
                <span className="kyc-text">
                  <svg
                    className="kyc-icon"
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
                    <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                    <path d="m9 11 3 3L22 4"></path>
                  </svg>{" "}
                  KYC {isKYC ? "Verified" : "Unverified"}
                </span>
              </div>
            </div>

            <div className="user-actions">
              <Link to={"/dashboard/account-settings"} className="profile-btn">
                <svg
                  className="btn-icon"
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
                </svg>{" "}
                Profile
              </Link>
              <Link onClick={handleLogout} className="logout-btn">
                <svg
                  className="btn-icon"
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
                  <path d="m16 17 5-5-5-5"></path>
                  <path d="M21 12H9"></path>
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                </svg>{" "}
                Logout
              </Link>
              {/* <form
                id="logout-form-sidebar"
                action="https://fwiseb.online/logout"
                method="POST"
                style={{ display: "none" }}
              >
                <input
                  type="hidden"
                  name="_token"
                  value="O3fUUxLWUcMB1x9rRpn4gWFBV9C1NSVUsiNwgwlD"
                />
              </form> */}
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="sidebar-nav">
          <p className="menu-section-title">Main Menu</p>

          <Link
            to="/dashboard"
            className={`desktop-menu-item ${
              pathname === "/dashboard" ? "active" : ""
            }`}
          >
            <svg
              className="desktop-menu-icon"
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
              <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
              <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            </svg>
            Dashboard
          </Link>

          <Link
            to="/dashboard/accountHistory"
            className={`desktop-menu-item ${
              pathname === "/dashboard/accountHistory" ? "active" : ""
            }`}
          >
            <svg
              className="desktop-menu-icon"
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
              <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path>
            </svg>
            Transactions
          </Link>

          {/* Cards Menu Item */}
          <Link
            to="/dashboard/cards"
            className={`desktop-menu-item ${
              pathname === "/dashboard/cards" ? "active" : ""
            }`}
          >
            <svg
              className="desktop-menu-icon"
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
              <rect width="20" height="14" x="2" y="5" rx="2"></rect>
              <line x1="2" x2="22" y1="10" y2="10"></line>
            </svg>
            Cards
          </Link>

          <p className="menu-section-title">Transfers</p>

          <Link
            to="/dashboard/transfer"
            className={`desktop-menu-item ${
              pathname === "/dashboard/transfer" ? "active" : ""
            }`}
          >
            <svg
              className="desktop-menu-icon"
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
            Transfer
          </Link>

          <Link
            to="/dashboard/deposit"
            className={`desktop-menu-item ${
              pathname === "/dashboard/deposit" ? "active" : ""
            }`}
          >
            <svg
              className="desktop-menu-icon"
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
              <path d="M12 15V3"></path>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <path d="m7 10 5 5 5-5"></path>
            </svg>
            Deposit
          </Link>

          <p className="menu-section-title">Services</p>

          <Link
            to="/dashboard/loans"
            className={`desktop-menu-item ${
              pathname === "/dashboard/loans" ? "active" : ""
            }`}
          >
            <svg
              className="desktop-menu-icon"
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
              <rect width="20" height="14" x="2" y="5" rx="2"></rect>
              <line x1="2" x2="22" y1="10" y2="10"></line>
            </svg>
            Loan Request
          </Link>

          <Link
            to="/dashboard/irs-refund"
            className={`desktop-menu-item ${
              pathname === "/dashboard/irs-refund" ? "active" : ""
            }`}
          >
            <svg
              className="desktop-menu-icon"
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
            IRS Tax Refund
          </Link>

          <p className="menu-section-title">Account</p>

          <Link
            to="/dashboard/account-settings"
            className={`desktop-menu-item ${
              pathname === "/dashboard/account-settings" ? "active" : ""
            }`}
          >
            <svg
              className="desktop-menu-icon"
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
              <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            Settings
          </Link>

          <a
            href="mailto:wealthwise@cosultant.online"
            className={`desktop-menu-item`}
          >
            <svg
              className="desktop-menu-icon"
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
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <path d="M12 17h.01"></path>
            </svg>
            Support Ticket
          </a>
        </nav>
      </div>

      {/* App Version */}
      <div className="sidebar-footer">
        <div className="footer-content">
          <div className="security-info">
            <svg
              className="security-icon"
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
              <path d="m9 12 2 2 4-4"></path>
            </svg>
            <span className="security-text">Secure Banking</span>
          </div>
          <span className="version-text">v1.2.0</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
