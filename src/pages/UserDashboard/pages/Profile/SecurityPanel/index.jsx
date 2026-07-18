import { useState } from "react";
import styles from "./SecurityPanel.module.css";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import { MdOutlineVerifiedUser } from "react-icons/md";
import axios from "axios";
import { useGlobalContext } from "../../../../../context/context";
import { toast } from "react-toastify";

const SecurityPanel = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { baseUrl, userDetails } = useGlobalContext();
  const accessToken = JSON.parse(sessionStorage.getItem("userToken"));
  const { _id } = JSON.parse(sessionStorage.getItem("user")) || userDetails || {};

  const strength = (() => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "#ef4444", "#f59e0b", "#3b82f6", "#22c55e"][strength];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setLoading(true);
    axios
      .put(
        `${baseUrl}/api/users/user/${_id}`,
        { password, confirmpassword: confirmPassword },
        { headers: { token: accessToken } }
      )
      .then(() => {
        setLoading(false);
        setSuccess(true);
        setPassword("");
        setConfirmPassword("");
        toast.success("Password updated successfully");
        setTimeout(() => setSuccess(false), 4000);
      })
      .catch(() => {
        setLoading(false);
        toast.error("Failed to update password. Please try again.");
      });
  };

  return (
    <div className={styles.container}>
      {/* Section header */}
      <div className={styles.sectionHeader}>
        <div className={styles.sectionIconWrap}>
          <MdOutlineVerifiedUser size={20} />
        </div>
        <div>
          <h3 className={styles.sectionTitle}>Change Password</h3>
          <p className={styles.sectionSubtitle}>
            Use a strong password you don't use elsewhere
          </p>
        </div>
      </div>

      {/* Success banner */}
      {success && (
        <div className={styles.successBanner}>
          ✓ Your password has been updated successfully.
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* New password */}
        <div className={styles.field}>
          <label className={styles.label}>New Password</label>
          <div className={styles.inputWrap}>
            <FiLock className={styles.inputIcon} size={16} />
            <input
              type={showPassword ? "text" : "password"}
              className={styles.input}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Min. 8 characters"
              required
            />
            <button
              type="button"
              className={styles.toggleBtn}
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
            >
              {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>

          {/* Strength bar */}
          {password.length > 0 && (
            <div className={styles.strengthRow}>
              <div className={styles.strengthBar}>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={styles.strengthSegment}
                    style={{
                      background: i <= strength ? strengthColor : "#e2e8f0",
                    }}
                  />
                ))}
              </div>
              <span className={styles.strengthLabel} style={{ color: strengthColor }}>
                {strengthLabel}
              </span>
            </div>
          )}
        </div>

        {/* Confirm password */}
        <div className={styles.field}>
          <label className={styles.label}>Confirm New Password</label>
          <div className={styles.inputWrap}>
            <FiLock className={styles.inputIcon} size={16} />
            <input
              type={showConfirm ? "text" : "password"}
              className={styles.input}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
              placeholder="Re-enter your new password"
              required
            />
            <button
              type="button"
              className={styles.toggleBtn}
              onClick={() => setShowConfirm((v) => !v)}
              tabIndex={-1}
            >
              {showConfirm ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>
          {/* Match indicator */}
          {confirmPassword.length > 0 && (
            <p
              className={styles.matchHint}
              style={{ color: password === confirmPassword ? "#16a34a" : "#dc2626" }}
            >
              {password === confirmPassword ? "✓ Passwords match" : "✗ Passwords do not match"}
            </p>
          )}
          {error && <p className={styles.error}>{error}</p>}
        </div>

        {/* Tips */}
        <div className={styles.tips}>
          <p className={styles.tipsTitle}>Password tips</p>
          <ul className={styles.tipsList}>
            <li>At least 8 characters long</li>
            <li>Mix uppercase letters, numbers &amp; symbols</li>
            <li>Don't reuse passwords from other accounts</li>
          </ul>
        </div>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={loading || !password || !confirmPassword}
        >
          {loading ? "Updating…" : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default SecurityPanel;
