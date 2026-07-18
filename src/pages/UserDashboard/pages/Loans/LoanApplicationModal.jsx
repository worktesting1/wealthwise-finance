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
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!formData.loanType)                              e.loanType = "Select a loan type";
    if (!formData.amount || isNaN(formData.amount))      e.amount = "Enter a valid amount";
    if (!formData.term)                                  e.term = "Select a loan term";
    if (!formData.firstName)                             e.firstName = "Required";
    if (!formData.lastName)                              e.lastName = "Required";
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) e.email = "Valid email required";
    if (!formData.phone)                                 e.phone = "Required";
    if (!formData.income || isNaN(formData.income))      e.income = "Enter a valid income";
    if (!formData.employmentStatus)                      e.employmentStatus = "Required";
    if (!formData.dob)                                   e.dob = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modalContainer}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <div>
            <div className={styles.modalTitle}>Loan Application</div>
            <div className={styles.modalSubtitle}>Fill in the details below to apply</div>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <MdClose size={18} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.modalBody}>
          <form onSubmit={handleSubmit}>

            <p className={styles.sectionTitle}>Loan Details</p>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Loan Type</label>
              <select name="loanType" value={formData.loanType} onChange={handleChange}
                className={`${styles.formInput} ${styles.formSelect}`}>
                <option value="">Select loan type</option>
                <option value="personal">Personal Loan</option>
                <option value="home">Home Loan</option>
                <option value="auto">Auto Loan</option>
                <option value="business">Business Loan</option>
                <option value="joint">Joint Mortgage</option>
                <option value="health">Health Finance</option>
              </select>
              {errors.loanType && <p className={styles.errorMessage}>{errors.loanType}</p>}
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Loan Amount ($)</label>
                <input type="text" name="amount" value={formData.amount} onChange={handleChange}
                  className={styles.formInput} placeholder="e.g. 10,000" />
                {errors.amount && <p className={styles.errorMessage}>{errors.amount}</p>}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Loan Term</label>
                <select name="term" value={formData.term} onChange={handleChange}
                  className={`${styles.formInput} ${styles.formSelect}`}>
                  <option value="">Select term</option>
                  <option value="12">12 months</option>
                  <option value="24">24 months</option>
                  <option value="36">36 months</option>
                  <option value="60">60 months</option>
                </select>
                {errors.term && <p className={styles.errorMessage}>{errors.term}</p>}
              </div>
            </div>

            <p className={styles.sectionTitle}>Personal Information</p>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}
                  className={styles.formInput} placeholder="John" />
                {errors.firstName && <p className={styles.errorMessage}>{errors.firstName}</p>}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}
                  className={styles.formInput} placeholder="Doe" />
                {errors.lastName && <p className={styles.errorMessage}>{errors.lastName}</p>}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange}
                className={styles.formInput} placeholder="you@example.com" />
              {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                  className={styles.formInput} placeholder="+1 234 567 8900" />
                {errors.phone && <p className={styles.errorMessage}>{errors.phone}</p>}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Date of Birth</label>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange}
                  className={styles.formInput} />
                {errors.dob && <p className={styles.errorMessage}>{errors.dob}</p>}
              </div>
            </div>

            <p className={styles.sectionTitle}>Financial Information</p>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Annual Income ($)</label>
                <input type="text" name="income" value={formData.income} onChange={handleChange}
                  className={styles.formInput} placeholder="e.g. 50,000" />
                {errors.income && <p className={styles.errorMessage}>{errors.income}</p>}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Employment Status</label>
                <select name="employmentStatus" value={formData.employmentStatus} onChange={handleChange}
                  className={`${styles.formInput} ${styles.formSelect}`}>
                  <option value="">Select status</option>
                  <option value="employed">Employed</option>
                  <option value="self-employed">Self-Employed</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="retired">Retired</option>
                </select>
                {errors.employmentStatus && <p className={styles.errorMessage}>{errors.employmentStatus}</p>}
              </div>
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className={styles.formFooter}>
          <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
          <button className={styles.submitButton} onClick={handleSubmit} disabled={loading}>
            {loading ? "Processing…" : "Submit Application"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanApplicationModal;
