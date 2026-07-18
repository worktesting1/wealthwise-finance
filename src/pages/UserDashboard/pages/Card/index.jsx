import { useEffect, useState } from "react";
import "./styles.css";
import DebitCard from "./DebitCard";
import Location from "./Location";
import visa from "../../../../assets/images/visa.png";
import master from "../../../../assets/images/master.png";
import pattern from "../../../../assets/images/pattern.png";
import chip from "../../../../assets/images/chip.png";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../../../context/context";
import Sidebar from "../../components/Sidbar";
import DesktopHeader from "../../components/DesktopHeader";

const NfcIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M9 12c0-1.66 1.34-3 3-3" stroke="rgba(255,255,255,0.8)" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M6.5 12c0-3.03 2.47-5.5 5.5-5.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M4 12c0-4.42 3.58-8 8-8" stroke="rgba(255,255,255,0.25)" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="12" r="1.2" fill="white" />
  </svg>
);

/* ── Placeholder card shown before applying ── */
const PlaceholderCard = ({ cardType = "Visa" }) => {
  const [tapped, setTapped] = useState(false);
  const isMastercard = cardType === "Mastercard";
  const logo = isMastercard ? master : visa;

  const gradient = isMastercard
    ? "linear-gradient(145deg, #0d0d0d 0%, #1c0800 55%, #2e1100 100%)"
    : "linear-gradient(145deg, #0d0d0d 0%, #060d20 55%, #0b1a3e 100%)";

  const glowColor = isMastercard
    ? "radial-gradient(circle at 80% 20%, rgba(234,88,12,0.6) 0%, transparent 58%)"
    : "radial-gradient(circle at 80% 20%, rgba(37,99,235,0.6) 0%, transparent 58%)";

  return (
    <div
      className={`bank_card${tapped ? " bank_card_tapped" : ""}`}
      onClick={() => setTapped((t) => !t)}
    >
      <div className="bank_card_inner">
        {/* Front */}
        <div className="bank_card_front" style={{ background: gradient }}>
          <div className="bank_card_glow" style={{ background: glowColor }} />
          <div className="bank_card_top">
            <span className="bank_card_brand">WealthWise</span>
            <span className="bank_card_nfc"><NfcIcon /></span>
          </div>
          <img src={chip} alt="" className="bank_card_chip" />
          <div className="bank_card_number bank_card_number_dim">
            <span>••••</span>
            <span>••••</span>
            <span>••••</span>
            <span>••••</span>
          </div>
          <div className="bank_card_bottom">
            <div className="bank_card_field">
              <span className="bank_card_field_label">Card Holder</span>
              <span className="bank_card_field_value">Your Name</span>
            </div>
            <div className="bank_card_field">
              <span className="bank_card_field_label">Expires</span>
              <span className="bank_card_field_value">MM / YY</span>
            </div>
            <img src={logo} alt={cardType} className="bank_card_logo" />
          </div>
        </div>
        {/* Back */}
        <div className="bank_card_back" style={{ background: gradient }}>
          <div className="bank_card_glow" style={{ background: glowColor }} />
          <div className="bank_card_stripe" />
          <div className="bank_card_sig_area">
            <div className="bank_card_sig_strip">
              <img src={pattern} alt="" />
            </div>
            <div className="bank_card_cvv_box">
              <span className="bank_card_field_label">CVV</span>
              <span className="bank_card_cvv_code">•••</span>
            </div>
          </div>
          <div className="bank_card_back_footer">
            <p className="bank_card_back_text">
              Property of WealthWise. If found, please return to the nearest branch.
            </p>
            <img src={logo} alt={cardType} className="bank_card_logo_sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Pending / verifying card ── */
const PendingCard = () => (
  <div className="bank_card">
    <div className="bank_card_inner">
      <div
        className="bank_card_front bank_card_verify"
        style={{ background: "linear-gradient(145deg, #0d0d0d 0%, #1a0e00 55%, #2d1a00 100%)" }}
      >
        <div className="bank_card_glow" style={{ background: "radial-gradient(circle at 80% 20%, rgba(217,119,6,0.55) 0%, transparent 58%)" }} />
        <div className="bank_card_top" style={{ width: "100%" }}>
          <span className="bank_card_brand">WealthWise</span>
        </div>
        <div className="bank_card_spinner" />
        <h3>Under Review</h3>
      </div>
      <div
        className="bank_card_back"
        style={{ background: "linear-gradient(145deg, #0d0d0d 0%, #1a0e00 55%, #2d1a00 100%)" }}
      >
        <div className="bank_card_glow" style={{ background: "radial-gradient(circle at 80% 20%, rgba(217,119,6,0.55) 0%, transparent 58%)" }} />
        <div className="bank_card_stripe" />
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════
   MAIN CONTENT — switches on card state
══════════════════════════════════════════ */
const CardContent = () => {
  const [step, setStep] = useState(1);
  const [previewCardType, setPreviewCardType] = useState("Visa");
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
    const expMonth = (dateObj.getMonth() + 1).toString().padStart(2, "0");
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
        <p className="flip_hint">Tap or hover to flip &amp; see CVV</p>

        <div className="card_details_panel">
          <div className="panel_row">
            <span className="panel_label">Card Number</span>
            <span className="panel_value">{masked}</span>
          </div>
          <div className="panel_row">
            <span className="panel_label">Expiry</span>
            <span className="panel_value">
              {expMonth} / {expYear}
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

        <div className="security_notice">
          <span className="security_notice_icon">🔒</span>
          <p>
            Never share your CVV or full card number. WealthWise will never
            ask for this information via email or phone.
          </p>
        </div>
      </div>
    );
  }

  /* ── PENDING ── */
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
              {
                label: "Application Submitted",
                desc: "Your request has been received.",
                state: "done",
              },
              {
                label: "Payment Verification",
                desc: "Confirming your issuing fee payment.",
                state: "active",
              },
              {
                label: "Card Issuance",
                desc: "Card will be issued after verification.",
                state: "waiting",
              },
              {
                label: "Delivery",
                desc: "Card shipped to your address.",
                state: "waiting",
              },
            ].map((s, i, arr) => (
              <div key={s.label} className="pending_step">
                <div className="pending_step_line">
                  <div className={`pending_step_dot ${s.state}`}>
                    {s.state === "done" ? "✓" : i + 1}
                  </div>
                  {i < arr.length - 1 && (
                    <div className="pending_step_connector" />
                  )}
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

  /* ── NO CARD — Step 1: Apply ── */
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
            <div className="fee_pill">
              ${formatNumber ? formatNumber(cardAmount) : cardAmount}
            </div>
          </div>

          <ul className="benefits_list">
            {[
              "Accepted worldwide — Visa & Mastercard networks",
              "Use online, in-store, and at ATMs globally",
              "Zero hidden transaction fees",
              "Instant card freeze & unfreeze in-app",
              "Issuance fee is refundable",
            ].map((b) => (
              <li key={b} className="benefit_item">
                <span className="benefit_check">✓</span>
                <span>{b}</span>
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

  /* ── NO CARD — Step 2: Delivery form ── */
  return (
    <div className="card_page">
      <h1 className="card_page_title">Card Delivery Details</h1>
      <PlaceholderCard cardType={previewCardType} />
      <p className="flip_hint">Hover to preview both sides</p>
      <Location onCardTypeChange={setPreviewCardType} />
    </div>
  );
};

/* ══════════════════════════════════════════
   PAGE SHELL (mobile + desktop layout)
══════════════════════════════════════════ */
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
