import React from "react";
import "./Contacts.css";
import {
  Footer,
  Header,
  Loader,
  Hero,
  Purple,
  Contact,
} from "../../components";
import { useGlobalContext } from "../../context/context";
import { MdEmail } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import axios from "axios";

const Contacts = () => {
  const { loading, baseUrl } = useGlobalContext();
  const { handleSubmit, register } = useForm();
  const user = JSON.parse(sessionStorage.getItem("user"));

  const handleContact = async (data) => {
    const { email, subject, name, message } = data;
    try {
      const contact = await axios.post(`${baseUrl}/api/contact`, {
        name,
        subject,
        email,
        message,
      });
    } catch (error) {}
  };
  return loading ? (
    <Loader />
  ) : (
    <section className="contact-page">
      <Header />
      <Hero />
      <section className="contact-us-sect">
        <div className="flex">
          <div className="contact-form-container" data-aos={"zoom-in-left"}>
            <h1 className="sub-header-text">Get In Touch</h1>
            <p className="sub-p">Fill the form below to send us a message</p>
            <form
              className="contact-form"
              onSubmit={handleSubmit((data) => handleContact(data))}
            >
              <div>
                <h3>Your Name</h3>
                <input type="text" placeholder="Name" {...register("name")} />
              </div>
              <div>
                <h3>Subject</h3>
                <input
                  type="text"
                  placeholder="Your Subject"
                  {...register("subject")}
                />
              </div>
              <div>
                <h3>Email Address</h3>
                <input
                  type="email"
                  placeholder="Your Email"
                  {...register("email")}
                />
              </div>
              <div>
                <h3>Message</h3>
                <textarea
                  className="contact-textarea"
                  placeholder="Your Message"
                  {...register("message")}
                ></textarea>
                <Purple title={"Send"} />
              </div>
            </form>
          </div>
          <div className="contact-infos">
            <div className="flex">
              <div className="contact-icon-con flex">
                <MdEmail />
              </div>
              <div>
                <h3>Email Address</h3>
                <p className="sub-p">wealthwise@cosultant.online</p>
              </div>
            </div>
            <div className="flex">
              <div className="contact-icon-con flex">
                <BsTelephoneFill />
              </div>
              <div>
                <h3>Phone Number</h3>
                <a
                  href="https://t.me/Paymentmanagements"
                  target="_blank"
                  className="sub-p"
                >
                  Contact Us On Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <Contact />
    </section>
  );
};

export default Contacts;
