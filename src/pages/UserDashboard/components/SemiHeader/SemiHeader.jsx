import React from "react";
import { FaLessThan } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../../context/context";

const SemiHeader = ({ title }) => {
  const navigate = useNavigate();
  const { setUserNav } = useGlobalContext();
  return (
    <div className="kyc-header">
      <div className="flex">
        <FaLessThan
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/dash/dashboard");
            setUserNav(false);
          }}
        />
        <p className="sub-p" style={{ color: "white" }}>
          {title}
        </p>
      </div>
    </div>
  );
};

export default SemiHeader;
