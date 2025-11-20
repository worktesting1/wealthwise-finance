import styles from "./loantypes.module.css";
import { GoHome, GoClock, GoQuestion } from "react-icons/go";
import { MdBusinessCenter } from "react-icons/md";

import { FaCarSide } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { CiCreditCard2, CiStethoscope } from "react-icons/ci";
import { BsStack } from "react-icons/bs";

const LoanTypes = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        <div className={styles.iconContainer}>
          <BsStack className={styles.icon} />
        </div>
        Available Loan Types
      </h3>

      <div className={styles.grid}>
        {/* First row */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <GoHome className={styles.cardIcon} />
            <h4 className={styles.cardTitle}>Personal Home Loans</h4>
          </div>
          <p className={styles.cardText}>
            Finance your dream home with competitive rates
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <FaCarSide className={styles.cardIcon} />
            <h4 className={styles.cardTitle}>Automobile Loans</h4>
          </div>
          <p className={styles.cardText}>
            Get on the road with flexible auto financing
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <MdBusinessCenter className={styles.cardIcon} />
            <h4 className={styles.cardTitle}>Business Loans</h4>
          </div>
          <p className={styles.cardText}>
            Grow your business with tailored financing solutions
          </p>
        </div>

        {/* Second row */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <FiUsers className={styles.cardIcon} />
            <h4 className={styles.cardTitle}>Joint Mortgage</h4>
          </div>
          <p className={styles.cardText}>
            Share responsibility with a co-borrower
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <CiCreditCard2 className={styles.cardIcon} />
            <h4 className={styles.cardTitle}>Secured Overdraft</h4>
          </div>
          <p className={styles.cardText}>
            Access funds when needed with asset backing
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <CiStethoscope className={styles.cardIcon} />
            <h4 className={styles.cardTitle}>Health Finance</h4>
          </div>
          <p className={styles.cardText}>
            Cover medical expenses with flexible payment options
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoanTypes;
