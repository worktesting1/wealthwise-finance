import styles from "./styles.module.css";
import { GoClock } from "react-icons/go";
import { BsPercent } from "react-icons/bs";
import { MdOutlineShield } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";

const WhyChooseUs = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        <div className={styles.iconContainer}>
          <FiCheckCircle className={styles.icon} />
        </div>
        Why Choose Our Loan Services
      </h3>

      <div className={styles.grid}>
        <div className={styles.card}>
          <GoClock className={styles.cardIcon} />
          <div>
            <h4 className={styles.cardTitle}>Quick Approval</h4>
            <p className={styles.cardText}>
              Get a decision within hours and funds within days
            </p>
          </div>
        </div>

        <div className={styles.card}>
          <BsPercent className={styles.cardIcon} />
          <div>
            <h4 className={styles.cardTitle}>Competitive Rates</h4>
            <p className={styles.cardText}>
              Low interest rates tailored to your credit profile
            </p>
          </div>
        </div>

        <div className={styles.card}>
          <FaFileAlt className={styles.cardIcon} />
          <div>
            <h4 className={styles.cardTitle}>Simple Process</h4>
            <p className={styles.cardText}>
              Straightforward application with minimal paperwork
            </p>
          </div>
        </div>

        <div className={styles.card}>
          <MdOutlineShield className={styles.cardIcon} />
          <div>
            <h4 className={styles.cardTitle}>Secure & Confidential</h4>
            <p className={styles.cardText}>
              Your information is protected with bank-level security
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
