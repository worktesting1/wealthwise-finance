import styles from "./HelperCard.module.css";
import { CiCircleQuestion } from "react-icons/ci";
import { TbArrowNarrowRight } from "react-icons/tb";

const HelpCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.iconContainer}>
        <CiCircleQuestion className={styles.icon} />
      </div>
      <div className={styles.textBlock}>
        <h3 className={styles.cardTitle}>Need Help?</h3>
        <p className={styles.cardText}>
          Contact our support team for account assistance.
        </p>
      </div>
      <a href="mailto:wealthwise@cosultant.online" className={styles.contactLink}>
        Contact Support
        <TbArrowNarrowRight className={styles.linkIcon} />
      </a>
    </div>
  );
};

export default HelpCard;
