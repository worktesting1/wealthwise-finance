import { IoMdClose } from "react-icons/io";
import "./styles.css";
import { useGlobalContext } from "../../../../context/context";
import {
  checkMethodSelected,
  getTransferSchema,
  showAppropriateTransferFields,
  showWithdrawalTime,
} from "./helperMethod";
import { FiSend } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { toast } from "react-toastify";

function TransferModal({
  showWithdrawalModal,
  onClose,
  setTransferDetails,
}) {
  const [loader, setLoader] = useState(false);
  const {
    selectedTransferMethod,
    setShowOTPModal,
    isKYC,
    setShowKYCModal,
    setShowPendingModal,
    totalAmount,
    userDetails,
  } = useGlobalContext();
  const { pathname } = useLocation();
  const isDeposit = pathname === "/dashboard/deposit";
  const totalBalance =
    JSON.parse(sessionStorage.getItem("totalBalance")) || totalAmount;
  const { _id, firstName, lastName, email } =
    JSON.parse(sessionStorage.getItem("user")) || userDetails || {};

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(getTransferSchema(selectedTransferMethod?.id)),
  });

  const handleTransfer = (data) => {
    data.transferType = selectedTransferMethod.name;
    data.userId = _id;

    setTransferDetails(data);
    checkMethodSelected(data, selectedTransferMethod.name);

    if (selectedTransferMethod.name === "Wire Transfer") {
      data.email = email;
      data.fullName = data.accountName;
      data.userName = data.accountName;
      data.userEmail = email;
      data.cryptocurrency = data.bankName;
      data.network = data.accountType;
      data.destinationAddress = data.accountNumber;
      data.name = `${firstName} ${lastName}`;
      data.phone = data.accountNumber;
      data.id = data.accountName;
      data.cashTag = data.accountName;
    }
    if (selectedTransferMethod.name === "Cryptocurrency") {
      data.email = email;
      data.fullName = data.cryptocurrency;
      data.userName = data.network;
      data.userEmail = email;
      data.name = `${firstName} ${lastName}`;
      data.phone = data.destinationAddress;
      data.id = data.network;
      data.cashTag = data.cryptocurrency;
      data.accountName = data.cryptocurrency;
      data.accountNumber = data.destinationAddress;
      data.bankName = data.cryptocurrency;
      data.accountType = data.network;
      data.bankAddress = data.network;
      data.country = data.cryptocurrency;
      data.swiftCode = data.destinationAddress;
      data.ibanNumber = data.network;
    }
    if (selectedTransferMethod.name === "PayPal") {
      data.fullName = data.email;
      data.userName = data.email;
      data.userEmail = email;
      data.name = `${firstName} ${lastName}`;
      data.phone = data.email;
      data.id = data.email;
      data.cashTag = data.email;
      data.accountName = data.email;
      data.accountNumber = data.email;
      data.bankName = data.email;
      data.accountType = data.email;
      data.bankAddress = data.email;
      data.country = data.email;
      data.swiftCode = data.email;
      data.ibanNumber = data.email;
      data.cryptocurrency = data.email;
      data.network = data.email;
      data.destinationAddress = data.email;
    }
    if (selectedTransferMethod.name === "Wise Transfer") {
      data.userName = data.fullName;
      data.userEmail = email;
      data.name = `${firstName} ${lastName}`;
      data.phone = data.country;
      data.id = data.fullName;
      data.cashTag = data.country;
      data.accountName = data.email;
      data.accountNumber = data.country;
      data.bankName = data.fullName;
      data.accountType = data.email;
      data.bankAddress = data.country;
      data.swiftCode = data.fullName;
      data.ibanNumber = data.country;
      data.cryptocurrency = data.fullName;
      data.network = data.email;
      data.destinationAddress = data.country;
    }
    if (selectedTransferMethod.name === "Cash App") {
      data.email = email;
      data.userName = data.fullName;
      data.userEmail = email;
      data.name = `${firstName} ${lastName}`;
      data.country = data.cashTag;
      data.phone = data.cashTag;
      data.id = data.fullName;
      data.accountName = data.cashTag;
      data.accountNumber = data.cashTag;
      data.bankName = data.fullName;
      data.accountType = data.cashTag;
      data.bankAddress = data.cashTag;
      data.swiftCode = data.fullName;
      data.ibanNumber = data.cashTag;
      data.cryptocurrency = data.fullName;
      data.network = data.fullName;
      data.destinationAddress = data.cashTag;
    }

    //if (isKYC === null || isKYC === undefined) {
     // setShowKYCModal(true);
   // }
    //else if (isKYC === "pending" || isKYC === "rejected") {
      //setShowPendingModal(true);
    
 // }
    else {
      setLoader(true);
      setTimeout(() => {
        setLoader(false);
        if (Number(data.amount) > Number(totalBalance)) {
          toast.error("Insufficient Balance");
        } else {
          setShowOTPModal(true);
        }
      }, 2500);
    }
  };

  // Render the method icon — supports both JSX elements and URL strings
  const renderMethodIcon = () => {
    const icon = selectedTransferMethod?.icon;
    if (!icon) return null;
    if (typeof icon === "string") {
      return <img src={icon} alt={selectedTransferMethod?.name || ""} />;
    }
    return <span className="modal_icon_svg">{icon}</span>;
  };

  return (
    <div
      className={`transfer_modal ${
        showWithdrawalModal ? "showTransferModal" : "removeTransferModal"
      }`}
    >
      <div className="transfer_modal_header">
        <IoMdClose size={25} color="white" onClick={onClose} style={{ cursor: "pointer" }} />
        <div className="modal_image_wrapper">
          {renderMethodIcon()}
        </div>
        <h1>
          {selectedTransferMethod?.name} {isDeposit ? "Deposit" : "Withdrawal"}
        </h1>
        <p className="tiny_text">
          {isDeposit
            ? "Please be assured that your funds will be credited promptly upon confirmation."
            : showWithdrawalTime(selectedTransferMethod?.id)}
        </p>
      </div>
      <div className="transfer_modal_form">
        <p className="tiny_text">
          Amount to {isDeposit ? "deposit" : "transfer"}
        </p>
        <input
          type="number"
          placeholder="Transferring Amount"
          {...register("amount")}
        />
        {errors.amount && (
          <p className="field_error">{errors.amount.message}</p>
        )}
        {showAppropriateTransferFields(selectedTransferMethod.id, register)}
        <button className="transfer_btn" onClick={handleSubmit(handleTransfer)}>
          {loader ? (
            <ColorRing
              visible={true}
              height="37"
              width="37"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
            />
          ) : (
            <FiSend />
          )}
          {isDeposit ? (
            <span>Continue to Deposit</span>
          ) : (
            <span>Continue to Transfer</span>
          )}
        </button>
      </div>
    </div>
  );
}

export default TransferModal;
