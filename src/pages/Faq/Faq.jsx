import React from "react";
import "../Faq/Faq.css";
import { useGlobalContext } from "../../context/context";
import {
  Contact,
  Footer,
  Header,
  Hero,
  Loader,
  Purple,
} from "../../components";

import { BsFillPatchQuestionFill, BsCreditCard2Back } from "react-icons/bs";
import { MdAttachMoney } from "react-icons/md";

const Faq = () => {
  const { loading, activeTab, toggleNave } = useGlobalContext();

  return loading ? (
    <Loader />
  ) : (
    <section className="faq-section">
      <Header />
      <Hero />
      <section className="faq-hero">
        <h1 className="sub-header-text">Frequently Asked Questions</h1>
        <p className="sub-p">FAQ</p>
        <div className="faq-container flex">
          <div id="tab" className="id_1" onClick={toggleNave}>
            <BsFillPatchQuestionFill />
            <h3>General Questions</h3>
          </div>
          <div id="tab" className="id_2" onClick={toggleNave}>
            <MdAttachMoney />
            <h3>Fees and Charges</h3>
          </div>
          <div id="tab" className="id_3" onClick={toggleNave}>
            <BsCreditCard2Back />
            <h3>Money Transfer</h3>
          </div>
        </div>
        <div className="faq-contents-con" data-aos={"fade-left"}>
          <div
            className={`faq-contents-1 faq-contents-item ${
              activeTab == 1 ? "active_content_tab" : ""
            }`}
          >
            <div className="accordion-item">
              <h3>Do i need a new account</h3>
              <p className="sub-p">
                You dont need to create multiple accounts. One account can cut
                across all our platforms
              </p>
            </div>
            <div className="accordion-item">
              <h3>Passwords</h3>
              <p className="sub-p">
                Your password is not to be shared with anybody
              </p>
            </div>
            <div className="accordion-item">
              <h3>Account Informations</h3>
              <p className="sub-p">
                Your account details is safe with us, Ensure not to give this to
                anybody as we will not ask for it.
              </p>
            </div>
            <div className="accordion-item">
              <h3>Confirm information and payover</h3>
              <p className="sub-p">
                You will need account verifications on all your find trnafer as
                this is a best practice to ensure you dont send money to a wrong
                person
              </p>
            </div>
          </div>
          <div
            className={`faq-contents-2 faq-contents-item ${
              activeTab == 2 ? "active_content_tab" : ""
            }`}
          >
            <div className="accordion-item">
              <h3>Closing Account</h3>
              <p className="sub-p">
                We dont want to see you go. But for any reason you want to close
                your account, do write us a message as we will treat as required
              </p>
            </div>
            <div className="accordion-item">
              <h3>Customer Care</h3>
              <p className="sub-p">We provide 24/7 customers care service</p>
            </div>
            <div className="accordion-item">
              <h3>Contact Support</h3>
              <p className="sub-p">
                Feel free to contact our customer care page and we will reply as
                fast as it can be
              </p>
            </div>
          </div>
          <div
            className={`faq-contents-3 faq-contents-item ${
              activeTab == 3 ? "active_content_tab" : ""
            }`}
          >
            <div className="accordion-item">
              <h3>Account Number</h3>
              <p className="sub-p">You can't change your account Number</p>
            </div>
            <div className="accordion-item">
              <h3>Transaction Pin</h3>
              <p className="sub-p">
                Yes, you will need this for every transcation you carry out on
                our platform
              </p>
            </div>
            <div className="accordion-item">
              <h3>Failed Transfer</h3>
              <p className="sub-p">
                For failed international transfer, ensure you have made every
                necessary measures and you are sure your sent money to the
                correct account number, if all these has been put in place, then
                do write us a message. We will treat as urgent as possible
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="faq-question" data-aos={"fade-right"}>
        <h1 className="sub-header-text">Have A Question?</h1>
        <p className="sub-p">
          Write us a message and one of our customers care representative will
          get back to you in the shortest time possible.
        </p>
        <Purple title={"Ask A Question"} />
      </section>
      <Footer />
      <Contact />
    </section>
  );
};

export default Faq;
