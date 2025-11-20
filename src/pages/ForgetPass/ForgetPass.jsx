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
import { Link } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const ForgetPass = () => {
  const [loading, setLoading] = useState(false);
  const { baseUrl } = useGlobalContext();
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLoginForm = async (data) => {
    setLoading(true);
    try {
      const resetPassword = await axios.post(`${baseUrl}/api/auth/forget`, {
        email: data.email,
      });
      if (resetPassword.status === 200) {
        toast.success("Forget Password Link Successfully Sent to Your Email");
        setLoading(false);
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
        <h1 className="sub-header-text diff">Enter Email To Reset Password</h1>
        <p className="sub-p">
          Fill the form below to reset your Wealth Wise account Password.
        </p>

        {/*User Reset Password Form */}

        <form
          className="login-form"
          onSubmit={handleSubmit((data) => handleLoginForm(data))}
        >
          <div>
            <h3>Email</h3>
            <input
              type="email"
              placeholder="Your Email"
              {...register("email", { required: true })}
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

export default ForgetPass;
