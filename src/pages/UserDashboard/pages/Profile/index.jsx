import React, { useEffect, useState } from "react";
import "./styles.css";
import { useGlobalContext } from "../../../../context/context";
import ProfilePictureModal from "./ProfilePictureModal";
import ProfileHeader from "./ProfileHeader";
import ProfileNavigation from "./ProfileNavigation";
import HelpCard from "./HelperCard";
import ProfileInformation from "./ProfileInformation";
import axios from "axios";
import { toast } from "react-toastify";
import DesktopHeader from "../../components/DesktopHeader";
import Sidebar from "../../components/Sidbar";

const ProfileCotent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://fwiseb.online/storage/app/public/photos/X1hQX7splash-2048x2732.png1745340280"
  );

  const { getUser, userDetails, baseUrl } = useGlobalContext();
  const accessToken = JSON.parse(sessionStorage.getItem("userToken"));
  const {
    firstName,
    lastName,
    accountNum,
    _id,
    profileImage: profile,
  } = JSON.parse(sessionStorage.getItem("user")) || userDetails;

  const handleUpload = (file) => {
    // Here you would typically upload the file to your server
    // For demo purposes, we'll just create a local URL
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);

    const formData = new FormData();
    formData.append("profileImage", file);
    setLoader(true);
    axios
      .put(`${baseUrl}/api/users/user/profile/${_id}`, formData, {
        headers: { token: accessToken },
      })
      .then((response) => {
        setLoader(false);
        toast.success("Profile Image Uploaded");
        getUser(accessToken, _id);
        setTimeout(() => {
          setIsModalOpen(false);
        }, 2000);
      })
      .catch((error) => {
        setLoader(false);
        toast.error("Profile Image Upload Failed");
      });
  };

  const userProfile = profile?.length === 1 ? profile[0]?.url : profileImage;

  return (
    <section className="user_profile_wrapper">
      <h1 className="text-gray-900 text-xl font-bold">Account Settings</h1>

      <ProfileHeader
        profileImage={userProfile}
        accountNumber={accountNum}
        name={`${firstName} ${lastName}`}
        onEditClick={() => setIsModalOpen(true)}
      />
      <ProfileNavigation />
      <HelpCard />
      <ProfileInformation />
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
  const user = JSON.parse(sessionStorage.getItem("user"));
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
    getUserWithdrawals(token, _id);
    getUser(token, _id);
    getTotalBalance(_id, token);
    getKYC(token, _id);
    getAllDeposits(token, _id);
    getAllLoans(token, _id);
  }, []);
  return (
    <>
      <div className="bank_dashbaord">
        <ProfileCotent />
      </div>
      <div className="bank_desktop_dashboard">
        <Sidebar />
        <div className="bank_desktop_dashboard_body">
          <DesktopHeader />
          <ProfileCotent />
        </div>
      </div>
    </>
  );
};

export default Profile;
