import "./styles.css";

const steps = [
  {
    num: "1",
    title: "Apply Online",
    desc: "Complete our simple form with your details and loan requirements. Takes under 5 minutes.",
  },
  {
    num: "2",
    title: "Quick Review",
    desc: "Our team reviews your application, usually within a few hours.",
  },
  {
    num: "3",
    title: "Get Funded",
    desc: "Once approved, the loan amount is transferred directly to your account.",
  },
];

const HowItWorks = () => (
  <div className="ln_section">
    <p className="ln_section_label">How It Works</p>
    <div className="ln_steps">
      {steps.map((s, i) => (
        <div className="ln_step" key={s.num}>
          <div className="ln_step_left">
            <div className="ln_step_num">{s.num}</div>
            {i < steps.length - 1 && <div className="ln_step_line" />}
          </div>
          <div className="ln_step_body">
            <div className="ln_step_title">{s.title}</div>
            <p className="ln_step_desc">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default HowItWorks;
