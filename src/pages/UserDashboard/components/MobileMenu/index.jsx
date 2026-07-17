import "./MobileMenu.css";
import { useGlobalContext } from "../../../../context/context";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const menuItems = [
  {
    title: "Home",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      </svg>
    ),
    link: "dashboard",
    color: "primary",
  },

  {
    title: "Cards",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <rect width="20" height="14" x="2" y="5" rx="2"></rect>
        <line x1="2" x2="22" y1="10" y2="10"></line>
      </svg>
    ),
    link: "dashboard/cards",
    color: "primary",
  },
  {
    title: "Transfer",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
        <path d="m21.854 2.147-10.94 10.939"></path>
      </svg>
    ),
    link: "dashboard/transfer",
    color: "secondary",
  },

  {
    title: "Deposit",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path d="M12 15V3"></path>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <path d="m7 10 5 5 5-5"></path>
      </svg>
    ),
    link: "dashboard/deposit",
    color: "primary",
  },
  {
    title: "Loan",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <rect width="20" height="14" x="2" y="5" rx="2"></rect>
        <line x1="2" x2="22" y1="10" y2="10"></line>
      </svg>
    ),
    link: "dashboard/loans",
    color: "secondary",
  },
  {
    title: "IRS Refund",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"></path>
        <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
        <path d="M12 17.5v-11"></path>
      </svg>
    ),
    link: "dashboard/irs-refund",
    color: "primary",
  },
  {
    title: "Settings",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    ),
    link: "dashboard/account-settings",
    color: "primary",
  },

  {
    title: "Logout",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path d="m16 17 5-5-5-5"></path>
        <path d="M21 12H9"></path>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
      </svg>
    ),
    link: "dashboard/logout",
    color: "accent",
    isLogout: true,
  },
];

const MobileMenu = ({ onClose }) => {
  const { userDetails, isKYC } = useGlobalContext();
  const { firstName, accountNum, lastName, profileImage } =
    JSON.parse(sessionStorage.getItem("user")) || userDetails || {};
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("userToken");
    onClose();
    navigate("/login");
  };

  return (
    <div className="mobile-menu-overlay">
      <div className="mobile-menu-container">
        <button
          type="button"
          className="mobile-menu-close-btn"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>

        <div className="mobile-user-info">
          <div className="mobile-user-avatar">
            <img
              src={
                profileImage?.length === 1
                  ? profileImage[0]?.url
                  : "https://fwiseb.online/storage/app/public/photos/X1hQX7splash-2048x2732.png1745340280"
              }
              alt="User"
            />
          </div>
          <div className="user-details">
            <h2>
              {firstName} {lastName}
            </h2>
            <p>Account: {accountNum}</p>
            <div className="verification-badge">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                <path d="m9 11 3 3L22 4"></path>
              </svg>
              <span>{isKYC ? "Verified" : "Unverified"}</span>
            </div>
          </div>
        </div>

        <div className="menu-title">
          <h2>Banking Menu</h2>
          <p>Select an option to continue</p>
        </div>

        <div className="menu-grid">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={`/${item.link}`}
              className={`menu-item ${item.color}`}
              onClick={item.isLogout ? handleLogout : onClose}
            >
              <div className="menu-icon-wrapper">
                <div className="menu-icon">{item.icon}</div>
              </div>
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
