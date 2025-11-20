import React from "react";
import "./Login.css";
import mac from "../../assets/mac.png";
import { Loader, Purple } from "../../components";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import { useGlobalContext } from "../../context/context";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(14).required(),
});

const Login = () => {
  const [loginLoading, setLoginLoading] = useState(false);
  const [checked, setChecked] = useState(true);
  const { baseUrl, setHeaderNav, loading } = useGlobalContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const handleLoginForm = async (data) => {
    if (checked) {
      setLoginLoading(true);
      try {
        const response = await axios.post(`${baseUrl}/api/auth/login`, data);

        if (response.status === 200) {
          setLoginLoading(false);

          sessionStorage.setItem("user", JSON.stringify(response.data));
          sessionStorage.setItem(
            "userToken",
            JSON.stringify(response.data.accessToken)
          );
          toast.success("User Login Verified");
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        }
      } catch (error) {
        setLoginLoading(false);
        if (error.response.data === "Wrong credentials") {
          toast.error("Wrong credentials");
        }
      }
    } else {
      toast.error("Please Verify if you are not a Robot");
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <section className="login flex">
      <div className="login-image-container">
        <img src={mac} alt="mac" />
        <h1 className="sub-header-text">All in One Transfer Solution</h1>
        <p className="sub-p">
          Transfer Funds Across All Country in Minutes and Our Transfer is
          instant
        </p>
      </div>
      <div className="login-form-container">
        <h1 className="sub-header-text diff">Login Account</h1>
        <p className="sub-p">
          Fill the form below to login to your Wealth Wise account.
        </p>

        {/*User Login Form */}

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
            <p className="error">{errors.email?.message}</p>
          </div>
          <div>
            <h3>Password</h3>
            <input
              type="password"
              placeholder="Your Password"
              {...register("password", { required: true })}
            />
            <p className="error">{errors.password?.message}</p>
          </div>

          <Purple title={loginLoading ? "loading..." : "Login"} />
          <p className="sub-p dont">
            Don't have an Account?
            <span
              onClick={() => {
                setHeaderNav(false);
                navigate("/register");
              }}
            >
              Sign up
            </span>
          </p>
          <p className="sub-p dont forget_pass">
            <span
              onClick={() => {
                navigate("/forget-password");
              }}
            >
              Forget Password?
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
