import { useEffect, useState } from "react";
import { useGlobalContext } from "../../../../context/context";
import { Link, useNavigate } from "react-router-dom";
import TransactionTable from "../../components/TransactionTable";
import TransactionStats from "../../components/TransactionStats";
import SupportCard from "../../components/SupportCard";
import Clock from "../../components/Clock";
import CurrentDate from "../../components/CurrentDate";
import Greetings from "../../components/Greetings";
import "./styles.css";

// Icons
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { MdHistory, MdVisibility } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { FaCircle } from "react-icons/fa";

// Images
import wealthwise from "../../../../assets/mobilewealth.png";
import DesktopHeader from "../../components/DesktopHeader";
import Sidebar from "../../components/Sidbar";
import StatsCards from "../../components/StatsCards";

function Dashboard() {
  const {
    getUser,
    userDetails,
    getTotalBalance,
    getKYC,
    getUserWithdrawals,
    getAllDeposits,
    getAllLoans,
  } = useGlobalContext();

  const { _id } = JSON.parse(sessionStorage.getItem("user")) || userDetails || {};
  const token = JSON.parse(sessionStorage.getItem("userToken"));

  useEffect(() => {
    getUser(token, _id);
    getTotalBalance(_id, token);
    getKYC(token, _id);
    getUserWithdrawals(token, _id);
    getAllDeposits(token, _id);
    getAllLoans(token, _id);
  }, []);

  return (
    <>
      {/* ── MOBILE LAYOUT ── */}
      <div className="bank_dashbaord">
        <div className="dash-mobile-body">
          <DashboardOverView />
          <DashboardWhatSect />
          <div className="dash-mobile-section">
            <DashboardTransactionSect />
          </div>
          <div className="dash-mobile-section">
            <div className="dash-section-title">Account Statistics</div>
            <TransactionStats />
          </div>
          <div className="dash-mobile-section dash-mobile-support">
            <SupportCard />
          </div>
        </div>
      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <div className="bank_desktop_dashboard">
        <Sidebar />
        <div className="bank_desktop_dashboard_body">
          <DesktopHeader />
          <div className="desktop-dashboard-scroll">
            <StatsCards />
            <div className="desktop-main-grid">
              <div className="desktop-main-left">
                <DashboardOverView />
                <DashboardWhatSect />
                <DashboardTransactionSect />
              </div>
              <div className="desktop-main-right">
                <div className="desktop-right-card">
                  <p className="desktop-right-title">Account Statistics</p>
                  <TransactionStats />
                </div>
                <SupportCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Balance Overview ── */
const DashboardOverView = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const { userDetails, formatNumber, totalAmount } = useGlobalContext();
  const { accountNum, firstName, profileImage } =
    JSON.parse(sessionStorage.getItem("user")) || userDetails || {};
  const currencySymbol = userDetails?.currencySymbol || "$";
  const currencyCode = userDetails?.currency || "USD";
  const totalBalance =
    JSON.parse(sessionStorage.getItem("totalBalance")) || totalAmount;

  return (
    <div className="overview-card">
      {/* Card top row */}
      <div className="overview-top-row">
        <div className="overview-profile-wrap">
          <img
            className="overview-avatar"
            src={profileImage?.length === 1 ? profileImage[0]?.url : wealthwise}
            alt="profile"
          />
          <div>
            <Greetings />
            <p className="overview-name">{firstName}</p>
          </div>
        </div>
        <div className="overview-date-wrap">
          <CurrentDate />
          <Clock />
        </div>
      </div>

      {/* Balance */}
      <div className="overview-balance-section">
        <div className="overview-balance-label-row">
          <span className="overview-balance-label">Available Balance</span>
          <button className="overview-eye-btn" onClick={() => setVisible(!visible)}>
            {visible
              ? <MdVisibility size={20} color="rgba(255,255,255,0.8)" />
              : <AiOutlineEyeInvisible size={20} color="rgba(255,255,255,0.8)" />
            }
          </button>
        </div>
        {visible
          ? <p className="overview-balance-hidden">••••••</p>
          : <p className="overview-balance-amount">{currencySymbol}{formatNumber(totalBalance)} <span className="overview-currency">{currencyCode}</span></p>
        }
      </div>

      {/* Account strip */}
      <div className="overview-account-strip">
        <div className="overview-account-info">
          <div className="overview-status-badge">
            <FaCircle size={6} color="#4ade80" />
            <span>Active</span>
          </div>
          <p className="overview-account-label">Account Number</p>
          <p className="overview-account-num">{accountNum}</p>
        </div>
        <div className="overview-account-actions">
          <button
            className="overview-btn-white"
            onClick={() => navigate("/dashboard/accountHistory")}
          >
            Transactions
          </button>
          <button
            className="overview-btn-ghost"
            onClick={() => navigate("/dashboard/transfer")}
          >
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Quick Actions ── */
const actions = [
  { to: "/dashboard/account-settings", icon: <CiUser size={24} />, label: "Account", color: "action-slate" },
  { to: "/dashboard/transfer",         icon: <FiSend size={22} />,  label: "Send",    color: "action-blue" },
  { to: "/dashboard/loans",            icon: <IoMdAdd size={24} />, label: "Loans",   color: "action-green" },
  { to: "/dashboard/accountHistory",   icon: <MdHistory size={22} />, label: "History", color: "action-purple" },
];

const DashboardWhatSect = () => (
  <div className="quick-actions-card">
    <p className="quick-actions-title">Quick Actions</p>
    <div className="quick-actions-row">
      {actions.map((a) => (
        <Link key={a.to} to={a.to} className="quick-action-item">
          <div className={`quick-action-icon ${a.color}`}>{a.icon}</div>
          <span className="quick-action-label">{a.label}</span>
        </Link>
      ))}
    </div>
  </div>
);

/* ── Recent Transactions ── */
const DashboardTransactionSect = () => {
  const { depositHistory, userWithdrawals, loanHistory } = useGlobalContext();
  const transactions = [...loanHistory, ...userWithdrawals, ...depositHistory];
  transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="transactions-card">
      <div className="transactions-card-header">
        <p className="transactions-card-title">Recent Transactions</p>
        <Link to="/dashboard/accountHistory" className="transactions-view-all">
          View all →
        </Link>
      </div>
      <TransactionTable transactions={transactions.slice(0, 5)} />
    </div>
  );
};

export default Dashboard;
