import React, { useEffect } from "react";
import { Contact, Footer, Header, Card, Loader, Hero } from "../../components";

import { RiLuggageDepositLine } from "react-icons/ri";

import { HashLink } from "react-router-hash-link";
import { BsArrowRight } from "react-icons/bs";
import payment from "../../assets/payments.png";
import commercial from "../../assets/commercial.png";
import invest from "../../assets/invest.png";
import loan from "../../assets/loan.png";
import onlineBanking from "../../assets/online-banking.png";
import manage from "../../assets/manage.png";

import "../Home/Home.css";
import transacLogo from "../../assets/3.png";
import briefLogo from "../../assets/scrn-1.png";
import transacLogo2 from "../../assets/back.png";
import transacLogo3 from "../../assets/online-payment.png";
import cardLogo1 from "../../assets/feature-icon-1.png";
import cardLogo2 from "../../assets/feature-icon-2.png";
import cardLogo3 from "../../assets/feature-icon-3.png";

import { MdAccountBalance, MdOutlinePayment } from "react-icons/md";
import { useGlobalContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import { TbSend } from "react-icons/tb";

let cardDetails = [
  {
    title: "Fully Secure Payment",
    para: "Secure payment option on our platform",
    image: cardLogo1,
    id: "1",
  },
  {
    title: "No Transition Charge",
    para: "Fund transfer is without hidden charges.",
    image: cardLogo2,
    id: "2",
  },
  {
    title: "Cashout In A Minute",
    para: "Withdrawal of fund at our local branches and ATM across the country is instant without delay.",
    image: cardLogo3,
    id: "3",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const { loading } = useGlobalContext();

  return loading ? (
    <Loader />
  ) : (
    <section className="home">
      <Header />
      <Hero />
      <section className="why why_first">
        <section className="transaction-sect">
          <div className="transaction-image-container" data-aos="zoom-in">
            <div>
              <img src={transacLogo} alt="" />
            </div>
          </div>
          <div data-aos="zoom-out">
            <p className="sub-header-p">ON TIME, EVERY TIME</p>
            <h1 className="sub-header-text">
              Get World Class & Fastest Online Payment Service
            </h1>
            <p className="sub-p">
              Our local and international money transfer is the very best you
              can imagine as we have provided the very best avenue for you to
              transfer fund accros countries in minutes and our fund transfer is
              instantly
            </p>
            <p className="sub-p">
              With over a million customer, we have stood the test of time and
              our customers base speaks the volume about us.
            </p>
            <button
              className="purple-btn"
              onClick={() => {
                navigate("/login");
              }}
            >
              Transfer Funds
            </button>
          </div>
        </section>
      </section>
      <section className="part-two">
        <section className="transaction-sect">
          <div data-aos="fade-up-right">
            <p className="sub-header-p">DO MORE YOUR WAY</p>
            <h1 className="sub-header-text">Why We Stand Out</h1>
            <p className="sub-p">
              With over years of investment experience and $1.7 trillion in
              assets under management Footnote, access the world-class
              investment expertise of Wealth Wise to help you meet your
              important financial goals.
            </p>
            <p className="sub-p">
              We ensure you exprerience the very best of internet banking ever
              provided by any financial institution.
            </p>
            <HashLink
              smooth
              to={"#footer"}
              id="hashlink"
              className="purple-btn"
            >
              Find A Location
            </HashLink>
          </div>
          <div className="transaction-image-container" data-aos="zoom-in">
            <div id="transaction-image-container">
              <img src={transacLogo2} alt="" />
            </div>
          </div>
        </section>
      </section>
      <section className="why">
        <section className="transaction-sect">
          <div className="transaction-image-container" data-aos="flip-down">
            <div>
              <img src={transacLogo3} alt="" />
            </div>
          </div>
          <div data-aos="flip-left">
            <p className="sub-header-p">ONLINE PAYMENT</p>
            <h1 className="sub-header-text">
              Make Your Online Payment Almost Every Site
            </h1>
            <p className="sub-p">
              Take advantage of premium banking privileges, relationship
              benefits and access to the investment expertise and insights of
              Wealth Wise, tailored to your needs. Insights to empower confident
              financial decisions And Goals.
            </p>
            <button
              className="purple-btn"
              onClick={() => {
                navigate("/login");
              }}
            >
              Make A Payment
            </button>
          </div>
        </section>
      </section>
      <section className="brief-intro">
        <h1 className="sub-header-text" data-aos="fade-down">
          We Bring Everything In One Place
        </h1>
        <p className="sub-p" data-aos="flip-left">
          Convenient account options for businesses of all sizes. Plus, take
          advantage of human resource and investment solutions delivered by
          Wealth Wise. Offer your customers a variety of secure and convenient
          payment options that make it easy to do business.
        </p>
        <div className="brief-intro-child">
          <div className="brief-intro-child-1">
            <img src={briefLogo} alt="" />
          </div>
          <div className="brief-intro-child-2" data-aos="fade-right"></div>
        </div>
        <div className="brief-intro-child-two">
          <img src={briefLogo} alt="" />
        </div>
      </section>
      <section className="what_we_offer flex">
        <div>
          <h1 className="sub-header-text">Banking for Corporate</h1>
          <p className="sub-p">High End Banking Solution To Large Corporate</p>
          <img src={payment} alt="" />
        </div>
        <div className="what_we_offer_children">
          <HashLink smooth to={"#commercial"}>
            <div>
              <img src={commercial} alt="" />
              <p>Commercial C/A</p>
              <BsArrowRight />
            </div>
          </HashLink>
          <HashLink smooth to={"#commercial"}>
            <div>
              <img src={onlineBanking} alt="" />
              <p>Website & Web App</p>
              <BsArrowRight />
            </div>
          </HashLink>
          <HashLink smooth to={"#commercial"}>
            <div>
              <img src={loan} alt="" />
              <p>Business Loan</p>
              <BsArrowRight />
            </div>
          </HashLink>
          <HashLink smooth to={"#commercial"}>
            <div>
              <img src={invest} alt="" />
              <p>Debit Cards</p>
              <BsArrowRight />
            </div>
          </HashLink>
          <HashLink smooth to={"#commercial"}>
            <div>
              <img src={manage} alt="" />
              <p>Cash Management</p>
              <BsArrowRight />
            </div>
          </HashLink>
        </div>
      </section>
      <section className="services-container">
        <p className="sub-p">Our Services</p>
        <h1 className="sub-header-text">Get Your Wealth Wise Account</h1>
        <div className="service" data-aos="fade-left">
          <div className="service-item flex" id="commercial">
            <div className="card-image-con flex">
              <MdAccountBalance />
            </div>
            <div>
              <h3>Commercial C/A</h3>
              <p>
                At Wealth Wise, we understand the challenges and opportunities
                that come with running a business. That's why we offer a wide
                range of banking products and services designed to help you
                achieve your goals, from checking and savings accounts to
                business loans and lines of credit.
              </p>
            </div>
          </div>
          <div className="service-item flex">
            <div className="card-image-con flex">
              <TbSend />
            </div>
            <div>
              <h3>Online Banking</h3>
              <p>
                Wealth Wise Bank offers a convenient and secure online banking
                platform that allows you to manage your finances anytime,
                anywhere. With our online banking services, you can view account
                balances, transfer funds, pay bills, and more, all from the
                comfort of your home or office.
              </p>
            </div>
          </div>
          <div className="service-item flex">
            <div className="card-image-con flex">
              <RiLuggageDepositLine />
            </div>
            <div>
              <h3>Cards</h3>
              <p>
                Wealth Wise offers secure and convenient debit cards linked
                directly to your online banking account. Designed for everyday
                spending, these cards allow you to shop in-store or online,
                withdraw cash from ATMs, and manage transactions in real-time
                through the Wealth Wise app. With enhanced security features,
                instant transaction alerts, and global acceptance, Wealth Wise
                debit cards provide both control and flexibility for your
                financial needs. Whether you're budgeting, saving, or simply
                managing daily expenses, your Wealth Wise debit card makes it
                easier.
              </p>
            </div>
          </div>
          <div className="service-item flex">
            <div className="card-image-con flex">
              <MdOutlinePayment />
            </div>
            <div>
              <h3>Business Loan</h3>
              <p>
                Wealth Wise offers a range of loan products to help you achieve
                your financial goals. Whether you need a personal loan for
                unexpected expenses, a business loan to fund your startup, or a
                mortgage to buy your dream home, Wealth Wise has you covered.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="our-speciality">
        <p className="sub-p">Our Speciality</p>
        <h1 className="sub-header-text">We Bring Everything in one place</h1>
        <p className="sub-p">
          Earn 5,000 bonus points as a bonafide customer on Wealth Wise Terms
          and conditions applied.
        </p>
        <Card cards={cardDetails} aos={"fade-right"} />
      </section>
      <section className="what-customer-say">
        <p className="sub-p">CLIENTS OPINION</p>
        <h1 className="sub-header-text">What Users Say About US</h1>
        <p className="sub-p">Over a million customers cannot be wrong.</p>
        <div className="customers-comment flex">
          <div data-aos="fade-right">
            <p className="sub-p">
              O Am Very Glad I Made The Right Choice Banking With Wealth Wise
            </p>
            <div className="flex">
              <div className="flex">
                <img src={cardLogo1} alt="" />
              </div>
              <div>
                <p className="sub-p">Harrison</p>
                <p className="sub-p">Enterpreneur</p>
              </div>
            </div>
          </div>
          <div data-aos="fade-left">
            <p className="sub-p">
              Transactions are fast and ease Banking With Wealth Wise
            </p>
            <div className="flex">
              <div className="flex">
                <img src={cardLogo1} alt="" />
              </div>
              <div>
                <p className="sub-p">Betty</p>
                <p className="sub-p">Enterpreneur</p>
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

export default Home;
