import React from "react";
import { Contact, Footer, Header } from "../../components";
import "./Terms.css";

const Terms = () => {
  return (
    <>
      <Header />
      <div className="terms">
        <p className="sub-p">
          Wealth Wise terms and conditions are an important aspect of the
          website's legal framework. These terms and conditions provide
          important information regarding the use of the website and the
          services it offers. Customers should carefully review these terms and
          conditions before using the website or accessing any of its services.
        </p>
        <p className="sub-p">
          One of the key aspects of Wealth Wise terms and conditions is its user
          agreement. This agreement outlines the rights and responsibilities of
          both the customer and the website. It covers topics such as account
          creation, security, and privacy. By agreeing to the user agreement,
          customers agree to comply with all of the terms and conditions
          outlined by the website.
        </p>
        <p className="sub-p">
          Another important aspect of Wealth Wise terms and conditions is its
          privacy policy. This policy outlines how the website collects, uses,
          and protects customer information. It also outlines how customers can
          access and modify their personal information. By agreeing to the
          privacy policy, customers agree to allow the website to collect and
          use their personal information in accordance with the policy.
        </p>
        <p className="sub-p">
          Wealth Wise terms and conditions also cover topics such as
          intellectual property, limitations of liability, and dispute
          resolution. These sections provide important information regarding the
          website's policies on copyright and trademark infringement, as well as
          its liability in the event of any damages or losses incurred by
          customers. They also outline the procedures for resolving disputes
          between the website and its customers.
        </p>
        <p className="sub-p">
          In addition to its general terms and conditions, Wealth Wise has
          specific terms and conditions for its banking, investment, and lending
          services. These sections provide detailed information regarding the
          terms and conditions specific to each service. Customers should
          carefully review these sections before using any of the website's
          services.
        </p>
        <p className="sub-p">
          Overall, Wealth Wise terms and conditions provide important
          information regarding the use of the website and the services it
          offers. Customers should review these terms and conditions carefully
          before using the website or accessing any of its services, to ensure
          that they understand their rights and responsibilities as users of the
          website.
        </p>
      </div>
      <Footer />
      <Contact />
    </>
  );
};

export default Terms;
