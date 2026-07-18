import "./styles.css";
import { CiMoneyBill } from "react-icons/ci";

const LoanServicesCard = () => (
  <div className="ls_hero">
    <div className="ls_hero_inner">
      <div className="ls_hero_badge">
        <CiMoneyBill size={13} />
        Loan Services
      </div>
      <h2 className="ls_hero_title">
        Get the funds<br />
        <span>you need today</span>
      </h2>
      <p className="ls_hero_sub">
        Fast approvals, competitive rates, and flexible terms — all in one place.
      </p>
    </div>

    <div className="ls_stats_row">
      <div className="ls_stat">
        <div className="ls_stat_val">3.9%</div>
        <div className="ls_stat_label">Starting APR</div>
      </div>
      <div className="ls_stat">
        <div className="ls_stat_val">$500K</div>
        <div className="ls_stat_label">Max Amount</div>
      </div>
      <div className="ls_stat">
        <div className="ls_stat_val">24h</div>
        <div className="ls_stat_label">Fast Decision</div>
      </div>
    </div>
  </div>
);

export default LoanServicesCard;
