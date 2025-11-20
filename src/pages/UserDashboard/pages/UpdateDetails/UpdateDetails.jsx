import React, { useState } from "react";
import "./UpdateDetails.css";
import { UserFooter, SemiHeader } from "../../components";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useGlobalContext } from "../../../../context/context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const UpdateDetails = () => {
  const { baseUrl } = useGlobalContext();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const accessToken = JSON.parse(sessionStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const {
    _id,
    userName,
    email,
    country,
    fullname,
    phone,
    dob,
    address,
    city,
    gender,
    age,
    maritalstatus,
    firstName,
    lastName,
  } = user;
  const { handleSubmit, register } = useForm();

  const navigate = useNavigate();

  const handleUpdate = async (data) => {
    setLoading(true);
    data.dob = data.dob ? data.dob : dob;
    data.city = data.city ? data.city : city;
    data.address = data.address ? data.address : address;
    data.gender = data.gender ? data.gender : gender;
    data.age = data.age ? data.age : age;

    data.userName = userName;
    data.email = email;
    data.country = country;
    data.fullname = fullname;
    data.phone = phone;

    try {
      const updateUser = await axios.put(`${baseUrl}/api/users/${_id}`, data, {
        headers: { token: accessToken },
      });
      if (updateUser.status === 200) {
        setLoading(false);
        toast.success("User Profile Updated");
        setTimeout(() => {
          navigate("/dash/profile");
        }, 2000);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Fail to Update User Data");
    }
  };

  return (
    <section className="user_update_details">
      <SemiHeader title={"Update Details"} />
      <div className="kyc-verification">
        <p className="sub-p input-p">{firstName}</p>
        <p className="sub-p input-p">{lastName}</p>
        <input
          type="text"
          placeholder="City"
          {...register("city")}
          defaultValue={city}
        />
        <p className="sub-p input-p">Gender</p>
        <input
          type="text"
          placeholder="Male or Female"
          {...register("gender")}
          defaultValue={gender}
        />
        <p className="sub-p input-p">Date of Birth</p>
        <input
          defaultValue={dob}
          type="text"
          placeholder="Seperate my forward slash"
          {...register("dob")}
        />
        <p className="sub-p input-p">Marital Status</p>
        <input
          defaultValue={maritalstatus}
          type="text"
          placeholder="Marital Status"
          {...register("maritalstatus")}
        />
        <p className="sub-p input-p">Age</p>
        <input
          type="text"
          placeholder="Age"
          {...register("age")}
          defaultValue={age}
        />
        <input
          type="text"
          placeholder="Address"
          {...register("address")}
          defaultValue={address}
        />
        <button
          className="btn"
          onClick={handleSubmit((data) => handleUpdate(data))}
        >
          {loading ? "Loading..." : "Update Details"}
        </button>
      </div>
      <UserFooter />
    </section>
  );
};

export default UpdateDetails;
