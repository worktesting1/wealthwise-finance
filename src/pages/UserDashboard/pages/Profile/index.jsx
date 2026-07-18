import React, { useEffect, useState } from "react";
import "./styles.css";
import { useGlobalContext } from "../../../../context/context";
import ProfilePictureModal from "./ProfilePictureModal";
import ProfileHeader from "./ProfileHeader";
import ProfileNavigation from "./ProfileNavigation";
import HelpCard from "./HelperCard";
import ProfileInformation from "./ProfileInformation";
import SecurityPanel from "./SecurityPanel";
import axios from "axios";
import { toast } from "react-toastify";
import DesktopHeader from "../../components/DesktopHeader";
import Sidebar from "../../components/Sidbar";

const ProfileContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [activeTab, setActiveTab] = useState("info");

  const { getUser, userDetails, baseUrl } = useGlobalContext();
  const accessToken = JSON.parse(sessionStorage.getItem("userToken"));
  const {
    firstName,
    lastName,
    accountNum,
    _id,
    profileImage: profile,
  } = JSON.parse(sessionStorage.getItem("user")) || userDetails || {};

  const handleUpload = (file) => {
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);

    const formData = new FormData();
    formData.append("profileImage", file);
    setLoader(true);
    axios
      .put(`${baseUrl}/api/users/user/profile/${_id}`, formData, {
        headers: { token: accessToken },
      })
      .then(() => {
        setLoader(false);
        toast.success("Profile image updated");
        getUser(accessToken, _id);
        setTimeout(() => setIsModalOpen(false), 2000);
      })
      .catch(() => {
        setLoader(false);
        toast.error("Profile image upload failed");
      });
  };

  const userProfile =
    profile?.length === 1
      ? profile[0]?.url
      : profileImage ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          `${firstName} ${lastName}`
        )}&background=1e3a5f&color=fff&size=128`;

  return (
    <section className="user_profile_wrapper">
      {/* Avatar / identity card */}
      <ProfileHeader
        profileImage={userProfile}
        accountNumber={accountNum}
        name={`${firstName} ${lastName}`}
        onEditClick={() => setIsModalOpen(true)}
      />

      {/* Tab switcher */}
      <ProfileNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Tab content */}
      {activeTab === "info" && <ProfileInformation />}
      {activeTab === "security" && <SecurityPanel />}

      {/* Help card */}
      <HelpCard />

      {/* Avatar upload modal */}
      <ProfilePictureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleUpload}
        loader={loader}
      />
    </section>
  );
};

const Profile = () => {
  const user = JSON.parse(sessionStorage.getItem("user")) || {};
  const token = JSON.parse(sessionStorage.getItem("userToken"));
  const _id = user._id;
  const {
    getUserWithdrawals,
    getTotalBalance,
    getKYC,
    getUser,
    getAllDeposits,
    getAllLoans,
  } = useGlobalContext();

  useEffect(() => {
    if (!_id || !token) return;
    getUserWithdrawals(token, _id);
    getUser(token, _id);
    getTotalBalance(_id, token);
    getKYC(token, _id);
    getAllDeposits(token, _id);
    getAllLoans(token, _id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Mobile layout */}
      <div className="bank_dashbaord">
        <ProfileContent />
      </div>
      {/* Desktop layout */}
      <div className="bank_desktop_dashboard">
        <Sidebar />
        <div className="bank_desktop_dashboard_body">
          <DesktopHeader />
          <ProfileContent />
        </div>
      </div>
    </>
  );
};

export default Profile;
