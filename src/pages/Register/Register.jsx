import React, { useEffect, useMemo, useState } from "react";
import { useGlobalContext } from "../../context/context";
import { Footer, Contact, Loader } from "../../components";
import "./Register.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import countryList from "react-select-country-list";
import Select from "react-select";

const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  userName: yup.string().required("Username is required"),
  zipCode: yup.string().required("Zip code is required"),
  address: yup.string().required("Address is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  password: yup.string().min(6).max(14).required("Password is required"),
  confirmpassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Register = () => {
  const [country, setCountry] = useState("");
  const options = useMemo(() => countryList().getData(), []);
  const { loading, baseUrl } = useGlobalContext();
  const navigate = useNavigate();
  const [registerLoading, setRegisterLoading] = useState(false);
  const [accNum, setAccNum] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    setAccNum(
      `${Math.floor(100000000 + Math.random() * 900000000)}${
        Math.floor(11 + Math.random() * 10) % 10
      }`
    );
  }, []);

  const handleRegisterForm = async (data) => {
    setRegisterLoading(true);
    data.accountNum = accNum;
    data.country = country?.label || "";
    data.profileImage = [];

    try {
      const response = await axios.post(`${baseUrl}/api/auth/register`, data);
      if (response.status === 201) {
        setRegisterLoading(false);
        toast.success("Registration successful! Redirecting to login…");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      if (error?.response?.data?.keyPattern?.email === 1) {
        toast.error("An account with this email already exists.");
      } else {
        toast.error("Registration failed. Please try again.");
      }
      setRegisterLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="register-page">
        {/* Hero */}
        <div className="register-hero">
          <h1 className="register-hero-title">Create Your Account</h1>
          <p className="register-hero-sub">
            Join over a million customers banking with Wealth Wise
          </p>
        </div>

        {/* Form card */}
        <div className="register-body">
          <div className="register-card">
            <div className="register-card-header">
              <span className="register-card-eyebrow">Get started</span>
              <h2 className="register-card-title">Personal Information</h2>
              <p className="register-card-sub">All fields are required.</p>
            </div>

            <form
              className="register-form-grid"
              onSubmit={handleSubmit(handleRegisterForm)}
            >
              {/* First Name */}
              <div className="reg-field">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="field-error">{errors.firstName.message}</p>
                )}
              </div>

              {/* Last Name */}
              <div className="reg-field">
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="field-error">{errors.lastName.message}</p>
                )}
              </div>

              {/* Username */}
              <div className="reg-field">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="johndoe"
                  {...register("userName")}
                />
                {errors.userName && (
                  <p className="field-error">{errors.userName.message}</p>
                )}
              </div>

              {/* Phone */}
              <div className="reg-field">
                <label>Phone Number</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="field-error">{errors.phone.message}</p>
                )}
              </div>

              {/* Country */}
              <div className="reg-field">
                <label>Country of Residence</label>
                <Select
                  options={options}
                  value={country}
                  onChange={setCountry}
                  placeholder="Select country…"
                />
              </div>

              {/* Zip Code */}
              <div className="reg-field">
                <label>Zip / Postal Code</label>
                <input
                  type="text"
                  placeholder="90210"
                  {...register("zipCode")}
                />
                {errors.zipCode && (
                  <p className="field-error">{errors.zipCode.message}</p>
                )}
              </div>

              {/* Address */}
              <div className="reg-field full-width">
                <label>Home Address</label>
                <input
                  type="text"
                  placeholder="123 Main St, City, State"
                  {...register("address")}
                />
                {errors.address && (
                  <p className="field-error">{errors.address.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="reg-field full-width">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="field-error">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="reg-field">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Min. 6 characters"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="field-error">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="reg-field">
                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="Re-enter password"
                  {...register("confirmpassword")}
                />
                {errors.confirmpassword && (
                  <p className="field-error">{errors.confirmpassword.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="register-submit-btn"
                disabled={registerLoading}
              >
                {registerLoading ? "Creating account…" : "Create Account"}
              </button>

              <p className="register-login-link">
                Already have an account?{" "}
                <span onClick={() => navigate("/login")}>Sign in</span>
              </p>
            </form>
          </div>
        </div>

        <Footer />
        <Contact />
      </div>
    </>
  );
};

export default Register;
