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
import { MdHistory } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { FaCircle } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { MdVisibility } from "react-icons/md";

// Images
import wealthwise from "../../../../assets/mobilewealth.png";
import DesktopHeader from "../../components/DesktopHeader";
import Sidebar from "../../components/Sidbar";
import StatsCards from "../../components/StatsCards";

function Dashboard() {
  const { _id } = JSON.parse(sessionStorage.getItem("user")) || userDetails;
  const token = JSON.parse(sessionStorage.getItem("userToken"));

  const {
    getUser,
    userDetails,
    getTotalBalance,
    getKYC,
    getUserWithdrawals,
    getAllDeposits,
    getAllLoans,
  } = useGlobalContext();

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
      <div className="bank_dashbaord">
        <div className="dashboard_body">
          {/* Dashboard OverView */}
          <DashboardOverView />
        </div>
        <div className="dashboard_what_wrapper">
          {/* What you would like section */}
          <DashboardWhatSect />
        </div>
        <div className="dashboard_transactions_wrapper">
          {/* Transaction Sect */}
          <DashboardTransactionSect />
        </div>
        <div className="dashboard_transactions_stats">
          <div className="dashboard_what_sect">
            <h3>Account Statistics</h3>
            <TransactionStats />
          </div>
        </div>
        <div className="dashobard_support_section">
          <SupportCard />
        </div>
      </div>
      <div className="bank_desktop_dashboard">
        <Sidebar />
        <div className="bank_desktop_dashboard_body">
          <DesktopHeader />
          <StatsCards />
          <div className="bank_desktop_dashboard_asides">
            <div className="bank_desktop_dashboard_inner_side">
              <DashboardOverView />
              <DashboardWhatSect />
            </div>
            <div className="bank_desktop_dashboard_aside">
              <TransactionStats />
              <SupportCard />
            </div>
          </div>
          <DashboardTransactionSect />
        </div>
      </div>
    </>
  );
}

const DashboardOverView = () => {
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => setVisible(!visible);
  const navigate = useNavigate();

  const { userDetails, formatNumber, totalAmount } = useGlobalContext();
  const { accountNum, firstName, profileImage } =
    JSON.parse(sessionStorage.getItem("user")) || userDetails;
  const totalBalance =
    JSON.parse(sessionStorage.getItem("totalBalance")) || totalAmount;
  return (
    <div className="overview_sect">
      <div className="overview_body_header">
        <div className="dashboard_profile">
          <img
            src={profileImage.length === 1 ? profileImage[0]?.url : wealthwise}
            alt="profile picture"
          />
        </div>
        <div className="overview_header_item_one">
          <div className="dashboard_profile_name_sect">
            <Greetings />
            <Clock />
          </div>
          <div className="overview_body_timer_sect">
            <h3 className="medium_tiny_text">{firstName}</h3>
            <CurrentDate />
          </div>
        </div>
      </div>
      <div className="dashboard_available_balance_sect">
        <div className="dashboard_available_balance_sect_text_sect">
          <h3 className="medium_tiny_text">Available Balance</h3>
          {!visible ? (
            <AiOutlineEyeInvisible
              size={22}
              color="white"
              onClick={toggleVisible}
            />
          ) : (
            <MdVisibility size={22} color="white" onClick={toggleVisible} />
          )}
        </div>
        {!visible ? (
          <h3 className="medium_tiny_text">
            ${formatNumber(totalBalance)} USD
          </h3>
        ) : (
          <h1>....</h1>
        )}
      </div>
      <div className="dashboard_account_sect">
        <div className="dashboard_account_number_sect">
          <button>
            <FaCircle size={6} />
            <span>Active</span>
          </button>
          <h3 className="medium_tiny_text">Account Number</h3>
          <h3 className="account_num_text">{accountNum}</h3>
        </div>
        <div className="dashboard_top_up_sect">
          <button
            onClick={() => navigate("/dashboard/accountHistory")}
            className="dashboard_top_up_sect_trans_btn"
          >
            Transactions
          </button>
          <button onClick={() => navigate("/dashboard/transfer")}>
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
};

const DashboardWhatSect = () => {
  return (
    <div className="dashboard_what_sect">
      <h3>What would you like to do today?</h3>
      <p className="tiny_text">Choose from our popular actions below</p>
      <div className="user_info_sect">
        <Link
          to="/dashboard/account-settings"
          className="user_info_items user_info_info"
        >
          <CiUser size={28} />
          <h3 className="medium_tiny_text">Account Info</h3>
        </Link>
        <Link
          to="/dashboard/transfer"
          className="user_info_items user_info_send"
        >
          <FiSend size={25} />
          <h3 className="medium_tiny_text">Send Money</h3>
        </Link>
        <Link to="/dashboard/loans" className="user_info_items user_info_loans">
          <IoMdAdd size={28} />
          <h3 className="medium_tiny_text">Loans</h3>
        </Link>
        <Link
          to="/dashboard/accountHistory"
          className="user_info_items user_info_history"
        >
          <MdHistory size={28} />
          <h3 className="medium_tiny_text">History</h3>
        </Link>
      </div>
    </div>
  );
};

const DashboardTransactionSect = () => {
  const { depositHistory, userWithdrawals, loanHistory } = useGlobalContext();
  const transactions = [...loanHistory, ...userWithdrawals, ...depositHistory];

  // Sort by createdAt descending (most recent first)
  transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return (
    <div className="dashboard_what_sect dashboard_transactions_sect">
      <div className="dashboard_card_header_sect">
        <div>
          <AiOutlineMenu size={22} />
          <p className="tiny_text">Recent Transactions</p>
        </div>
        <Link to="/dashboard/accountHistory" className="tiny_text">
          View All
        </Link>
      </div>
      <div className="dashboard_transactions">
        <TransactionTable transactions={transactions.slice(0, 3)} />
      </div>
    </div>
  );
};

export default Dashboard;
