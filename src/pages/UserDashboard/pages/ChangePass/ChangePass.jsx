import React from "react";
import "./ChangePass.css";
import { SemiHeader, UserFooter } from "../../components";
import { Button } from "../../../../components";

const ChangePass = () => {
  return (
    <section className="change_pass">
      <SemiHeader title={"Change Password"} />
      <div className="kyc-verification">
        <p className="sub-p input-p">Old Password</p>
        <input type="text" placeholder="Old Password" />
        <p className="sub-p input-p">New Password</p>
        <input type="text" placeholder="New Password" />
        <p className="sub-p input-p">Confirm Password</p>
        <input type="text" placeholder="Confirm Password" />
        <Button title="Update" />
      </div>
      <UserFooter />
    </section>
  );
};

export default ChangePass;
