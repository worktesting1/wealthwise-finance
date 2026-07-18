import "./styles.css";
import { CiLock } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import { useGlobalContext } from "../../../../context/context";

const CallToAction = ({ hasActiveLoan, onApplyClick }) => {
  const { loanHistory } = useGlobalContext();
  const isRestricted = hasActiveLoan || loanHistory.length > 0;

  return (
    <div className="ln_cta">
      <div className="ln_cta_inner">
        <p className="ln_cta_title">
          {isRestricted ? "Application Restricted" : "Ready to Apply?"}
        </p>
        <p className="ln_cta_sub">
          {isRestricted
            ? "You already have an active or pending loan. Please settle it before applying again."
            : "Get a decision within 24 hours. No hidden fees, no paperwork hassle."}
        </p>

        <button
          className="ln_cta_btn"
          disabled={isRestricted}
          onClick={onApplyClick}
        >
          {isRestricted ? (
            <>
              <CiLock size={18} />
              Locked — Active Loan Exists
            </>
          ) : (
            <>
              Apply for a Loan
              <FaArrowRight size={14} />
            </>
          )}
        </button>

        {!isRestricted && (
          <p className="ln_cta_note">
            Applying does not affect your credit score
          </p>
        )}
      </div>
    </div>
  );
};

export default CallToAction;
