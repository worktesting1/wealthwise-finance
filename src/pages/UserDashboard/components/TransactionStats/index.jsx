import React from "react";
import "./styles.css"; // We'll create this CSS file
import { formatDistanceToNow } from "date-fns";
import { useGlobalContext } from "../../../../context/context";

const formatDateRelative = (dateString) => {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
};

const TransactionStats = () => {
  const { createdAt } = JSON.parse(sessionStorage.getItem("user"));
  const createAtDate = formatDateRelative(createdAt);
  const {
    totalWithdrawal,
    formatNumber,
    totalAmount,
    pendingWithdrawal,
    getPendingDepositsAmount,
  } = useGlobalContext();

  const totalBalance =
    JSON.parse(sessionStorage.getItem("totalBalance")) || totalAmount;
  const getSuccessfulDepositsAmount = JSON.parse(
    sessionStorage.getItem("deposits")
  );
  const pendingLoans = JSON.parse(sessionStorage.getItem("loans"));

  const stats = [
    {
      title: "Transaction Limit",
      value: "500,000.00",
      icon: "credit-card",
      iconBg: "primary",
      iconColor: "gray",
    },
    {
      title: "Pending Transactions",
      value: `$${formatNumber(
        pendingWithdrawal + pendingLoans + getPendingDepositsAmount()
      )}`,
      icon: "clock",
      iconBg: "yellow",
      iconColor: "yellow",
    },
    {
      title: "Transaction Volume",
      value: `$${formatNumber(totalBalance + totalWithdrawal)}`,
      icon: "bar-chart-2",
      iconBg: "green",
      iconColor: "green",
    },
    {
      title: "Account Age",
      value: createAtDate,
      icon: "calendar",
      iconBg: "purple",
      iconColor: "purple",
    },
  ];

  return (
    <div className="stats-container">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className={`icon-container ${stat.iconBg}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className={`icon ${stat.iconColor}`}
            >
              {stat.icon === "credit-card" && (
                <>
                  <rect width="20" height="18" x="2" y="5" rx="2"></rect>
                  <line x1="2" x2="22" y1="10" y2="10"></line>
                </>
              )}
              {stat.icon === "clock" && (
                <>
                  <path d="M12 6v6l4 2"></path>
                  <circle cx="12" cy="12" r="10"></circle>
                </>
              )}
              {stat.icon === "bar-chart-2" && (
                <>
                  <line x1="18" x2="18" y1="20" y2="10"></line>
                  <line x1="12" x2="12" y1="20" y2="4"></line>
                  <line x1="6" x2="6" y1="20" y2="14"></line>
                </>
              )}
              {stat.icon === "calendar" && (
                <>
                  <path d="M8 2v4"></path>
                  <path d="M16 2v4"></path>
                  <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                  <path d="M3 10h18"></path>
                </>
              )}
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-title">{stat.title}</p>
            <p className="stat-value">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionStats;
