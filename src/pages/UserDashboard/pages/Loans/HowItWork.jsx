import { MdInfoOutline } from "react-icons/md";
import styles from "./HowItWorks.module.css";

const HowItWorks = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        <div className={styles.titleIconContainer}>
          <MdInfoOutline className={styles.titleIcon} />
        </div>
        How It Works
      </h3>

      <div className={styles.stepsContainer}>
        {/* Vertical connector line */}
        <div className={styles.connectorLine}></div>

        <div className={styles.steps}>
          {/* Step 1 */}
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepContent}>
              <h4 className={styles.stepTitle}>Apply Online</h4>
              <p className={styles.stepDescription}>
                Complete our simple online application form with your details
                and loan requirements
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepContent}>
              <h4 className={styles.stepTitle}>Quick Review</h4>
              <p className={styles.stepDescription}>
                Our team reviews your application and may contact you for
                additional information
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepContent}>
              <h4 className={styles.stepTitle}>Approval & Disbursement</h4>
              <p className={styles.stepDescription}>
                Once approved, the loan amount will be transferred to your
                account
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
