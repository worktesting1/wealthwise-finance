import "./styles.css";
import { GoClock } from "react-icons/go";
import { BsPercent, BsShieldCheck } from "react-icons/bs";
import { FaFileAlt } from "react-icons/fa";

const benefits = [
  {
    icon: <GoClock size={18} color="#2563eb" />,
    bg: "#dbeafe",
    title: "Quick Approval",
    text: "Decision within hours, funds within days",
  },
  {
    icon: <BsPercent size={18} color="#16a34a" />,
    bg: "#dcfce7",
    title: "Low Rates",
    text: "Competitive APR tailored to your profile",
  },
  {
    icon: <FaFileAlt size={16} color="#d97706" />,
    bg: "#fef3c7",
    title: "Simple Process",
    text: "Minimal paperwork, fast online form",
  },
  {
    icon: <BsShieldCheck size={18} color="#7c3aed" />,
    bg: "#ede9fe",
    title: "Secure",
    text: "Bank-level encryption on all data",
  },
];

const WhyChooseUs = () => (
  <div className="ln_section">
    <p className="ln_section_label">Why Choose Us</p>
    <div className="ln_benefits_grid">
      {benefits.map((b) => (
        <div className="ln_benefit" key={b.title}>
          <div className="ln_benefit_icon" style={{ background: b.bg }}>
            {b.icon}
          </div>
          <div className="ln_benefit_title">{b.title}</div>
          <div className="ln_benefit_text">{b.text}</div>
        </div>
      ))}
    </div>
  </div>
);

export default WhyChooseUs;
