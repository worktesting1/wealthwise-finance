import React from "react";
import "../About/About.css";
import { useGlobalContext } from "../../context/context";
import {
  Card,
  Contact,
  Footer,
  Header,
  Hero,
  Loader,
  Purple,
} from "../../components";

import cardLogo1 from "../../assets/feature-icon-1.png";
import cardLogo2 from "../../assets/feature-icon-2.png";
import cardLogo3 from "../../assets/feature-icon-3.png";
import transacLogo3 from "../../assets/payment-service-3.png";
import transacLogo2 from "../../assets/3.jpg";
import { useNavigate } from "react-router-dom";
let cardDetails = [
  {
    title: "Fully Secure Payment",
    para: "Secure payment option on our platform",
    image: cardLogo1,
  },
  {
    title: "No Transition Charge",
    para: "Fund transfer is without hidden charges.",
    image: cardLogo2,
  },
  {
    title: "Cashout In A Minute",
    para: "Withdrawals of funds are instant without delay.",
    image: cardLogo3,
  },
];

const About = () => {
  const { loading } = useGlobalContext();
  const navigate = useNavigate();

  return loading ? (
    <Loader />
  ) : (
    <section className="about-section">
      <Header />
      <Hero />
      <section className="about-services">
        <h1 className="sub-header-text">What Service We Provide</h1>
        <p className="sub-p">
          Wealth Wise is a front liner in the art of digital and in-house
          banking system. We have stood the test of time with over a million
          customers banking with us, We ensure the best use of your digital
          assets by putting your money to work for you. We are ahead of the
          banking business any day any time. With over 100 years at banking, we
          have stood the test of time. We offer the safest banking options any
          financial institution can ever give a customer ranging from Savings
          Account, Checking Accounts to Investment Account. Our international
          fund transfer is the best and most secure you can ever experience.
          With over 1billion USD in federa; reserve, we can guarantee the best
          transaction ever.
        </p>
      </section>
      <Card cards={cardDetails} aos={"fade-up-left"} />
      <section className="about-what-we-do">
        <h1 className="sub-header-text">What We Do For You</h1>
        <p className="sub-p" data-aos="fade-down">
          We ensure your money is safe and works for your while you are asleep.
        </p>
        <div className="flex about-brief">
          <Purple title={"Money Transaction"} />
          <Purple title={"Tracking Activity"} />
          <Purple title={"Secure Money"} />
        </div>
      </section>
      <section className="why">
        <section className="transaction-sect">
          <div className="transaction-image-container" data-aos={"flip-right"}>
            <div>
              <img src={transacLogo3} alt="" />
            </div>
          </div>
          <div data-aos={"fade-down-left"}>
            <h1 className="sub-header-text diff">
              We Made The Easiest Possible Way To Transfer Money
            </h1>
            <p className="sub-p">
              Fund transfer is as easy as ABC with Wealth Wise.
            </p>
            <p className="sub-p">
              Create an account today, and login to your users dashboard to
              initiate a fund transfer and see the beauty of the safest fund
              transfer ever.
            </p>
            <Purple title={"Learn More"} />
          </div>
        </section>
      </section>
      <section className="pay-bills">
        <h1 className="sub-header-text" data-aos={"flip-left"}>
          Make Your Payment And Withdrawal Anytime
        </h1>
        <p className="sub-p" data-aos={"fade-down"}>
          Now, You can log into your account or register an account to make
          payments
        </p>
        <div className="flex">
          <button
            className="purple-btn"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
          <button
            className="purple-btn"
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </button>
        </div>
      </section>
      <section className="about-part-two" style={{ overflowX: "hidden" }}>
        <section className="transaction-sect">
          <div data-aos="zoom-out-down">
            <h1 className="sub-header-text diff">
              We Made The Easiest Possible Way To Transfer Money
            </h1>
            <p className="sub-p">
              Fastest and most secure way to trasfer money any time any day
            </p>
            <h2>Our Mission</h2>
            <p className="sub-p">
              To be the best online banking platform in the world.
            </p>
            <h2>Our Vision</h2>
            <p className="sub-p">
              To bring digital banking to the door step for everyone
            </p>
            <h2>Our Goal</h2>
            <p className="sub-p">
              To ensure your money works for you even when you are sleeping
            </p>
          </div>
          <div className="transaction-image-container" data-aos="zoom-in-up">
            <div id="transaction-image-container">
              <img src={transacLogo2} alt="" />
            </div>
          </div>
        </section>
      </section>
      <Footer />
      <Contact />
    </section>
  );
};

export default About;
