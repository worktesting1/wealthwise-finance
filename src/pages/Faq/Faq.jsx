import React, { useState } from "react";
import "../Faq/Faq.css";
import { useGlobalContext } from "../../context/context";
import { Contact, Footer, Header, Loader } from "../../components";
import { BsFillPatchQuestionFill, BsCreditCard2Back, BsChevronDown } from "react-icons/bs";
import { MdAttachMoney } from "react-icons/md";
import { Link } from "react-router-dom";

const tabs = [
  { id: 1, label: "General Questions", icon: <BsFillPatchQuestionFill /> },
  { id: 2, label: "Fees & Charges", icon: <MdAttachMoney /> },
  { id: 3, label: "Money Transfer", icon: <BsCreditCard2Back /> },
];

const faqData = {
  1: [
    {
      q: "Do I need a new account for each platform?",
      a: "No — one Wealth Wise account works across all our platforms. You can manage everything from a single login.",
    },
    {
      q: "How do I keep my password secure?",
      a: "Never share your password with anyone, including our support staff. We will never ask for your password. Use a unique, strong password and enable two-factor authentication.",
    },
    {
      q: "Is my account information safe?",
      a: "Your account details are encrypted and stored securely. We will never ask you to share personal details via email or phone. If you receive such a request, report it immediately.",
    },
    {
      q: "How do I confirm a payment before sending?",
      a: "Every fund transfer requires account verification before it is processed. Review recipient details carefully on the confirmation screen — this protects you from sending money to the wrong account.",
    },
  ],
  2: [
    {
      q: "How do I close my account?",
      a: "We'd hate to see you go, but if you wish to close your account please send us a message through the contact page and our team will assist you promptly.",
    },
    {
      q: "Is 24/7 customer care available?",
      a: "Yes — our customer care team is available around the clock. You can reach us via email, our contact form, or WhatsApp at any time.",
    },
    {
      q: "How do I reach support?",
      a: "Visit our Contact page and fill in the form. One of our representatives will respond as quickly as possible, typically within a few hours.",
    },
  ],
  3: [
    {
      q: "Can I change my account number?",
      a: "Account numbers are permanently assigned at registration and cannot be changed. Your account number is a unique identifier tied to your profile.",
    },
    {
      q: "Do I need a transaction PIN?",
      a: "Yes — a transaction PIN is required for every transfer you initiate on our platform. This adds an extra layer of security to each payment.",
    },
    {
      q: "What do I do if an international transfer fails?",
      a: "First, verify the recipient's account number and all required details are correct. If everything checks out and the transfer still failed, contact us immediately via our support page — we treat failed international transfers as urgent.",
    },
  ],
};

const Accordion = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-accordion ${open ? "open" : ""}`}>
      <div className="faq-accordion-header" onClick={() => setOpen(!open)}>
        <span className="faq-accordion-question">{q}</span>
        <BsChevronDown className="faq-accordion-chevron" />
      </div>
      <div className="faq-accordion-body">
        <p>{a}</p>
      </div>
    </div>
  );
};

const Faq = () => {
  const { loading } = useGlobalContext();
  const [activeTab, setActiveTab] = useState(1);

  if (loading) return <Loader />;

  return (
    <div className="faq-page">
      <Header />

      {/* Hero banner */}
      <section
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #2563eb 100%)",
          padding: "140px 80px 80px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#fff", fontSize: "44px", fontWeight: 800, marginBottom: "14px" }}>
          Frequently Asked Questions
        </h1>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "16px", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7 }}>
          Everything you need to know about Wealth Wise. Can't find an answer? Reach out to our team.
        </p>
      </section>

      {/* Intro label */}
      <div className="faq-intro">
        <span className="faq-intro-label">Browse by topic</span>
        <p className="faq-intro-sub">
          Select a category below to find the answers most relevant to you.
        </p>
      </div>

      {/* Tab selector */}
      <div className="faq-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`faq-tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Accordion panels */}
      <div className="faq-panels">
        {tabs.map((tab) => (
          <div key={tab.id} className={`faq-panel ${activeTab === tab.id ? "active" : ""}`}>
            {faqData[tab.id].map((item, i) => (
              <Accordion key={i} q={item.q} a={item.a} />
            ))}
          </div>
        ))}
      </div>

      {/* CTA */}
      <section className="faq-cta">
        <h2 className="faq-cta-title">Still have a question?</h2>
        <p className="faq-cta-sub">
          Our support team is available 24/7. Write us a message and we'll get back to you as soon as possible.
        </p>
        <Link to="/contact" className="faq-cta-btn">
          Contact Support
        </Link>
      </section>

      <Footer />
      <Contact />
    </div>
  );
};

export default Faq;
