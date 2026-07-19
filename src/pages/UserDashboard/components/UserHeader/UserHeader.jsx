import React, { useEffect } from "react";
import "./UserHeader.css";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  AiOutlineDashboard,
  AiOutlineLogout,
  AiOutlineSetting,
} from "react-icons/ai";
import { CiMoneyBill, CiUser } from "react-icons/ci";
import { BsArrowRight } from "react-icons/bs";
import { BiTransfer } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { useGlobalContext } from "../../../../context/context";
import { useNavigate } from "react-router-dom";
import { RiLuggageDepositLine } from "react-icons/ri";
import { getKYCBadgeConfig } from "../../../../utils/kycBadge";

const UserHeader = ({ transferAmount, depositAmount }) => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const { username, accountNum } = user;
  const accessToken = JSON.parse(sessionStorage.getItem("userToken"));
  const { userNav, setUserNav, toggleNave, userData, getUserKYC, kycStatus, isKYC } =
    useGlobalContext();
  const navigate = useNavigate();
  const { profit, country } = userData;

  const logOut = () => {
    sessionStorage.removeItem("user");
  };

  useEffect(() => {
    getUserKYC(accessToken);
  }, []);

  return (
    <>
      <header className="user_dashboard_header">
        <div className="flex">
          <RxHamburgerMenu
            id="nav"
            onClick={toggleNave}
            style={{ zIndex: `${userNav === true ? 2 : 4}`, cursor: "pointer" }}
          />
          <p className="sub-p"> Wealth Wise</p>
        </div>
        <div className="amount-details">
          <div className="user_total_value_container">
            <p className="sub-p">Total Balance</p>
            <h2>
              {country?.symbol}
              {profit
                ? (profit + depositAmount - transferAmount).toLocaleString(
                    "en-US"
                  )
                : "0"}
            </h2>
          </div>
          <div className="dashboard_transactions_details flex">
            <div
              className="dashboard_icon_con flex"
              onClick={() => {
                navigate("/dash/deposit");
              }}
            >
              <div>
                <RiLuggageDepositLine />
              </div>
              <p className="sub-p">Deposit</p>
            </div>
            <div
              className="dashboard_icon_con flex"
              onClick={() => {
                navigate("/dash/cards");
              }}
            >
              <div>
                <CiMoneyBill />
              </div>
              <p className="sub-p">Card</p>
            </div>
            <div
              className="dashboard_icon_con flex"
              onClick={() => {
                navigate("/dash/transfer");
              }}
            >
              <div>
                <BsArrowRight />
              </div>
              <p className="sub-p">Transfer</p>
            </div>
            <div
              className="dashboard_icon_con flex"
              onClick={() => {
                navigate("/dash/profile");
              }}
            >
              <div>
                <CiUser />
              </div>
              <p className="sub-p">Profile</p>
            </div>
            <div
              className="dashboard_icon_con flex transact"
              onClick={() => {
                navigate("/dash/transactions");
              }}
            >
              <div>
                <BiTransfer />
              </div>
              <p className="sub-p">Transactions</p>
            </div>
          </div>
        </div>
      </header>
      <nav
        className={`navigation-bar flex ${
          userNav === false ? "dec-scale" : "in-scale"
        }`}
      >
        <div
          className={`navigation ${userNav == true ? "open-nav" : "close-nav"}`}
        >
          <div className="navigation-header flex">
            <h3>{username} </h3>
            {(() => {
              const badge = getKYCBadgeConfig(isKYC);
              const colorMap = {
                "kyc-badge--verified":   "#4ade80",
                "kyc-badge--pending":    "#fbbf24",
                "kyc-badge--rejected":   "#f87171",
                "kyc-badge--unverified": "#94a3b8",
              };
              return (
                <span style={{ color: colorMap[badge.colorClass] || "#94a3b8", fontSize: "13px", marginRight: "0" }}>
                  {badge.label}
                </span>
              );
            })()}
            <FaTimes id="nav" onClick={toggleNave} />
          </div>
          <div className="flex navigation-header">
            <p style={{ color: "#fff", marginTop: "10px" }}>
              <span>Account Number: </span>
              <span>{accountNum}</span>
            </p>
          </div>
          <p className="sub-p">Menu</p>
          <div
            className="list_flex list_flex1 flex"
            onClick={() => {
              navigate("/dash/verify");
            }}
          >
            <div className="navigation_icon_container flex">
              <MdVerified />
            </div>
            <h3>Verify Your Account (KYC)</h3>
          </div>
          <div
            className="list_flex flex"
            onClick={() => {
              setUserNav(false);
              navigate("/dash/dashboard");
            }}
          >
            <div className="navigation_icon_container flex">
              <AiOutlineDashboard />
            </div>
            <h3>Dashboard</h3>
          </div>
          <div
            className="list_flex flex"
            onClick={() => {
              setUserNav(false);
              navigate("/dash/deposit");
            }}
          >
            <div className="navigation_icon_container flex">
              <RiLuggageDepositLine />
            </div>
            <h3>Deposit</h3>
          </div>
          <div
            className="list_flex flex"
            onClick={() => {
              setUserNav(false);
              navigate("/dash/cards");
            }}
          >
            <div className="navigation_icon_container flex">
              <CiMoneyBill />
            </div>
            <h3>Cards</h3>
          </div>
          <div
            className="list_flex flex"
            onClick={() => {
              setUserNav(false);
              navigate("/dash/transfer");
            }}
          >
            <div className="navigation_icon_container flex">
              <BsArrowRight />
            </div>
            <h3>Transfers</h3>
          </div>
          <p className="sub-p">Other</p>
          <div
            className="list_flex flex"
            onClick={() => {
              setUserNav(false);
              navigate("/dash/transactions");
            }}
          >
            <div className="navigation_icon_container flex">
              <BiTransfer />
            </div>
            <h3>Transactions</h3>
          </div>
          <div
            className="list_flex flex"
            onClick={() => {
              navigate("/dash/profile");
            }}
          >
            <div className="navigation_icon_container flex">
              <CiUser />
            </div>
            <h3>Profile</h3>
          </div>
          <div
            className="list_flex flex"
            onClick={() => {
              setUserNav(false);
              navigate("/dash/settings");
            }}
          >
            <div className="navigation_icon_container flex">
              <AiOutlineSetting />
            </div>
            <h3>Settings</h3>
          </div>
          <div
            className="list_flex flex"
            onClick={() => {
              navigate("/dash/dashboard");
              logOut();
            }}
          >
            <div className="navigation_icon_container flex">
              <AiOutlineLogout />
            </div>
            <h3>Log out</h3>
          </div>
        </div>
        <div
          className={`transparent_bg ${
            userNav === false ? "close_bg" : "open_bg"
          }`}
          onClick={() => setUserNav(false)}
        ></div>
      </nav>
    </>
  );
};

export default UserHeader;
