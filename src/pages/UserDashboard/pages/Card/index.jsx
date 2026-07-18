import { useEffect, useState } from "react";
import "./styles.css";
import DebitCard from "./DebitCard";
import Location from "./Location";
import map from "../../../../assets/images/map.png";
import visa from "../../../../assets/images/visa.png";
import pattern from "../../../../assets/images/pattern.png";
import chip from "../../../../assets/images/chip.png";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../../../context/context";
import Sidebar from "../../components/Sidbar";
import DesktopHeader from "../../components/DesktopHeader";

/* ── Placeholder card shown before applying ── */
const PlaceholderCard = () => (
  <div className="card">
    <div className="card_inner">
      <div
        className="card_front"
        style={{
          backgroundImage: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 55%, #1d4ed8 100%)",
        }}
      >
        <img src={map} alt="" className="map_image" />
        <div className="row">
          <img src={chip} alt="chip" />
          <img src={visa} alt="visa" className="visa" />
        </div>
        <div className="card_number_wrappepr">
          <span style={{ letterSpacing: "0.2em", fontSize: 20, opacity: 0.5 }}>
            •••• •••• •••• ••••
          </span>
        </div>
        <div className="row card_details_sect">
          <p>CARD HOLDER</p>
          <p>VALID TILL</p>
        </div>
        <div className="row card_name_sect">
          <p>YOUR NAME</p>
          <p>MM / YY</p>
        </div>
      </div>
      <div
        className="card_back"
        style={{
          backgroundImage: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 55%, #1d4ed8 100%)",
        }}
      >
        <img src={map} alt="" className="map_image" />
        <div className="bar_code" />
        <div className="row card_cvv">
          <div>
            <img src={pattern} alt="pattern" />
          </div>
          <p>•••</p>
        </div>
        <div className="row card_text">
          <p>
            Spend easily and securely anywhere, at any time, with our
            International Debit Card.
          </p>
        </div>
        <div className="row signature">
          <p>CUSTOMER SIGNATURE</p>
          <img src={visa} alt="" />
        </div>
      </div>
    </div>
  </div>
);

/* ── Verifying / pending card ── */
const PendingCard = () => (
  <div className="card">
    <div className="card_inner">
      <div
        className="card_front verification_card"
        style={{
          backgroundImage: "linear-gradient(135deg, #0f172a 0%, #78350f 100%)",
        }}
      >
        <img src={map} alt="" className="map_image" />
        <div className="verification_spinner" />
        <h3>Under Review</h3>
      </div>
      <div
        className="card_back"
        style={{
          backgroundImage: "linear-gradient(135deg, #0f172a 0%, #78350f 100%)",
        }}
      >
        <img src={map} alt="" className="map_image" />
      </div>
    </div>
  </div>
);

const CardContent = () => {
  const [step, setStep] = useState(1);
  const user = JSON.parse(sessionStorage.getItem("user")) || {};
  const { cardAmount, cardIssuing } = user;
  const { userCards, formatNumber } = useGlobalContext();
  const cardDetails = userCards[0];

  const handleApply = () => {
    if (cardIssuing === true) {
      setStep(2);
    } else {
      toast.error("Please contact customer support to enable card issuance.");
    }
  };

  /* ── APPROVED ── */
  if (cardDetails?.status === "approved") {
    const cardNumberStr = cardDetails.cardNumber?.toString() || "";
    const masked = `•••• •••• •••• ${cardNumberStr.slice(-4)}`;
    const dateObj = new Date(cardDetails.createdAt);
    const expMonth = dateObj.getMonth() + 1;
    const expYear = (dateObj.getFullYear() % 100) + 4;

    return (
      <div className="card_page">
        <h1 className="card_page_title">My Card</h1>

        <DebitCard
          card_number={cardDetails.cardNumber}
          name={cardDetails.name}
          ccv={cardDetails.ccv}
          cardType={cardDetails.cardType}
          createdAt={cardDetails.createdAt}
        />
        <p className="flip_hint">Hover to flip &amp; see CVV</p>

        {/* Details panel */}
        <div className="card_details_panel">
          <div className="panel_row">
            <span className="panel_label">Card Number</span>
            <span className="panel_value">{masked}</span>
          </div>
          <div className="panel_row">
            <span className="panel_label">Expiry</span>
            <span className="panel_value">
              {expMonth.toString().padStart(2, "0")} / {expYear}
            </span>
          </div>
          <div className="panel_row">
            <span className="panel_label">Card Type</span>
            <span className="panel_value">
              <span className="card_type_badge">{cardDetails.cardType}</span>
            </span>
          </div>
          <div className="panel_row">
            <span className="panel_label">Status</span>
            <span className="panel_value">
              <span className="status_dot" /> Active
            </span>
          </div>
        </div>

        {/* Security tip */}
        <div className="security_notice">
          <span className="security_notice_icon">🔒</span>
          <p>
            Never share your CVV or full card number with anyone. WealthWise
            will never ask for this information via email or phone.
          </p>
        </div>
      </div>
    );
  }

  /* ── PENDING / VERIFYING ── */
  if (cardDetails !== undefined) {
    return (
      <div className="card_page">
        <h1 className="card_page_title">My Card</h1>

        <PendingCard />
        <p className="flip_hint">Your card is being processed</p>

        <div className="pending_panel">
          <div className="pending_header">
            <div className="pending_icon">⏳</div>
            <div>
              <p className="pending_title">Verification in Progress</p>
              <p className="pending_sub">Usually takes 1–3 business days</p>
            </div>
          </div>

          <div className="pending_steps">
            {[
              { label: "Application Submitted", desc: "Your request has been received.", state: "done" },
              { label: "Payment Verification", desc: "Confirming your issuing fee payment.", state: "active" },
              { label: "Card Issuance", desc: "Card will be issued after verification.", state: "waiting" },
              { label: "Delivery", desc: "Card shipped to your address.", state: "waiting" },
            ].map((s, i, arr) => (
              <div key={s.label} className="pending_step">
                <div className="pending_step_line">
                  <div className={`pending_step_dot ${s.state}`}>
                    {s.state === "done" ? "✓" : i + 1}
                  </div>
                  {i < arr.length - 1 && <div className="pending_step_connector" />}
                </div>
                <div className="pending_step_content">
                  <p className="pending_step_label">{s.label}</p>
                  <p className="pending_step_desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── NO CARD — STEP 1: Apply CTA ── */
  if (step === 1) {
    return (
      <div className="card_page">
        <h1 className="card_page_title">Get Your Card</h1>

        <PlaceholderCard />
        <p className="flip_hint">Hover to preview both sides</p>

        <div className="no_card_cta">
          <div className="no_card_cta_header">
            <div>
              <p className="no_card_cta_title">WealthWise Debit Card</p>
              <p className="no_card_cta_fee">One-time issuance fee</p>
            </div>
            <div className="fee_pill">${formatNumber ? formatNumber(cardAmount) : cardAmount}</div>
          </div>

          <ul className="benefits_list">
            {[
              "Accepted worldwide — Visa &amp; Mastercard networks",
              "Use online, in-store, and at ATMs globally",
              "Zero hidden transaction fees",
              "Instant card freeze &amp; unfreeze in-app",
              "Issuance fee is refundable",
            ].map((b) => (
              <li key={b} className="benefit_item">
                <span className="benefit_check">✓</span>
                <span dangerouslySetInnerHTML={{ __html: b }} />
              </li>
            ))}
          </ul>

          <button className="apply_btn" onClick={handleApply}>
            Apply for Your Card
          </button>
        </div>
      </div>
    );
  }

  /* ── NO CARD — STEP 2: Location / delivery form ── */
  return (
    <div className="card_page">
      <h1 className="card_page_title">Card Delivery Details</h1>
      <Location />
    </div>
  );
};

const Card = () => {
  const user = JSON.parse(sessionStorage.getItem("user")) || {};
  const token = JSON.parse(sessionStorage.getItem("userToken"));
  const _id = user._id;
  const {
    getUserWithdrawals,
    getTotalBalance,
    getKYC,
    getUser,
    getAllDeposits,
    getAllLoans,
    getAllCard,
  } = useGlobalContext();

  useEffect(() => {
    if (!_id || !token) return;
    getUserWithdrawals(token, _id);
    getUser(token, _id);
    getTotalBalance(_id, token);
    getKYC(token, _id);
    getAllDeposits(token, _id);
    getAllLoans(token, _id);
    getAllCard(token, _id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="bank_dashbaord">
        <CardContent />
      </div>
      <div className="bank_desktop_dashboard">
        <Sidebar />
        <div className="bank_desktop_dashboard_body">
          <DesktopHeader />
          <CardContent />
        </div>
      </div>
    </>
  );
};

export default Card;
