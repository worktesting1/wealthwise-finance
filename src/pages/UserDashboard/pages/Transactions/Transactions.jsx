import React, { useEffect, useState } from "react";
import "./Transactions.css";
import { useGlobalContext } from "../../../../context/context";
import { CiFilter, CiExport, CiSearch } from "react-icons/ci";
import TransactionTable from "../../components/TransactionTable";
import ExportModal from "./ExportModal";
import Sidebar from "../../components/Sidbar";
import DesktopHeader from "../../components/DesktopHeader";

const TransactionsContent = () => {
  const [showExportModal, setShowExportModal] = useState(false);
  const { userWithdrawals, loanHistory, depositHistory } = useGlobalContext();
  const transactions = [...loanHistory, ...userWithdrawals, ...depositHistory];

  // Sort by createdAt descending (most recent first)
  transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handleExport = (options) => {
    // Implement your export logic here
    setShowExportModal(false);
  };

  return (
    <section className="user_transactions">
      <h2>Transactions</h2>
      <div className="transactions_filter_sect">
        <button
          className="transaction_export_btn"
          onClick={() => setShowExportModal(true)}
        >
          <CiExport size={22} />
          <span>Export</span>
        </button>
      </div>
      <div className="transactions_filter_search_bar">
        <CiSearch size={25} />
        <input type="text" />
        <CiFilter size={22} />
      </div>
      <TransactionTable transactions={transactions} />
      <ExportModal
        onClose={() => setShowExportModal(false)}
        onExport={handleExport}
        showExportModal={showExportModal}
      />
    </section>
  );
};

const Transactions = () => {
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
        <TransactionsContent />
      </div>
      <div className="bank_desktop_dashboard">
        <Sidebar />
        <div className="bank_desktop_dashboard_body">
          <DesktopHeader />
          <TransactionsContent />
        </div>
      </div>
    </>
  );
};

export default Transactions;
