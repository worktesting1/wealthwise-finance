import React, { useState } from "react";
import "./styles.css";
import { useGlobalContext } from "../../../../context/context";
import axios from "axios";
import { toast } from "react-toastify";
import { ColorRing } from "react-loader-spinner";

const FileUpload = ({ id, onChange, file, progress, error, accept }) => {
  return (
    <div className={`file-upload ${error ? "error" : ""}`}>
      <label htmlFor={id}>
        <div className="upload-area">
          {file ? (
            <div className="file-preview">
              <div className="file-info">
                <span className="file-name">{file.name}</span>
                <span className="file-size">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </span>
              </div>
              {progress < 100 ? (
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              ) : (
                <div className="upload-complete">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  Upload Complete
                </div>
              )}
            </div>
          ) : (
            <div className="upload-prompt">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
              <span>Click to browse or drag and drop</span>
              <span className="file-types">JPG, PNG, or PDF (Max 5MB)</span>
            </div>
          )}
        </div>
        <input
          type="file"
          id={id}
          onChange={onChange}
          accept={accept}
          style={{ display: "none" }}
        />
      </label>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

const KYCUploadModal = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    idName: "",
    idNumber: "",
    idFront: null,
    idBack: null,
  });
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [errors, setErrors] = useState({});
  const { setShowPendingModal, setShowKYCModal, baseUrl, getKYC } =
    useGlobalContext();
  const accessToken = JSON.parse(sessionStorage.getItem("userToken"));
  const { _id, email, firstName } = JSON.parse(sessionStorage.getItem("user"));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleFileChange = (field, e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Validate file type and size
    const validTypes = ["image/jpeg", "image/png", "application/pdf"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(selectedFile.type)) {
      setErrors({ ...errors, [field]: "Only JPG, PNG, or PDF files allowed" });
      return;
    }

    if (selectedFile.size > maxSize) {
      setErrors({ ...errors, [field]: "File size exceeds 5MB limit" });
      return;
    }

    setFormData({ ...formData, [field]: selectedFile });
    setErrors({ ...errors, [field]: null });

    // Simulate upload progress
    simulateUpload(field);
  };

  const simulateUpload = (field) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      setUploadProgress({ ...uploadProgress, [field]: progress });
    }, 200);
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate ID tab

    if (!formData.idName.trim()) {
      newErrors.idName = "ID name is required";
    }

    if (!formData.idNumber.trim()) {
      newErrors.idNumber = "ID number is required";
    } else if (!/^[a-zA-Z0-9]{6,20}$/.test(formData.idNumber)) {
      newErrors.idNumber = "ID number must be 6-20 alphanumeric characters";
    }

    if (!formData.idFront) {
      newErrors.idFront = "Front side of your ID is required";
    }

    if (!formData.idBack) {
      newErrors.idBack = "Back side of your ID is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // If all validations pass and we have all documents
    handleKYCSubmit(formData);
  };

  const handleKYCSubmit = (files) => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("idNumber", files.idNumber);
    formData.append("idName", files.idName);
    formData.append("front", files.idFront);
    formData.append("back", files.idBack);
    formData.append("email", email);
    formData.append("name", firstName);

    setLoading(true);
    axios
      .post(`${baseUrl}/api/kyc`, formData, {
        headers: { token: accessToken },
      })
      .then((response) => {
        toast.success("KYC Details Uploaded");
        setShowKYCModal(false);
        setLoading(false);
        getKYC(accessToken, _id);
        setShowPendingModal(true);
      })
      .catch((error) => {
        setLoading(false);
        const msg =
          error?.response?.data?.message ||
          error?.response?.data ||
          "KYC submission failed. Please try again.";
        toast.error(typeof msg === "string" ? msg : "KYC submission failed. Please try again.");
      });

    // Handle file upload to your backend here
  };

  if (!show) return null;

  return (
    <div className="kyc-modal-overlay">
      <div className="kyc-modal">
        <button className="close-button" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>

        <div className="kyc-header">
          <h2>Complete KYC Verification</h2>
          <p>Upload required documents to verify your identity</p>
        </div>

        <form onSubmit={handleSubmit} className="kyc-form">
          <div className="document-upload">
            <div className="id-details">
              <div className="form-group">
                <label htmlFor="idName">ID Type</label>
                <select
                  id="idName"
                  name="idName"
                  value={formData.idName}
                  onChange={handleInputChange}
                  className={errors.idName ? "error" : ""}
                >
                  <option value="">Select ID Type</option>
                  <option value="Passport">Passport</option>
                  <option value="Driver License">Driver License</option>
                  <option value="National ID">National ID</option>
                  <option value="Residence Permit">Residence Permit</option>
                </select>
                {errors.idName && (
                  <div className="error-message">{errors.idName}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="idNumber">ID Number</label>
                <input
                  type="text"
                  id="idNumber"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your ID number"
                  className={errors.idNumber ? "error" : ""}
                />
                {errors.idNumber && (
                  <div className="error-message">{errors.idNumber}</div>
                )}
              </div>
            </div>

            <div className="upload-section">
              <h3>Front of ID</h3>
              <FileUpload
                id="idFront"
                onChange={(e) => handleFileChange("idFront", e)}
                file={formData.idFront}
                progress={uploadProgress.idFront}
                error={errors.idFront}
                accept="image/*,.pdf"
              />
              <p className="hint-text">
                Upload the front side of your government-issued ID
              </p>
            </div>

            <div className="upload-section">
              <h3>Back of ID</h3>
              <FileUpload
                id="idBack"
                onChange={(e) => handleFileChange("idBack", e)}
                file={formData.idBack}
                progress={uploadProgress.idBack}
                error={errors.idBack}
                accept="image/*,.pdf"
              />
              <p className="hint-text">
                Upload the back side of your government-issued ID
              </p>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">
              {loading ? (
                <>
                  <ColorRing
                    visible={true}
                    height="37"
                    width="37"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
                  />
                  <span>Proccesing...</span>
                </>
              ) : (
                "Submit Documents"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KYCUploadModal;
