import styles from "./FAQ.module.css";
import { FiCheckCircle } from "react-icons/fi";

const FAQ = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        <FiCheckCircle className={styles.titleIcon} />
        Frequently Asked Questions
      </h3>

      <div className={styles.faqList}>
        {/* FAQ Item 1 */}
        <div className={styles.faqItem}>
          <h4 className={styles.faqQuestion}>
            What documents do I need to apply?
          </h4>
          <p className={styles.faqAnswer}>
            You'll need identification, proof of income, and address
            verification. Additional documents may be requested based on loan
            type.
          </p>
        </div>

        {/* FAQ Item 2 */}
        <div className={styles.faqItem}>
          <h4 className={styles.faqQuestion}>How long does approval take?</h4>
          <p className={styles.faqAnswer}>
            Standard applications are typically processed within 1-3 business
            days, depending on verification requirements.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
