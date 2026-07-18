import { useState } from "react";
import "./styles.css";

const faqs = [
  {
    q: "What documents do I need to apply?",
    a: "You'll need a valid ID, proof of income (pay stubs or bank statements), and address verification. Additional documents may be requested based on loan type.",
  },
  {
    q: "How long does approval take?",
    a: "Most applications are reviewed within 24 hours. Complex cases may take 1–3 business days depending on verification requirements.",
  },
  {
    q: "Can I apply with a low credit score?",
    a: "We consider multiple factors beyond credit score. Applicants with lower scores may still qualify depending on income, employment history, and loan amount.",
  },
  {
    q: "Is there a penalty for early repayment?",
    a: "No. We do not charge any early repayment penalties. You're free to pay off your loan ahead of schedule without any extra fees.",
  },
  {
    q: "How much can I borrow?",
    a: "Loan amounts range from $1,000 to $500,000 depending on the loan type, your income, and creditworthiness.",
  },
];

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <div className="ln_section">
      <p className="ln_section_label">Frequently Asked Questions</p>
      <div className="ln_faq_list">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className={`ln_faq_item${openIdx === i ? " ln_open" : ""}`}
          >
            <div
              className="ln_faq_q"
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
            >
              <span className="ln_faq_q_text">{faq.q}</span>
              <span className="ln_faq_chevron">▾</span>
            </div>
            {openIdx === i && (
              <div className="ln_faq_a">{faq.a}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
