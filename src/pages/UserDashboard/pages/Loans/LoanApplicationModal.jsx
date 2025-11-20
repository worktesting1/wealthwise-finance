import { useState } from "react";
import { MdClose } from "react-icons/md";

import styles from "./LoanApplication.module.css";

const LoanApplicationModal = ({ isOpen, onClose, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    loanType: "",
    amount: "",
    term: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    income: "",
    employmentStatus: "",
    dob: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.loanType) newErrors.loanType = "Please select a loan type";
    if (!formData.amount || isNaN(formData.amount))
      newErrors.amount = "Please enter a valid amount";
    if (!formData.term) newErrors.term = "Please select a loan term";
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.phone) newErrors.phone = "Please enter a valid phone number";
    if (!formData.income || isNaN(formData.income))
      newErrors.income = "Please enter a valid income";
    if (!formData.employmentStatus)
      newErrors.employmentStatus = "Please select employment status";
    if (!formData.dob) newErrors.dob = "Date of birth is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Loan Application</h3>
          <button className={styles.closeButton} onClick={onClose}>
            <MdClose size={20} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Loan Type</label>
              <select
                name="loanType"
                value={formData.loanType}
                onChange={handleChange}
                className={`${styles.formInput} ${styles.formSelect}`}
              >
                <option value="">Select loan type</option>
                <option value="personal">Personal Loan</option>
                <option value="home">Home Loan</option>
                <option value="auto">Auto Loan</option>
                <option value="business">Business Loan</option>
              </select>
              {errors.loanType && (
                <p className={styles.errorMessage}>{errors.loanType}</p>
              )}
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Loan Amount ($)</label>
                <input
                  type="text"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="10,000"
                />
                {errors.amount && (
                  <p className={styles.errorMessage}>{errors.amount}</p>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Loan Term</label>
                <select
                  name="term"
                  value={formData.term}
                  onChange={handleChange}
                  className={`${styles.formInput} ${styles.formSelect}`}
                >
                  <option value="">Select term</option>
                  <option value="12">12 months</option>
                  <option value="24">24 months</option>
                  <option value="36">36 months</option>
                  <option value="60">60 months</option>
                </select>
                {errors.term && (
                  <p className={styles.errorMessage}>{errors.term}</p>
                )}
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={styles.formInput}
                />
                {errors.firstName && (
                  <p className={styles.errorMessage}>{errors.firstName}</p>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={styles.formInput}
                />
                {errors.lastName && (
                  <p className={styles.errorMessage}>{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="example@email.com"
              />
              {errors.email && (
                <p className={styles.errorMessage}>{errors.email}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="1234567890"
              />
              {errors.phone && (
                <p className={styles.errorMessage}>{errors.phone}</p>
              )}
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Annual Income ($)</label>
                <input
                  type="text"
                  name="income"
                  value={formData.income}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="50,000"
                />
                {errors.income && (
                  <p className={styles.errorMessage}>{errors.income}</p>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Employment Status</label>
                <select
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleChange}
                  className={`${styles.formInput} ${styles.formSelect}`}
                >
                  <option value="">Select status</option>
                  <option value="employed">Employed</option>
                  <option value="self-employed">Self-Employed</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="retired">Retired</option>
                </select>
                {errors.employmentStatus && (
                  <p className={styles.errorMessage}>
                    {errors.employmentStatus}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className={styles.formInput}
              />
              {errors.dob && (
                <p className={styles.errorMessage}>{errors.dob}</p>
              )}
            </div>
          </form>
        </div>

        <div className={styles.formFooter}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.submitButton} onClick={handleSubmit}>
            {loading ? "Processing..." : "Submit Application"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanApplicationModal;
