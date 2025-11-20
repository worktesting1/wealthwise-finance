import { useState, useRef } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FiUploadCloud } from "react-icons/fi";

import styles from "./ProfilePictureModal.module.css";
import { MdClose } from "react-icons/md";

const ProfilePictureModal = ({ isOpen, onClose, onSubmit, loader }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      onSubmit(selectedFile);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>Upload Profile Picture</h3>
            <button className={styles.closeButton} onClick={onClose}>
              <MdClose size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles.uploadContainer}>
              <label className={styles.uploadLabel}>
                Select New Profile Picture
              </label>
              <div className={styles.uploadBox} onClick={triggerFileInput}>
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className={styles.preview_image}
                  />
                ) : (
                  <>
                    <FiUploadCloud className={styles.uploadIcon} />
                    <p className={styles.uploadText}>
                      <span className={styles.uploadTextBold}>
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className={styles.uploadSubtext}>
                      PNG, JPG or JPEG (MAX. 2MB)
                    </p>
                  </>
                )}
                <input
                  id="photo-upload"
                  type="file"
                  ref={fileInputRef}
                  className={styles.fileInput}
                  onChange={handleFileChange}
                  accept="image/png, image/jpeg, image/jpg"
                  required
                />
              </div>
            </div>

            <div className="pt-3">
              <button type="submit" className={styles.submitButton}>
                <IoCloudUploadOutline className={styles.submitIcon} size={20} />
                {loader ? "Uploading..." : "Upload Profile Picture"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePictureModal;
