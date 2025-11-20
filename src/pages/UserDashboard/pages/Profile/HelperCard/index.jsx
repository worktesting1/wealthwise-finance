import styles from "./HelperCard.module.css";
import { CiCircleQuestion } from "react-icons/ci";
import { TbArrowNarrowRight } from "react-icons/tb";

const HelpCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.iconContainer}>
          <CiCircleQuestion className={styles.icon} />
        </div>
        <h3 className={styles.cardTitle}>Need Help?</h3>
      </div>
      <p className={styles.cardText}>
        Contact our support team if you need assistance with your account
        settings or have any questions.
      </p>
      <a
        href="mailto:wealthwise@cosultant.online"
        className={styles.contactLink}
      >
        Contact Support
        <TbArrowNarrowRight className={styles.linkIcon} size={16} />
      </a>
    </div>
  );
};

export default HelpCard;
