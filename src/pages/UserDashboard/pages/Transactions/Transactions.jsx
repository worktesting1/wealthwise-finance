import React, { useEffect, useState } from "react";
import "./Transactions.css";
import { useGlobalContext } from "../../../../context/context";
import { CiExport, CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { FiMinus } from "react-icons/fi";
import { MdClose, MdReceipt } from "react-icons/md";
import TimeAgo from "../../components/TimeAgo";
import ExportModal from "./ExportModal";
import Sidebar from "../../components/Sidbar";
import DesktopHeader from "../../components/DesktopHeader";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

/* ── helpers ── */
const iconColor = (type) =>
  type === "withdrawal" ? "red" : type === "deposit" ? "green" : "yellow";

const txIcon = (type, status) => {
  if (status === "pending") return <FiMinus />;
  if (type === "withdrawal" && (status === "approved" || status === "true"))
    return <FiMinus />;
  if (type !== "withdrawal" && (status === "approved" || status === "true"))
    return <FaPlus />;
  return <MdClose />;
};

const refId = (tx) =>
  `FOR-${(tx?.txHash || tx?.referenceNumber || "").slice(0, 12)}`;

const normalizeStatus = (s) => (s === "true" ? "approved" : s);

/* ── Summary stats ── */
const SummaryStats = ({ transactions }) => {
  const { formatNumber } = useGlobalContext();
  const totalIn = transactions
    .filter((t) => t.type !== "withdrawal")
    .reduce((s, t) => s + (parseFloat(t.amount) || 0), 0);
  const totalOut = transactions
    .filter((t) => t.type === "withdrawal")
    .reduce((s, t) => s + (parseFloat(t.amount) || 0), 0);

  return (
    <div className="tx_stats">
      <div className="tx_stat_card">
        <div className="tx_stat_icon green">
          <FaPlus />
        </div>
        <div className="tx_stat_label">Total In</div>
        <div className="tx_stat_value green">${formatNumber(totalIn)}</div>
      </div>
      <div className="tx_stat_card">
        <div className="tx_stat_icon red">
          <FiMinus />
        </div>
        <div className="tx_stat_label">Total Out</div>
        <div className="tx_stat_value red">${formatNumber(totalOut)}</div>
      </div>
      <div className="tx_stat_card">
        <div className="tx_stat_icon blue">
          <MdReceipt />
        </div>
        <div className="tx_stat_label">Transactions</div>
        <div className="tx_stat_value">{transactions.length}</div>
      </div>
    </div>
  );
};

/* ── Mobile transaction card ── */
const TxCard = ({ tx }) => {
  const { formatNumber } = useGlobalContext();
  const status = normalizeStatus(tx?.status);
  return (
    <div className="tx_card">
      <div className={`tx_card_icon ${iconColor(tx?.type)}`}>
        {txIcon(tx?.type, tx?.status)}
      </div>
      <div className="tx_card_body">
        <div className="tx_card_top">
          <span className={`tx_card_type ${tx?.type?.toLowerCase()}`}>
            {tx?.type}
          </span>
          <span className="tx_card_amount">
            ${formatNumber(tx?.amount)} USD
          </span>
        </div>
        <div className="tx_card_mid">
          <span className="tx_card_ref">{refId(tx)}</span>
          <span className={`tx_card_status ${status}`}>{status}</span>
        </div>
        <div className="tx_card_footer">
          <TimeAgo timestamp={tx?.createdAt} />
        </div>
      </div>
    </div>
  );
};

/* ── Desktop table row ── */
const TxRow = ({ tx }) => {
  const { formatNumber } = useGlobalContext();
  const status = normalizeStatus(tx?.status);
  return (
    <tr>
      <td>
        <div className={`tx_tbl_icon ${iconColor(tx?.type)}`}>
          {txIcon(tx?.type, tx?.status)}
        </div>
      </td>
      <td className="tx_tbl_amount">${formatNumber(tx?.amount)} USD</td>
      <td>
        <span className={`tx_badge type_${tx?.type?.toLowerCase()}`}>
          {tx?.type}
        </span>
      </td>
      <td>
        <span className={`tx_badge status_${status}`}>{status}</span>
      </td>
      <td className="tx_tbl_ref">{refId(tx)}</td>
      <td className="tx_tbl_date">
        <TimeAgo timestamp={tx?.createdAt} />
      </td>
    </tr>
  );
};

/* ── Skeleton rows ── */
const SkeletonRows = () =>
  [1, 2, 3, 4].map((i) => (
    <div className="tx_card" key={i} style={{ gap: 12 }}>
      <Skeleton circle width={42} height={42} />
      <div style={{ flex: 1 }}>
        <Skeleton width="60%" height={14} style={{ marginBottom: 6 }} />
        <Skeleton width="40%" height={12} />
      </div>
    </div>
  ));

/* ── Main content ── */
const FILTER_TABS = ["all", "deposit", "withdrawal", "loan"];

const TransactionsContent = () => {
  const [showExportModal, setShowExportModal] = useState(false);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const { userWithdrawals, loanHistory, depositHistory, isLoadingTransactions } =
    useGlobalContext();

  const allTransactions = [...loanHistory, ...userWithdrawals, ...depositHistory].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const filtered = allTransactions.filter((tx) => {
    const matchesTab =
      activeFilter === "all" || tx?.type?.toLowerCase() === activeFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      tx?.type?.toLowerCase().includes(q) ||
      (tx?.txHash || "").toLowerCase().includes(q) ||
      (tx?.referenceNumber || "").toLowerCase().includes(q) ||
      String(tx?.amount || "").includes(q) ||
      normalizeStatus(tx?.status).includes(q);
    return matchesTab && matchesSearch;
  });

  return (
    <section className="tx_page">
      {/* Hero */}
      <div className="tx_hero">
        <div className="tx_hero_inner">
          <p className="tx_hero_label">Account History</p>
          <h1 className="tx_hero_title">Transactions</h1>
          <p className="tx_hero_sub">
            A complete record of all your account activity
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="tx_body">
        {/* Stats */}
        {!isLoadingTransactions && <SummaryStats transactions={allTransactions} />}

        {/* Controls */}
        <div className="tx_controls">
          <div className="tx_search_wrap">
            <CiSearch className="tx_search_icon" />
            <input
              className="tx_search_input"
              type="text"
              placeholder="Search by type, amount, reference…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="tx_controls_row">
            <div className="tx_filter_tabs">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab}
                  className={`tx_tab ${activeFilter === tab ? "active" : ""}`}
                  onClick={() => setActiveFilter(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button
              className="tx_export_btn"
              onClick={() => setShowExportModal(true)}
            >
              <CiExport size={16} />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Mobile card list */}
        {isLoadingTransactions ? (
          <div className="tx_list">
            <SkeletonRows />
          </div>
        ) : filtered.length > 0 ? (
          <>
            {/* Mobile */}
            <div className="tx_list">
              {filtered.map((tx) => (
                <TxCard key={tx?._id} tx={tx} />
              ))}
            </div>

            {/* Desktop table */}
            <div className="tx_table_wrap">
              <table className="tx_table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Reference ID</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((tx) => (
                    <TxRow key={tx?._id} tx={tx} />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="tx_empty">
            <div className="tx_empty_icon">
              <MdReceipt />
            </div>
            <p className="tx_empty_title">
              {search || activeFilter !== "all"
                ? "No matching transactions"
                : "No transactions yet"}
            </p>
            <p className="tx_empty_sub">
              {search || activeFilter !== "all"
                ? "Try a different search term or filter"
                : "Your transaction history will appear here"}
            </p>
          </div>
        )}
      </div>

      <ExportModal
        onClose={() => setShowExportModal(false)}
        showExportModal={showExportModal}
      />
    </section>
  );
};

/* ── Page shell (mobile + desktop) ── */
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
    // eslint-disable-next-line
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
