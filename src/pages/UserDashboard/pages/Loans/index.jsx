import "./styles.css";
import LoanServicesCard from "../../components/LoanServicesCard";
import WhyChooseUs from "./WhyChooseUs";
import LoanTypes from "./LoanTypes";
import HowItWorks from "./HowItWork";
import FAQ from "./FAQ";
import CallToAction from "./CallToAction";
import { useEffect, useState } from "react";
import LoanApplicationModal from "./LoanApplicationModal";
import axios from "axios";
import { useGlobalContext } from "../../../../context/context";
import KYCUploadModal from "../../components/KYCModal";
import KYCPendingModal from "../../components/KYCPendingModal";
import { toast } from "react-toastify";
import Sidebar from "../../components/Sidbar";
import DesktopHeader from "../../components/DesktopHeader";

function LoansContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasActiveLoan, setHasActiveLoan] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    baseUrl,
    getAllLoans,
    loanHistory,
    userDetails,
    isKYC,
    closeKYCModal,
    closePendingKYCModal,
    showPendingModal,
    showKYCModal,
    handleKYCSubmit,
    setShowKYCModal,
    setShowPendingModal,
  } = useGlobalContext();

  const accessToken = JSON.parse(sessionStorage.getItem("userToken"));
  const { firstName, lastName, _id } =
    JSON.parse(sessionStorage.getItem("user")) || userDetails || {};

  const handleSubmitApplication = (formData) => {
    if (isKYC === true) {
      formData.name = `${firstName} ${lastName}`;
      formData.userId = _id;
      setLoading(true);
      axios
        .post(`${baseUrl}/api/loan`, formData, {
          headers: { token: accessToken },
        })
        .then(() => {
          toast.success("Loan application submitted successfully!");
          getAllLoans(accessToken, _id);
          setLoading(false);
          setTimeout(() => {
            setIsModalOpen(false);
            setHasActiveLoan(true);
          }, 2000);
        })
        .catch(() => {
          setLoading(false);
        });
    }
    if (isKYC === null) setShowKYCModal(true);
    if (isKYC === false) setShowPendingModal(true);
  };

  return (
    <div className="ln_page">
      {/* Hero */}
      <LoanServicesCard />

      {/* Page body */}
      <div className="ln_body">
        {/* Active loan notice */}
        {loanHistory.length > 0 && (
          <div className="ln_loan_notice">
            <span className="ln_loan_notice_icon">⚠️</span>
            <span className="ln_loan_notice_text">
              You have an active or pending loan application. New applications are
              locked until it is resolved.
            </span>
          </div>
        )}

        <WhyChooseUs />
        <LoanTypes />
        <HowItWorks />
        <FAQ />
        <CallToAction
          onApplyClick={() => setIsModalOpen(true)}
          hasActiveLoan={hasActiveLoan}
        />
      </div>

      {/* Modals */}
      <LoanApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitApplication}
        loading={loading}
      />
      <KYCUploadModal
        show={showKYCModal}
        onClose={closeKYCModal}
        onSubmit={handleKYCSubmit}
      />
      <KYCPendingModal
        show={showPendingModal}
        onClose={closePendingKYCModal}
        estimatedTime="24-48 hours"
      />
    </div>
  );
}

const Loans = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const token = JSON.parse(sessionStorage.getItem("userToken"));
  const _id = user._id;
  const {
    getUserWithdrawals,
    getTotalBalance,
    getKYC,
    getUser,
    getAllDeposits,
    getAllLoans,
  } = useGlobalContext();

  useEffect(() => {
    getUserWithdrawals(token, _id);
    getUser(token, _id);
    getTotalBalance(_id, token);
    getKYC(token, _id);
    getAllDeposits(token, _id);
    getAllLoans(token, _id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="bank_dashbaord">
        <LoansContent />
      </div>
      <div className="bank_desktop_dashboard">
        <Sidebar />
        <div className="bank_desktop_dashboard_body">
          <DesktopHeader />
          <LoansContent />
        </div>
      </div>
    </>
  );
};

export default Loans;
