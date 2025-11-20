import "./verify-email.css";
import emailImg from "../../assets/email.png";
import logo from "../../assets/Logo-black.svg";
import { Link } from "react-router-dom";

const VerifyEmail = () => {
  return (
    <main className="verify-email-page">
      <Link to="/login" className="logo">
        <img src={logo} alt="company logo" />
      </Link>
      <div className="content">
        <img src={emailImg} alt="verify your account" />
        <h4>
          Thank you for signing up for our services. Before we can activate your
          account, we need to verify your email address.
        </h4>
      </div>
    </main>
  );
};

export default VerifyEmail;
