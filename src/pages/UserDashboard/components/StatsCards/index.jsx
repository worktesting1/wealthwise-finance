import { useGlobalContext } from "../../../../context/context";
import "./styles.css";
const StatsCards = () => {
  const { totalAmount, formatNumber } = useGlobalContext();

  const totalBalance =
    JSON.parse(sessionStorage.getItem("totalBalance")) || totalAmount;
  return (
    <div className="stats-cards-container">
      {/* Current Balance Card */}
      <div className="stats-card balance-card">
        <div>
          <p className="stats-label">Current Balance</p>
          <p className="stats-value">${formatNumber(totalBalance)}</p>
        </div>
        <div className="stats-icon-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stats-icon"
          >
            <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path>
            <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path>
          </svg>
        </div>
      </div>

      {/* Monthly Income Card */}
      <div className="stats-card income-card">
        <div>
          <p className="stats-label">Monthly Income</p>
          <p className="stats-value income-value">$0</p>
        </div>
        <div className="stats-icon-container income-icon-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stats-icon"
          >
            <path d="M16 7h6v6"></path>
            <path d="m22 7-8.5 8.5-5-5L2 17"></path>
          </svg>
        </div>
      </div>

      {/* Monthly Outgoing Card */}
      <div className="stats-card outgoing-card">
        <div>
          <p className="stats-label">Monthly Outgoing</p>
          <p className="stats-value outgoing-value">$0</p>
        </div>
        <div className="stats-icon-container outgoing-icon-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stats-icon"
          >
            <path d="M16 17h6v-6"></path>
            <path d="m22 17-8.5-8.5-5 5L2 7"></path>
          </svg>
        </div>
      </div>

      {/* Transaction Limit Card */}
      <div className="stats-card limit-card">
        <div>
          <p className="stats-label">Transaction Limit</p>
          <p className="stats-value limit-value">$500,000.00</p>
        </div>
        <div className="stats-icon-container limit-icon-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stats-icon"
          >
            <path d="m12 14 4-4"></path>
            <path d="M3.34 19a10 10 0 1 1 17.32 0"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
