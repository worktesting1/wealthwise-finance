import { useState } from "react";
import styles from "./TransactionPinModal/TransactionPinModal.module.css";
import { MdClose } from "react-icons/md";
import axios from "axios";
import { useGlobalContext } from "../../../../context/context";
import { toast } from "react-toastify";

const ProfilePassword = ({ isOpen, onClose }) => {
  const [password, setpassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);
  const { baseUrl, userDetails } = useGlobalContext();
  const accessToken = JSON.parse(sessionStorage.getItem("userToken"));
  const { _id } = JSON.parse(sessionStorage.getItem("user")) || userDetails || {};

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate PINs
    if (password !== confirmpassword) {
      setError("passwords must match");
    } else {
      setloading(true);
      axios
        .put(
          `${baseUrl}/api/users/user/${_id}`,
          { password, confirmpassword },
          { headers: { token: accessToken } }
        )
        .then((response) => {
          toast.success("Password Changed");
          setloading(false);
          setTimeout(() => {
            // Close modal after submission
            onClose();
          }, 2500);
        })
        .catch((error) => {
          setloading(false);
        });
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Set New Password</h3>
          <button className={styles.closeButton} onClick={onClose}>
            <MdClose size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalBody}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
                setError("");
              }}
              className={styles.formInput}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Confirm New PIN</label>
            <input
              type="password"
              value={confirmpassword}
              onChange={(e) => {
                setConfirmpassword(e.target.value);
                setError("");
              }}
              className={styles.formInput}
              required
            />
            {error && <p className={styles.errorMessage}>{error}</p>}
          </div>

          <button type="submit" className={styles.submitButton}>
            {loading ? "Updating..." : " Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePassword;
