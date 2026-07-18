import "./styles.css";
import { GoHome } from "react-icons/go";
import { MdBusinessCenter } from "react-icons/md";
import { FaCarSide } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { CiCreditCard2, CiStethoscope } from "react-icons/ci";

const loanTypes = [
  {
    icon: <GoHome size={20} color="#16a34a" />,
    bg: "#dcfce7",
    title: "Personal Home Loans",
    text: "Finance your dream home with competitive rates",
  },
  {
    icon: <FaCarSide size={18} color="#2563eb" />,
    bg: "#dbeafe",
    title: "Automobile Loans",
    text: "Flexible auto financing to get you on the road",
  },
  {
    icon: <MdBusinessCenter size={20} color="#d97706" />,
    bg: "#fef3c7",
    title: "Business Loans",
    text: "Tailored financing to grow your business",
  },
  {
    icon: <FiUsers size={18} color="#7c3aed" />,
    bg: "#ede9fe",
    title: "Joint Mortgage",
    text: "Share responsibility with a co-borrower",
  },
  {
    icon: <CiCreditCard2 size={20} color="#0891b2" />,
    bg: "#cffafe",
    title: "Secured Overdraft",
    text: "Access funds when needed with asset backing",
  },
  {
    icon: <CiStethoscope size={20} color="#e11d48" />,
    bg: "#ffe4e6",
    title: "Health Finance",
    text: "Cover medical expenses with easy payments",
  },
];

const LoanTypes = () => (
  <div className="ln_section">
    <p className="ln_section_label">Available Loan Types</p>
    <div className="ln_types_list">
      {loanTypes.map((l) => (
        <div className="ln_type" key={l.title}>
          <div className="ln_type_icon" style={{ background: l.bg }}>
            {l.icon}
          </div>
          <div className="ln_type_body">
            <div className="ln_type_title">{l.title}</div>
            <div className="ln_type_text">{l.text}</div>
          </div>
          <div className="ln_type_arrow">›</div>
        </div>
      ))}
    </div>
  </div>
);

export default LoanTypes;
