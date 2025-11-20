import { useState } from "react";
import styles from "./styles.module.css";
import { FaHashtag, FaPhoneAlt, FaCopy } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { CiCalendar, CiLocationOn, CiCircleInfo, CiUser } from "react-icons/ci";

const ProfileInformation = () => {
  const [copied, setCopied] = useState(false);
  const { firstName, lastName, accountNum, country, email, phone } = JSON.parse(
    sessionStorage.getItem("user")
  );

  const copyToClipboard = () => {
    navigator.clipboard.writeText("0942849799").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            <CiUser className={styles.titleIcon} size={20} />
            Profile Information
          </h2>
          <p className={styles.subtitle}>
            Your personal information and account details
          </p>
        </div>

        {/* Form Content */}
        <div className={styles.content}>
          <form>
            {/* Name Fields */}
            <div className={styles.formGrid}>
              {/* First Name */}
              <div className={styles.formGroup}>
                <label className={styles.label}>First Name</label>
                <div className={styles.inputContainer}>
                  <div className={styles.inputIcon}>
                    <CiUser size={20} />
                  </div>
                  <input
                    type="text"
                    className={styles.input}
                    value={firstName}
                    readOnly
                  />
                </div>
              </div>

              {/* Last Name */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Last Name</label>
                <div className={styles.inputContainer}>
                  <div className={styles.inputIcon}>
                    <CiUser size={20} />
                  </div>
                  <input
                    type="text"
                    className={styles.input}
                    value={lastName}
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Account Number */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Account Number</label>
              <div className={styles.inputContainer}>
                <div className={styles.inputIcon}>
                  <FaHashtag size={20} />
                </div>
                <input
                  type="text"
                  className={styles.input}
                  value={accountNum}
                  readOnly
                />
                <button
                  type="button"
                  className={styles.copyButton}
                  onClick={copyToClipboard}
                  title="Copy to clipboard"
                >
                  <FaCopy size={20} />
                </button>
              </div>
              <p className={styles.helperText}>
                {copied
                  ? "Copied to clipboard!"
                  : "This is your unique account identifier"}
              </p>
            </div>

            {/* Email */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Email Address</label>
              <div className={styles.inputContainer}>
                <div className={styles.inputIcon}>
                  <MdOutlineEmail size={20} />
                </div>
                <input
                  type="email"
                  className={styles.input}
                  value={email}
                  readOnly
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Date of Birth</label>
              <div className={styles.inputContainer}>
                <div className={styles.inputIcon}>
                  <CiCalendar size={20} />
                </div>
                <input
                  type="date"
                  className={styles.input}
                  value="2025-04-04"
                  readOnly
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Phone Number</label>
              <div className={styles.inputContainer}>
                <div className={styles.inputIcon}>
                  <FaPhoneAlt size={20} />
                </div>
                <input
                  type="tel"
                  className={styles.input}
                  value={phone}
                  readOnly
                />
              </div>
            </div>

            {/* Address */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Address</label>
              <div className={styles.inputContainer}>
                <div
                  className={styles.inputIcon}
                  style={{ alignItems: "flex-start", paddingTop: "0.75rem" }}
                >
                  <CiLocationOn size={20} />
                </div>
                <textarea
                  className={`${styles.input} ${styles.textarea}`}
                  value={country}
                  readOnly
                  rows={3}
                />
              </div>
            </div>

            {/* Info Card */}
            <div className={styles.infoCard}>
              <CiCircleInfo className={styles.infoIcon} size={20} />
              <div>
                <h3 className={styles.infoTitle}>Account Information</h3>
                <p className={styles.infoText}>
                  To update your personal information, please contact our
                  customer support team with your request.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
