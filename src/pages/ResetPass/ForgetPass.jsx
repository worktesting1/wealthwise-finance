import React, { useState } from "react";
import "./ForgetPass.css";
import mac from "../../assets/mac.png";
import { Purple } from "../../components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import { useGlobalContext } from "../../context/context";
import { ToastContainer, toast } from "react-toastify";
import { ColorRing } from "react-loader-spinner";
import { Link, useNavigate, useParams } from "react-router-dom";

const schema = yup.object().shape({
  password: yup.string().required(),
  confirmpassword: yup.string().required(),
});

const ResetPass = () => {
  const [loading, setLoading] = useState(false);
  const { baseUrl } = useGlobalContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLoginForm = async (data) => {
    data.resetToken = id;
    setLoading(true);
    try {
      const resetPassword = await axios.post(`${baseUrl}/api/auth/reset`, data);

      if (resetPassword.status === 200) {
        toast.success("Password Successfully Reset");
        setLoading(false);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      if (error.response.data === "Wrong credentials") {
        toast.error("Wrong credentials");
        setLoading(false);
      }
    }
  };

  return (
    <section className="login flex forget_pass">
      <div className="login-image-container">
        <img src={mac} alt="mac" />
        <h1 className="sub-header-text">All in One Transfer Solution</h1>
        <p className="sub-p">
          Transfer Funds Across All Country in Minutes and Our Transfer is
          instant
        </p>
      </div>
      <div className="login-form-container">
        <h1 className="sub-header-text diff">
          Enter Passwords To Reset Password
        </h1>
        <p className="sub-p">
          Fill the form below to reset your Wealth Wise account Password.
        </p>

        {/*User Reset Password Form */}

        <form
          className="login-form"
          onSubmit={handleSubmit((data) => handleLoginForm(data))}
        >
          <div>
            <h3>Password</h3>
            <input
              type="password"
              placeholder="Your Password"
              {...register("password", { required: true })}
            />
          </div>
          <div>
            <h3>Confirm Password</h3>
            <input
              type="password"
              placeholder="Your Confirm Password"
              {...register("confirmpassword", { required: true })}
            />
          </div>
          <Purple
            title={
              loading ? (
                <ColorRing
                  visible={true}
                  height="40"
                  width="40"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
                />
              ) : (
                "Reset"
              )
            }
          />
        </form>
        <Link to={"/login"} className="dont">
          <span>Login</span>
        </Link>
      </div>
    </section>
  );
};

export default ResetPass;
