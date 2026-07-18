import { CiCamera } from "react-icons/ci";
import { MdVerified } from "react-icons/md";
import styles from "./ProfileHeader.module.css";

const ProfileHeader = ({ profileImage, name, accountNumber, onEditClick }) => {
  const handleImageError = (e) => {
    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=1e3a5f&color=fff&size=128`;
  };

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

      {/* Verified badge */}
      <div className={styles.verifiedBadge}>
        <span className={styles.verifiedDot} />
        Verified Account
      </div>
    </div>
  );
};

export default ProfileHeader;
