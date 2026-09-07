import axios from "axios";
import React, { useContext, useState } from "react";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
  // Falls back to "" (relative URLs) so Vite proxy forwards /api/* to the local Next.js backend
  const [kycStatus, setKycStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  const [totalAmount, setTotalAmount] = useState("");
  const [userNav, setUserNav] = useState(false);
  const [headerNav, setHeaderNav] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [terms, setTerms] = useState(false);
  const [address, setAddress] = useState(0);
  const [copy, setCopy] = useState(false);
  const [random, setRandom] = useState("");
  const [totalWithdrawal, setTotalWithdrawal] = useState("");
  const [isKYC, setIsKYC] = useState(null);
  const [userCards, setUserCards] = useState([]);
  const [userWithdrawals, setuserWithdrawals] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [depositHistory, setDepositHistory] = useState([]);
  const [successfulDepositsAmount, setSucessfulDepositAmount] = useState("");
  const [pendingWithdrawal, setPendingWithdrawal] = useState("");
  const [loanHistory, setloanHistory] = useState([]);
  const [showTransferPendingModal, setShowTransferPendingModal] =
    useState(false);
  const [showPendingModal, setShowPendingModal] = useState(false);
  const [selectedTransferMethod, setSelectedTransferMethod] = useState({});
  const [showKYCModal, setShowKYCModal] = useState(false);
  const [isLoadingTransactions, setisLoadingTransactions] = useState(false);
  const [pathHistory, setPathHistory] = useState([]);
  const [cardFormData, setCardFormData] = useState({});

  const toggleNave = (e) => {
    switch (e.target.id) {
      case "nav":
        setUserNav(!userNav);
        break;
      case "header_nav":
        setHeaderNav(!headerNav);

        break;
      case "tab":
        if (e.target.className == "id_1") {
          setActiveTab(1);
        }
        if (e.target.className == "id_2") {
          setActiveTab(2);
        }
        if (e.target.className == "id_3") {
          setActiveTab(3);
        }
        break;
      case "terms":
        setTerms(!terms);
        break;
      case "address":
        if (e.target.className === "bitcoin") {
          setAddress(1);
        } else if (e.target.className === "usdt") {
          setAddress(2);
        }
        break;
    }
  };

  // KYC STATus
  const getUserKYC = (token, id) => {
    axios
      .get(`${baseUrl}/api/kyc/${id}`, { headers: { token: token } })
      .then((response) => {
        setKycStatus(response.data);
      })
      .catch((error) => {});
  };

  const getAllCard = (token, _id) => {
    axios
      .get(`${baseUrl}/api/card/${_id}`, { headers: { token } })
      .then((response) => {
        setUserCards(response.data.cards);
      })
      .catch((error) => {});
  };

  const getUser = (token, id) => {
    axios
      .get(`${baseUrl}/api/users/${id}`, {
        headers: { token },
      })
      .then((data) => {
        if (data.status === 200) {
          setUserData(data.data);
          sessionStorage.setItem("user", JSON.stringify(data.data));
        }
      })
      .catch((error) => {
        if (
          error?.response?.status === 403 &&
          error?.response?.data?.code === "ACCOUNT_SUSPENDED"
        ) {
          sessionStorage.removeItem("user");
          sessionStorage.removeItem("userToken");
          window.location.replace("/login");
        }
      });
  };

  const getTotalBalance = (userId, token) => {
    axios
      .get(`${baseUrl}/api/wallet/balance/${userId}`, { headers: { token } })
      .then((response) => {
        setTotalAmount(response.data.balanceUSD);
        sessionStorage.setItem(
          "totalBalance",
          JSON.stringify(response.data.balanceUSD)
        );
      })
      .catch((error) => {});
  };

  const getKYC = (accessToken, userId) => {
    axios
      .get(`${baseUrl}/api/kyc/myKYC/${userId}`, {
        headers: { token: accessToken },
      })
      .then((response) => {
        setIsKYC(response?.data?.kyc.status);
      })
      .catch((error) => {});
  };

  const formatNumber = (number) => {
    return Number(number).toLocaleString();
  };

  // Get Loans
  const getAllLoans = (accessToken, _id) => {
    setisLoadingTransactions(true);
    axios
      .get(`${baseUrl}/api/loan/${_id}`, {
        headers: { token: accessToken },
      })
      .then((data) => {
        setisLoadingTransactions(false);

        setloanHistory(data.data.loan);
        sessionStorage.setItem(
          "loans",
          JSON.stringify(
            data.data.loan
              .filter((deposits) => deposits.status === "pending")
              .reduce((accumulator, { amount }) => accumulator + amount / 1, 0)
          )
        );
      })
      .catch((error) => {
        setisLoadingTransactions(false);
      });
  };

  const getUserWithdrawals = (token, id) => {
    setisLoadingTransactions(true);

    axios
      .get(`${baseUrl}/api/wallet/withdrawals/${id}`, { headers: { token } })
      .then((response) => {
        setisLoadingTransactions(false);

        setuserWithdrawals(response.data.withdrawals);
        setTotalWithdrawal(response.data.totalAmount);
        setPendingWithdrawal(response.data.pendingTotal);
      })
      .catch((error) => {
        setisLoadingTransactions(false);
      });
  };

  const getAllDeposits = (accessToken, userId) => {
    setisLoadingTransactions(true);

    axios
      .get(`${baseUrl}/api/deposit/${userId}`, {
        headers: { token: accessToken },
      })
      .then((data) => {
        setisLoadingTransactions(false);

        sessionStorage.setItem(
          "deposits",
          JSON.stringify(
            data.data.deposit
              .filter((deposits) => deposits.status === "approved")
              .reduce((accumulator, { amount }) => accumulator + amount / 1, 0)
          )
        );
        setDepositHistory(data.data.deposit);
      })
      .catch((error) => {
        setisLoadingTransactions(false);
      });
  };

  const closePendingKYCModal = () => {
    setShowPendingModal(false);
    window.location.reload();
  };
  const closeKYCModal = () => {
    setShowKYCModal(false);
    window.location.reload();
  };
  const closeOTPModal = () => {
    setShowOTPModal(false);
    window.location.reload();
  };
  const getPendingDepositsAmount = () => {
    return depositHistory
      .filter((deposit) => deposit.status === "pending")
      .reduce((accumulator, { amount }) => accumulator + amount / 1, 0);
  };

  return (
    <AppContext.Provider
      value={{
        userNav,
        setUserNav,
        toggleNave,
        headerNav,
        setHeaderNav,
        activeTab,
        terms,
        random,
        setRandom,
        copy,
        setCopy,
        baseUrl,
        totalAmount,
        setUserData,
        userData,
        kycStatus,
        setKycStatus,
        getUser,
        getUserKYC,
        isMenuOpen,
        setIsMenuOpen,
        selectedTransferMethod,
        setSelectedTransferMethod,
        getAllCard,
        userCards,
        formatNumber,
        getTotalBalance,
        getKYC,
        isKYC,
        setShowOTPModal,
        showOTPModal,
        setShowSuccessModal,
        showSuccessModal,
        showKYCModal,
        setShowKYCModal,
        setShowPendingModal,
        showPendingModal,
        closeKYCModal,
        closePendingKYCModal,
        setShowTransferPendingModal,
        showTransferPendingModal,
        closeOTPModal,
        getUserWithdrawals,
        userWithdrawals,
        totalWithdrawal,
        getAllDeposits,
        depositHistory,
        successfulDepositsAmount,
        pendingWithdrawal,
        getAllLoans,
        loanHistory,
        getPendingDepositsAmount,
        isLoadingTransactions,
        setLoading,
        loading,
        setPathHistory,
        pathHistory,
        setCardFormData,
        cardFormData,
        userDetails: userData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };
