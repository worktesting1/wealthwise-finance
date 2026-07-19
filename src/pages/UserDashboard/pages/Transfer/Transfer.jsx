import "./styles.css";
import SecuredTransactions from "../../components/SecuredTransactions";
import TransferModal from "../../components/TransferModal";
import { useEffect, useState } from "react";
import OTPModal from "../../components/OTPModal";
import { useGlobalContext } from "../../../../context/context";
import TransferSuccessModal from "../../components/TransferModal/TransferSuccessModal";
import KYCUploadModal from "../../components/KYCModal";
import KYCPendingModal from "../../components/KYCPendingModal";
import TransferPendingModal from "../../components/TransferModal/TransferPendingModal";
import Sidebar from "../../components/Sidbar";
import DesktopHeader from "../../components/DesktopHeader";
import TransferPaymentMethods from "../../components/TransferPaymentMethods";

const TransferContent = () => {
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [transferDetails, setTransferDetails] = useState({});
  const {
    showOTPModal,
    setShowSuccessModal,
    showSuccessModal,
    handleKYCSubmit,
    showKYCModal,
    showPendingModal,
    closeKYCModal,
    closePendingKYCModal,
    setShowTransferPendingModal,
    showTransferPendingModal,
    closeOTPModal,
  } = useGlobalContext();

  return (
    <div className="tr_page">
      {/* Hero banner */}
      <div className="tr_hero">
        <p className="tr_hero_eyebrow">Withdraw / Transfer</p>
        <h1 className="tr_hero_title">Send Funds</h1>
        <p className="tr_hero_sub">
          Choose a withdrawal method below. All transfers are encrypted and
          processed securely.
        </p>
      </div>

      {/* Method selection */}
      <div className="tr_body">
        <p className="tr_section_label">Select preferred method</p>
        <TransferPaymentMethods setShowWithdrawalModal={setShowWithdrawalModal} />
        <SecuredTransactions />
      </div>

      {/* Modals — unchanged logic */}
      <TransferModal
        showWithdrawalModal={showWithdrawalModal}
        onClose={() => setShowWithdrawalModal(false)}
        setTransferDetails={setTransferDetails}
      />
      <OTPModal
        show={showOTPModal}
        onClose={closeOTPModal}
        transferDetails={transferDetails}
        setShowSuccessModal={setShowSuccessModal}
      />
      <TransferSuccessModal
        show={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        amount={transferDetails.amount}
      />
      <TransferPendingModal
        show={showTransferPendingModal}
        onClose={() => setShowTransferPendingModal(false)}
        amount={transferDetails.amount}
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
};

const Transfer = () => {
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
    if (!_id || !token) return;
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
        <TransferContent />
      </div>
      <div className="bank_desktop_dashboard">
        <Sidebar />
        <div className="bank_desktop_dashboard_body">
          <DesktopHeader />
          <TransferContent />
        </div>
      </div>
    </>
  );
};

export default Transfer;
