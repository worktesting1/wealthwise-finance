import { useLocation } from "react-router-dom";
import "./styles.css";
import { MdOutlineShield } from "react-icons/md";

const SecuredTransactions = () => {
  const { pathname } = useLocation();
  const isDeposit = pathname === "/dashboard/deposit";
  return (
    <div className="secure-transaction-notice">
      <div className="notice-container">
        <div className="notice-content">
          <div className="icon-container">
            <MdOutlineShield className="shield-icon" size={25} />
          </div>
          <div className="text-container">
            <h3 className="notice-title">Secure Transaction</h3>
            {isDeposit ? (
              <p className="notice-description">
                All deposits are encrypted and processed securely.
              </p>
            ) : (
              <p className="notice-description">
                All transfers are encrypted and processed securely. Never share
                your PIN with anyone.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuredTransactions;
