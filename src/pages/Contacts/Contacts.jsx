import React from "react";
import "./Contacts.css";
import { Footer, Header, Loader, Contact } from "../../components";
import { useGlobalContext } from "../../context/context";
import { MdEmail, MdLocationOn, MdAccessTime } from "react-icons/md";
import { FaTelegramPlane } from "react-icons/fa";
import { BsTelephoneFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contacts = () => {
  const { loading, baseUrl } = useGlobalContext();
  const { handleSubmit, register, reset } = useForm();

  const handleContact = async (data) => {
    const { email, subject, name, message } = data;
    try {
      await axios.post(`${baseUrl}/api/contact`, { name, subject, email, message });
      toast.success("Message sent! We'll be in touch soon.");
      reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="contact-page">
        <Header />

        {/* Hero */}
        <section
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #2563eb 100%)",
            padding: "140px 80px 80px",
            textAlign: "center",
          }}
        >
          <h1 style={{ color: "#fff", fontSize: "44px", fontWeight: 800, marginBottom: "14px" }}>
            Get In Touch
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "16px", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
            Our team is available 24/7. We typically respond within a few hours.
          </p>
        </section>

        {/* Info cards strip */}
        <div className="contact-info-strip">
          <div className="contact-info-card">
            <div className="contact-info-icon"><MdEmail /></div>
            <div>
              <p className="contact-info-label">Email Us</p>
              <p className="contact-info-value">
                <a href="mailto:wealthwise@cosultant.online">
                  wealthwise@cosultant.online
                </a>
              </p>
            </div>
          </div>
          <div className="contact-info-card">
            <div className="contact-info-icon"><FaTelegramPlane /></div>
            <div>
              <p className="contact-info-label">Telegram Support</p>
              <p className="contact-info-value">
                <a href="https://t.me/Paymentmanagements" target="_blank" rel="noreferrer">
                  @Paymentmanagements
                </a>
              </p>
            </div>
          </div>
          <div className="contact-info-card">
            <div className="contact-info-icon"><MdLocationOn /></div>
            <div>
              <p className="contact-info-label">Head Office</p>
              <p className="contact-info-value">
                141 First Floor, 12 St Roots Terrace,<br />
                Los Angeles, CA 90010, USA
              </p>
            </div>
          </div>
        </div>

        {/* Main contact section */}
        <div className="contact-main">
          {/* Form */}
          <div className="contact-form-card" data-aos="zoom-in-left">
            <span className="contact-form-eyebrow">Send a message</span>
            <h2 className="contact-form-title">We'd love to hear from you</h2>
            <p className="contact-form-sub">
              Fill in the form below and one of our representatives will respond as soon as possible.
            </p>

            <form onSubmit={handleSubmit(handleContact)}>
              <div className="contact-form-row">
                <div className="contact-field">
                  <label>Your Name</label>
                  <input type="text" placeholder="John Doe" {...register("name")} />
                </div>
                <div className="contact-field">
                  <label>Email Address</label>
                  <input type="email" placeholder="you@example.com" {...register("email")} />
                </div>
              </div>
              <div className="contact-field">
                <label>Subject</label>
                <input type="text" placeholder="How can we help?" {...register("subject")} />
              </div>
              <div className="contact-field">
                <label>Message</label>
                <textarea
                  placeholder="Tell us more about your enquiry…"
                  rows={5}
                  {...register("message")}
                />
              </div>
              <button type="submit" className="contact-submit-btn">
                Send Message
              </button>
            </form>
          </div>

          {/* Aside cards */}
          <div className="contact-aside">
            <div className="contact-aside-card">
              <div className="contact-aside-icon"><BsTelephoneFill /></div>
              <h3 className="contact-aside-title">24/7 Customer Support</h3>
              <p className="contact-aside-body">
                Our support team never sleeps. Reach us any time via email or
                Telegram and we'll respond promptly.
              </p>
            </div>

            <div className="contact-aside-card">
              <div className="contact-aside-icon"><MdAccessTime /></div>
              <h3 className="contact-aside-title">Business Hours</h3>
              <p className="contact-aside-body">
                For in-branch queries, visit us during the following hours:
              </p>
              <div className="contact-hours">
                <div className="contact-hours-row">
                  <span>Monday – Friday</span>
                  <span>8:00 AM – 6:00 PM</span>
                </div>
                <div className="contact-hours-row">
                  <span>Saturday</span>
                  <span>9:00 AM – 2:00 PM</span>
                </div>
                <div className="contact-hours-row">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>

            <div className="contact-aside-card">
              <div className="contact-aside-icon"><MdEmail /></div>
              <h3 className="contact-aside-title">Email Response Time</h3>
              <p className="contact-aside-body">
                We aim to respond to all email enquiries within{" "}
                <strong>2–4 hours</strong>. For urgent matters, please reach out
                via{" "}
                <a href="https://t.me/Paymentmanagements" target="_blank" rel="noreferrer">
                  Telegram
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        <Footer />
        <Contact />
      </div>
    </>
  );
};

export default Contacts;
