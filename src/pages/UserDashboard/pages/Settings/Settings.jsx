import React from "react";
import "./Settings.css";
import { SemiHeader, UserFooter } from "../../components";
import { TbMathGreater } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  return (
    <section className="user_settings">
      <SemiHeader title={"Your Settings"} />
      <div className="user_settings_main ">
        <p className="sub-p">Profile Settings</p>
        <div
          className="user_profile_details"
          onClick={() => {
            navigate("/dash/settings/update_details");
          }}
        >
          <div className="flex">
            <h3>Change Username or Address</h3>
            <TbMathGreater />
          </div>
        </div>
        <p className="sub-p">Security</p>
        <div
          className="user_profile_details"
          onClick={() => {
            navigate("/dash/settings/edit_password");
          }}
        >
          <div className="flex">
            <h3>Update Password </h3>
            <TbMathGreater />
          </div>
        </div>
      </div>
      <UserFooter />
    </section>
  );
};

export default Settings;
