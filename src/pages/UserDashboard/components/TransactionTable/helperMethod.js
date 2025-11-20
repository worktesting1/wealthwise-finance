import { FaPlus } from "react-icons/fa";
import { FiMinus } from "react-icons/fi";
import { MdClose } from "react-icons/md";

export const showAppropriateClr = (type) => {
  return type === "withdrawal"
    ? "red"
    : type === "deposit"
    ? "green"
    : "yellow";
};

export const showIcon = (type, status) => {
  return type && status === "pending" ? (
    <FiMinus />
  ) : type === "withdrawal" && status === "approved" ? (
    <FiMinus />
  ) : type &&
    type !== "withdrawal" &&
    (status === "approved" || status === "true") ? (
    <FaPlus />
  ) : (
    <MdClose />
  );
};
