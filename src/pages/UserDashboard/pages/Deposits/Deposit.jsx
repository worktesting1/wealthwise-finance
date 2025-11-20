import DepositPaymentMethods from "../../components/DepositPaymentMethods";
import SecuredTransactions from "../../components/SecuredTransactions";
import { useEffect, useState } from "react";
import DepositDetailsModal from "../../components/DepositDetailsModal";
import { useGlobalContext } from "../../../../context/context";
import Sidebar from "../../components/Sidbar";
import DesktopHeader from "../../components/DesktopHeader";

const DepositContents = () => {
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [activeTab, setActiveTab] = useState("crypto");

  const toggleDepositModal = (method) => {
    if (method === "Cryptocurrency") {
      setActiveTab("crypto");
    } else {
      setActiveTab("bank");
    }
    setShowWithdrawalModal(true);
  };

  return (
    <section className="transfer_page">
      <h2 className="text-gray-900 text-xl font-bold">
        Select Preffered Method
      </h2>
      <DepositPaymentMethods setShowWithdrawalModal={toggleDepositModal} />
      <SecuredTransactions />
      <DepositDetailsModal
        show={showWithdrawalModal}
        onClose={() => setShowWithdrawalModal(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </section>
  );
};

const Deposit = () => {
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
  }, []);
  return (
    <>
      <div className="bank_dashbaord">
        <DepositContents />
      </div>
      <div className="bank_desktop_dashboard">
        <Sidebar />
        <div className="bank_desktop_dashboard_body">
          <DesktopHeader />
          <DepositContents />
        </div>
      </div>
    </>
  );
};

export default Deposit;
