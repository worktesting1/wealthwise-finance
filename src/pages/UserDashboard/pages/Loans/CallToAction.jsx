import styles from "./CallToAction.module.css";
import { CiLock } from "react-icons/ci";
import { FaFile } from "react-icons/fa";
import { useGlobalContext } from "../../../../context/context";

const CallToAction = ({ hasActiveLoan, onApplyClick }) => {
  const { loanHistory } = useGlobalContext();
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Ready to get started?</h3>
      <p className={styles.description}>
        Apply now and get a decision on your loan application quickly
      </p>

      <button
        className={`${styles.button} ${
          hasActiveLoan || loanHistory.length > 0 ? styles.buttonDisabled : ""
        }`}
        disabled={hasActiveLoan || (loanHistory.length > 0 && true)}
        onClick={onApplyClick}
      >
        {hasActiveLoan || loanHistory?.length > 0 ? (
          <>
            <CiLock className={styles.buttonIcon} />
            Application Restricted
          </>
        ) : (
          <>
            <FaFile className={styles.buttonIcon} />
            Apply for a Loan
          </>
        )}
      </button>

      {hasActiveLoan ||
        (loanHistory.length > 0 && (
          <p className={styles.message}>
            You already have an active or pending loan application
          </p>
        ))}
    </div>
  );
};

export default CallToAction;
