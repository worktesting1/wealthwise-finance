import { useState } from "react";
import styles from "./TransactionPinModal.module.css";
import { MdClose } from "react-icons/md";

const TransactionPinModal = ({ isOpen, onClose }) => {
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate PINs
    if (newPin !== confirmPin) {
      setError("New PINs don't match");
      return;
    }

    if (newPin.length !== 4) {
      setError("PIN must be 4 digits");
      return;
    }

    // Close modal after submission
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Set Transaction PIN</h3>
          <button className={styles.closeButton} onClick={onClose}>
            <MdClose size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalBody}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Current PIN</label>
            <input
              type="password"
              value={currentPin}
              onChange={(e) => {
                setCurrentPin(e.target.value.replace(/\D/g, "").slice(0, 4));
                setError("");
              }}
              className={styles.formInput}
              maxLength={4}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>New PIN</label>
            <input
              type="password"
              value={newPin}
              onChange={(e) => {
                setNewPin(e.target.value.replace(/\D/g, "").slice(0, 4));
                setError("");
              }}
              className={styles.formInput}
              maxLength={4}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Confirm New PIN</label>
            <input
              type="password"
              value={confirmPin}
              onChange={(e) => {
                setConfirmPin(e.target.value.replace(/\D/g, "").slice(0, 4));
                setError("");
              }}
              className={styles.formInput}
              maxLength={4}
              required
            />
            {error && <p className={styles.errorMessage}>{error}</p>}
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={!currentPin || !newPin || !confirmPin}
          >
            Update PIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionPinModal;
