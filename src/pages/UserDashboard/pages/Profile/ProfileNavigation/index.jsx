import { useState } from "react";
import styles from "./ProfileNavigation.module.css";
import { FiShield } from "react-icons/fi";
import { CiUser } from "react-icons/ci";
import { IoKey } from "react-icons/io5";
import TransactionPinModal from "../TransactionPinModal";
import ProfilePassword from "../ProfilePassword";

const ProfileNavigation = () => {
  const [showPinModal, setShowPinModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <div className={styles.container}>
      <nav className={styles.navList}>
        <div className={styles.navItem}>
          <CiUser className={styles.navIcon} />
          <span>Profile Information</span>
        </div>

        <div
          className={styles.navItem}
          onClick={() => setShowPasswordModal(true)}
        >
          <FiShield className={styles.navIcon} />
          <span>Security Settings</span>
        </div>

        {/* <div className={styles.navButton} onClick={() => setShowPinModal(true)}>
          <IoKey className={`${styles.navIcon} ${styles.navIconInactive}`} />
          <span>Transaction PIN</span>
        </div> */}
      </nav>

      <TransactionPinModal
        isOpen={showPinModal}
        onClose={() => setShowPinModal(false)}
      />
      <ProfilePassword
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </div>
  );
};

export default ProfileNavigation;
