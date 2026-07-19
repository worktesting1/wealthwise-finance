import DepositPaymentMethods from "../../components/DepositPaymentMethods";
import SecuredTransactions from "../../components/SecuredTransactions";
import { useEffect, useState } from "react";
import DepositDetailsModal from "../../components/DepositDetailsModal";
import { useGlobalContext } from "../../../../context/context";
import Sidebar from "../../components/Sidbar";
import DesktopHeader from "../../components/DesktopHeader";
import "./Deposit.css";

const DepositContents = () => {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [activeTab, setActiveTab] = useState("crypto");

  const toggleDepositModal = (method) => {
    setActiveTab(method === "Cryptocurrency" ? "crypto" : "bank");
    setShowDepositModal(true);
  };

  return (
    <div className="dp_page">
      {/* Hero banner */}
      <div className="dp_hero">
        <p className="dp_hero_eyebrow">Deposit</p>
        <h1 className="dp_hero_title">Fund Your Account</h1>
        <p className="dp_hero_sub">
          Choose a deposit method below. All transactions are encrypted and
          processed securely.
        </p>
      </div>

      {/* Method selection */}
      <div className="dp_body">
        <p className="dp_section_label">Select preferred method</p>
        <DepositPaymentMethods setShowWithdrawalModal={toggleDepositModal} />
        <SecuredTransactions />
      </div>

      <DepositDetailsModal
        show={showDepositModal}
        onClose={() => setShowDepositModal(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

const Deposit = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const token = JSON.parse(sessionStorage.getItem("userToken"));
  const _id = user?._id;
  const {
    getUserWithdrawals,
    getTotalBalance,
    getKYC,
    getUser,
    getAllDeposits,
    getAllLoans,
  } = useGlobalContext();

  useEffect(() => {
    if (!token || !_id) return;
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
        <DepositContents />
      </div>
      <div className="bank_desktop_dashboard">
        <Sidebar />
        <div className="bank_desktop_dashboard_body">
          <DesktopHeader />
          <DepositContents />
        </div>
      </div>
    </>
  );
};

export default Deposit;
