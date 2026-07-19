import { useLocation } from "react-router-dom";
import "./styles.css";
import { MdOutlineShield } from "react-icons/md";

const SecuredTransactions = () => {
  const { pathname } = useLocation();
  const isDeposit = pathname === "/dashboard/deposit";

  return (
    <div className="dp_secure">
      <div className="dp_secure_icon">
        <MdOutlineShield size={20} />
      </div>
      <div className="dp_secure_text">
        <h4>Secure Transaction</h4>
        <p>
          {isDeposit
            ? "All deposits are end-to-end encrypted and processed securely."
            : "All transfers are encrypted and processed securely. Never share your PIN with anyone."}
        </p>
      </div>
    </div>
  );
};

export default SecuredTransactions;
