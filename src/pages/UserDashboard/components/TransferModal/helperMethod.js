import Alipay from "./Alipay";
import CashApp from "./CashApp";
import Crypto from "./Crypto";
import Email from "./Email";
import Revolut from "./Revolut";
import Venmo from "./Venmo";
import WireTransfer from "./WireTransfer";
import WiseTransfer from "./WiseTransfer";
import Zelle from "./Zelle";
import * as yup from "yup";

export const showWithdrawalTime = (path) =>
  path === "cryptocurrency"
    ? `Withdrawals are typically processed within 1-3 hours.`
    : path === "wire-transfer"
    ? `Funds will reflect in the Beneficiary Account within 72hours.`
    : path === "paypal"
    ? `Funds will be sent to your PayPal account within 24 hours.`
    : path === "cash-app"
    ? "Withdrawals to Cash App are typically processed within 24 hours."
    : path === "wise-transfer"
    ? "Your funds will be processed within 1-2 business days."
    : path === "skrill"
    ? "Withdrawals to Skrill are processed within 24 hours."
    : path === "venmo"
    ? "Funds will be transferred to your Venmo account within 24 hours."
    : path === "wechat-pay"
    ? "Funds will be sent to your WeChat Pay account within 24-48 hours."
    : path === "alipay"
    ? "Withdrawals to Alipay are typically processed within 24-48 hours."
    : path === "revolut"
    ? "Funds will be transferred to your Revolut account within 1-2 business days."
    : "Funds will be sent to your Zelle account typically within a few hours.";

export const showAppropriateTransferFields = (field, register) =>
  field === "wire-transfer" ? (
    <WireTransfer register={register} />
  ) : field === "cryptocurrency" ? (
    <Crypto register={register} />
  ) : field === "paypal" || field === "skrill" ? (
    <Email name={field} register={register} />
  ) : field === "wise-transfer" ? (
    <WiseTransfer register={register} />
  ) : field === "cash-app" ? (
    <CashApp register={register} />
  ) : field === "venmo" ? (
    <Venmo register={register} />
  ) : field === "zelle" ? (
    <Zelle register={register} />
  ) : field === "revolut" ? (
    <Revolut register={register} />
  ) : field === "alipay" || field === "wechat-pay" ? (
    <Alipay name={field} register={register} />
  ) : (
    ""
  );

const wireTransferSchema = yup.object().shape({
  amount: yup.string().required(),
  accountName: yup.string().required(),
  accountNumber: yup.string().required(),
  accountType: yup.string().required(),
  bankName: yup.string().required(),
  bankAddress: yup.string().required(),
  country: yup.string().required(),
  swiftCode: yup.string().required(),
  ibanNumber: yup.string().required(),
});
const venmoTransferSchema = yup.object().shape({
  amount: yup.string().required(),
  userName: yup.string().required(),
  phone: yup.string().required(),
});
const phoneTransferSchema = yup.object().shape({
  amount: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  fullName: yup.string().required(),
});
const idTransferSchema = yup.object().shape({
  amount: yup.string().required(),
  fullName: yup.string().required(),
  id: yup.string().required(),
});

const wiseTransfer = yup.object().shape({
  amount: yup.string().required(),
  fullName: yup.string().required(),
  email: yup.string().email().required(),
  country: yup.string().required(),
});
const cashappTransfer = yup.object().shape({
  amount: yup.string().required(),
  fullName: yup.string().required(),
  cashTag: yup.string().required(),
});

const cryptoTransferSchema = yup.object().shape({
  amount: yup.string().required(),
  cryptocurrency: yup.string().required(),
  network: yup.string().required(),
  destinationAddress: yup.string().required(),
});
const emailTransferSchema = yup.object().shape({
  amount: yup.string().required(),
  email: yup.string().email().required(),
});

export const getTransferSchema = (method) => {
  switch (method) {
    case "wire-transfer":
      return wireTransferSchema;
    case "cryptocurrency":
      return cryptoTransferSchema;
    case "cash-app":
      return cashappTransfer;
    case "wise-transfer":
      return wiseTransfer;
    case "alipay":
      return idTransferSchema;
    case "venmo":
      return venmoTransferSchema;
    case "wechat-pay":
      return idTransferSchema;
    case "paypal":
      return emailTransferSchema;
    case "skrill":
      return emailTransferSchema;
    case "zelle":
      return phoneTransferSchema;
    case "revolut":
      return phoneTransferSchema;
    default:
      return yup.object().shape({});
  }
};

export const checkMethodSelected = (data, method) => {};
