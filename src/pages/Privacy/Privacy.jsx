import React from "react";
import "./Privacy.css";
import "../Terms/Terms.css";
import { Contact, Footer, Header } from "../../components";

const Privacy = () => {
  return (
    <>
      <Header />
      <div className="terms">
        <p className="sub-p">
          Wealth Wise is a financial institution that takes privacy and security
          very seriously. As such, they have implemented a robust privacy policy
          to protect the personal information of their customers. The company
          collects only the minimum necessary information required to provide
          banking services to its customers, and this information is stored
          securely in accordance with applicable laws and regulations.
        </p>
        <p className="sub-p">
          Wealth Wise privacy policy outlines the types of personal information
          that the bank collects, including name, address, date of birth, social
          security number, and other financial information. The policy also
          explains how this information is used, such as for processing
          transactions, maintaining customer accounts, and complying with legal
          and regulatory requirements. The bank does not sell or share personal
          information with third parties for marketing purposes.
        </p>
        <p className="sub-p">
          The privacy policy also details the measures taken by Wealth Wise to
          protect customer information. This includes the use of advanced
          encryption technologies, firewalls, and other security protocols to
          safeguard against unauthorized access, disclosure, or alteration of
          customer data. The bank also conducts regular security audits to
          ensure that its systems and processes remain secure.
        </p>
        <p className="sub-p">
          Wealth Wise recognizes that the privacy and security landscape is
          constantly evolving. As such, the company regularly updates its
          privacy policy to reflect changes in laws, regulations, and industry
          best practices. Customers are encouraged to review the privacy policy
          periodically to stay informed of any changes that may affect their
          personal information.
        </p>
        <p className="sub-p">
          In the event of a data breach or other security incident, Wealth Wise
          has established procedures to quickly and effectively respond to the
          situation. This includes notifying affected customers and regulatory
          authorities as required by law, and taking steps to mitigate any
          potential harm to affected individuals.
        </p>
      </div>
      <Footer />
      <Contact />
    </>
  );
};

export default Privacy;
