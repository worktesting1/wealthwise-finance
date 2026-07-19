import { CiCamera } from "react-icons/ci";
import { MdVerified, MdOutlineHourglassEmpty, MdOutlineCancel } from "react-icons/md";
import { RiShieldCheckLine } from "react-icons/ri";
import styles from "./ProfileHeader.module.css";

/**
 * Returns badge config based on the KYC status stored in context (isKYC).
 * Possible values after our normalisation: null | "pending" | "true" | true | "false" | false
 */
const getKYCBadge = (isKYC) => {
  const status = isKYC === null || isKYC === undefined ? null : String(isKYC).toLowerCase();

  if (status === "true") {
    return { label: "Verified Account", className: styles.badgeVerified, icon: <MdVerified size={13} /> };
  }
  if (status === "pending") {
    return { label: "Verification Pending", className: styles.badgePending, icon: <MdOutlineHourglassEmpty size={13} /> };
  }
  if (status === "false") {
    return { label: "Verification Rejected", className: styles.badgeRejected, icon: <MdOutlineCancel size={13} /> };
  }
  // null / anything else → not submitted
  return { label: "Not Verified", className: styles.badgeUnverified, icon: <RiShieldCheckLine size={13} /> };
};

const ProfileHeader = ({ profileImage, name, accountNumber, onEditClick, isKYC }) => {
  const handleImageError = (e) => {
    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=1e3a5f&color=fff&size=128`;
  };

  const badge = getKYCBadge(isKYC);

  return (
    <div className={styles.container}>
      {/* Avatar */}
      <div className={styles.profileContainer}>
        <div className={styles.profileImageWrapper}>
          <img
            src={profileImage}
            className={styles.profileImage}
            alt={name}
            onError={handleImageError}
          />
        </div>
        <button className={styles.editButton} onClick={onEditClick} title="Change photo">
          <CiCamera className={styles.editIcon} />
        </button>
      </div>

      {/* Name */}
      <h2 className={styles.userName}>{name}</h2>

      {/* Account number pill */}
      <div className={styles.accountBadge}>
        <span>Account #{accountNumber}</span>
      </div>

      {/* KYC verification badge — driven by real isKYC value */}
      <div className={`${styles.verifiedBadge} ${badge.className}`}>
        {badge.icon}
        {badge.label}
      </div>
    </div>
  );
};

export default ProfileHeader;
