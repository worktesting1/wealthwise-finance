import React, { useEffect } from "react";
import { CiMenuFries } from "react-icons/ci";
import logo from "../../../../assets/Logo-black.svg";
import avatarFallback from "../../../../assets/mobilewealth.png";
import { useGlobalContext } from "../../../../context/context";

function DashboardHeader() {
  const { setIsMenuOpen, userDetails, getUser } = useGlobalContext();
  const { profileImage, _id } =
    JSON.parse(sessionStorage.getItem("user")) || userDetails || {};
  const token = JSON.parse(sessionStorage.getItem("userToken"));

  useEffect(() => {
    getUser(token, _id);
  }, []);
  return (
    <div className="dashbaord_header">
      <div style={{ width: "10%" }}>
        <CiMenuFries
          onClick={() => setIsMenuOpen(true)}
          size={22}
          color=""
          cursor="pointer"
        />
      </div>
      <div className="dashboard_logo_sect">
        <img src={logo} alt="Wealth Wise Logo" />
        <div className="dashboard_profile">
          <img
            src={profileImage?.length === 1 ? profileImage[0]?.url : avatarFallback}
            alt="profile picture"
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
