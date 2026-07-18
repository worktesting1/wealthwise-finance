import { useState } from "react";
import styles from "./styles.module.css";
import { FaHashtag, FaPhoneAlt, FaCopy, FaCheck } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { CiLocationOn, CiCircleInfo, CiUser } from "react-icons/ci";

const ProfileInformation = () => {
  const [copied, setCopied] = useState(false);
  const {
    firstName,
    lastName,
    accountNum,
    country,
    email,
    phone,
  } = JSON.parse(sessionStorage.getItem("user")) || {};

  const copyToClipboard = () => {
    if (!accountNum) return;
    navigator.clipboard.writeText(accountNum).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={styles.container}>
      {/* Name row */}
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>First Name</label>
          <div className={styles.inputWrap}>
            <CiUser className={styles.icon} size={18} />
            <input
              type="text"
              className={styles.input}
              value={firstName || ""}
              readOnly
            />
          </div>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Last Name</label>
          <div className={styles.inputWrap}>
            <CiUser className={styles.icon} size={18} />
            <input
              type="text"
              className={styles.input}
              value={lastName || ""}
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Account number */}
      <div className={styles.field}>
        <label className={styles.label}>Account Number</label>
        <div className={styles.inputWrap}>
          <FaHashtag className={styles.icon} size={14} />
          <input
            type="text"
            className={styles.input}
            value={accountNum || ""}
            readOnly
          />
          <button
            type="button"
            className={`${styles.copyBtn} ${copied ? styles.copyBtnSuccess : ""}`}
            onClick={copyToClipboard}
            title="Copy account number"
          >
            {copied ? <FaCheck size={13} /> : <FaCopy size={13} />}
          </button>
        </div>
        <p className={styles.hint}>
          {copied ? "Copied to clipboard!" : "Tap the icon to copy your account number"}
        </p>
      </div>

      {/* Email */}
      <div className={styles.field}>
        <label className={styles.label}>Email Address</label>
        <div className={styles.inputWrap}>
          <MdOutlineEmail className={styles.icon} size={18} />
          <input
            type="email"
            className={styles.input}
            value={email || ""}
            readOnly
          />
        </div>
      </div>

      {/* Phone */}
      <div className={styles.field}>
        <label className={styles.label}>Phone Number</label>
        <div className={styles.inputWrap}>
          <FaPhoneAlt className={styles.icon} size={14} />
          <input
            type="tel"
            className={styles.input}
            value={phone || ""}
            readOnly
          />
        </div>
      </div>

      {/* Country / Address */}
      <div className={styles.field}>
        <label className={styles.label}>Country / Address</label>
        <div className={styles.inputWrap} style={{ alignItems: "flex-start" }}>
          <CiLocationOn
            className={styles.icon}
            size={18}
            style={{ marginTop: "12px" }}
          />
          <textarea
            className={`${styles.input} ${styles.textarea}`}
            value={country || ""}
            readOnly
            rows={2}
          />
        </div>
      </div>

      {/* Info notice */}
      <div className={styles.notice}>
        <CiCircleInfo size={18} className={styles.noticeIcon} />
        <div>
          <p className={styles.noticeTitle}>Read-only information</p>
          <p className={styles.noticeText}>
            To update your personal details, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
