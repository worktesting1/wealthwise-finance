import { useNavigate } from "react-router-dom";

const TransferSuccessModal = ({ show, onClose, amount }) => {
  const navigate = useNavigate();
  if (!show) {
    return null;
  }

  return (
    <div className="success-modal-overlay">
      <div className="success-modal">
        <div className="success-content">
          <div className="success-icon">
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
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <path d="M22 4 12 14.01l-3-3"></path>
            </svg>
          </div>
          <h2>Transfer Successful!</h2>
          <p className="success-amount">${amount?.toLocaleString()}</p>

          <button className="close-btn" onClick={onClose}>
            Close
          </button>
          <button
            onClick={() => navigate("/dashboard/accountHistory")}
            className="receipt-btn"
          >
            Check Transactions
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransferSuccessModal;
