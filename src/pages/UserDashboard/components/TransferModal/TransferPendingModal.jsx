import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../../context/context";
import { FcProcess } from "react-icons/fc";

const TransferPendingModal = ({ show, amount }) => {
  const { formatNumber } = useGlobalContext();
  const navigate = useNavigate();
  if (!show) {
    return null;
  }

  return (
    <div className="success-modal-overlay">
      <div className="success-modal">
        <div className="success-content">
          <div className="success-icon">
            <FcProcess />
          </div>
          <h2>Transfer Processed!</h2>
          <p className="success-amount">${formatNumber(amount)}</p>

          <button className="close-btn" onClick={() => navigate("/dashboard")}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransferPendingModal;
