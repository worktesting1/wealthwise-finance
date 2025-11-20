import React, { useEffect, useMemo } from "react";
import { useGlobalContext } from "../../context/context";
import {
  Button,
  Contact,
  Footer,
  Header,
  Hero,
  Loader,
} from "../../components";
import "./Register.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import countryList from "react-select-country-list";
import Select from "react-select";

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  userName: yup.string().required(),
  zipCode: yup.string().required(),
  address: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  password: yup.string().min(6).max(14).required(),
  confirmpassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password"), null], "Password must matched"),
});

const Register = () => {
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const { loading, baseUrl } = useGlobalContext();
  const navigate = useNavigate();
  const [RegisterLoading, setRegisterLoading] = useState(false);
  const [accNum, setAccNum] = useState(``);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleRegisterForm = async (data) => {
    setRegisterLoading(true);
    data.accountNum = accNum;
    data.country = value.label;
    data.profileImage = [];

    try {
      const response = await axios.post(`${baseUrl}/api/auth/register`, data);

      if (response.status === 201) {
        setRegisterLoading(false);
        toast.success("Registration Successful");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      if (error?.response?.data?.keyPattern?.email === 1) {
        toast.error("User Already Exist");
      }
      setRegisterLoading(false);
    }
  };

  const changeHandler = (value) => {
    setValue(value);
  };

  useEffect(() => {
    setAccNum(
      `${Math.floor(100000000 + Math.random() * 900000000)}${
        Math.floor(11 + Math.random() * 10) % 10
      }`
    );
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <section>
      <Header />
      <Hero title={"Register Your Account Now"} />
      <section className="register-container">
        <div>
          <h1 className="sub-header-text">Signup</h1>
          <p className="sub-p">Please note that all fields are required.</p>
          {/*User Register form */}
          <form
            className="register-form"
            onSubmit={handleSubmit((data) => handleRegisterForm(data))}
          >
            <div>
              <p className="sub-p">First Name</p>
              <input
                type="text"
                placeholder="First Name"
                {...register("firstName", { required: true })}
              />
              <h4 className="error">{errors.firstName?.message}</h4>
            </div>
            <div>
              <p className="sub-p">Last Name</p>
              <input
                type="text"
                placeholder="Last Name"
                {...register("lastName", { required: true })}
              />
              <h4 className="error">{errors.lastName?.message}</h4>
            </div>
            <div>
              <p className="sub-p">User Name</p>
              <input
                type="text"
                placeholder="User Name"
                {...register("userName", { required: true })}
              />
              <h4 className="error">{errors.userName?.message}</h4>
            </div>
            <div>
              <p className="sub-p">Country of Resident</p>
              <Select
                options={options}
                value={value}
                onChange={changeHandler}
              />
            </div>
            <div>
              <p className="sub-p">Zip Code</p>
              <input
                type="text"
                placeholder="Zip Code"
                {...register("zipCode", { required: true })}
              />
              <h4 className="error">{errors.zipCode?.message}</h4>
            </div>
            <div>
              <p className="sub-p">Address</p>
              <input
                type="text"
                placeholder="Address"
                {...register("address", { required: true })}
              />
              <h4 className="error">{errors.address?.message}</h4>
            </div>
            <div>
              <p className="sub-p">Email</p>
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              <h4 className="error">{errors.email?.message}</h4>
            </div>
            <div>
              <p className="sub-p">Password</p>
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              <h4 className="error">{errors.password?.message}</h4>
            </div>
            <div>
              <p className="sub-p">Confirm Password</p>
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmpassword", { required: true })}
              />
              <h4 className="error">{errors.confirmpassword?.message}</h4>
            </div>
            <div>
              <p className="sub-p">Phone Number</p>
              <input
                type="phone"
                placeholder="Phone Number"
                {...register("phone", { required: true })}
              />
              <h4 className="error">{errors.phone?.message}</h4>
            </div>
            <Button title={RegisterLoading ? "loading..." : "Submit"} />
          </form>
        </div>
      </section>
      <Footer />
      <Contact />
    </section>
  );
};

export default Register;
