import styles from "./ProfileNavigation.module.css";
import { CiUser } from "react-icons/ci";
import { FiShield } from "react-icons/fi";

const ProfileNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className={styles.container}>
      <button
        className={`${styles.tab} ${activeTab === "info" ? styles.tabActive : ""}`}
        onClick={() => setActiveTab("info")}
      >
        <CiUser className={styles.tabIcon} />
        Personal Info
      </button>
      <button
        className={`${styles.tab} ${activeTab === "security" ? styles.tabActive : ""}`}
        onClick={() => setActiveTab("security")}
      >
        <FiShield className={styles.tabIcon} />
        Security
      </button>
    </div>
  );
};

export default ProfileNavigation;
