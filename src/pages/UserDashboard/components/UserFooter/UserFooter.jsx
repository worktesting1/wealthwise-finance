import React from "react";
import "./UserFooter.css";
import { AiOutlineDashboard, AiOutlineSetting } from "react-icons/ai";
import { BsGrid, BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { RiLuggageDepositLine } from "react-icons/ri";

const UserFooter = () => {
  const navigate = useNavigate();
  return (
    <footer className="user-footer flex">
      <div
        className="flex"
        onClick={() => {
          navigate("/dash/dashboard");
        }}
      >
        <AiOutlineDashboard />
        <p>Dashboard</p>
      </div>
      <div
        className="flex"
        onClick={() => {
          navigate("/dash/deposit");
        }}
      >
        <RiLuggageDepositLine />
        <p>Deposit</p>
      </div>
      <div
        className="flex"
        onClick={() => {
          navigate("/dash/transactions");
        }}
      >
        <BsGrid />
        <p>Transaction</p>
      </div>
      <div
        className="flex"
        onClick={() => {
          navigate("/dash/transfer");
        }}
      >
        <BsArrowRight />
        <p>Transfer</p>
      </div>
      <div
        className="flex"
        onClick={() => {
          navigate("/dash/settings");
        }}
      >
        <AiOutlineSetting />
        <p>Settings</p>
      </div>
    </footer>
  );
};

export default UserFooter;
