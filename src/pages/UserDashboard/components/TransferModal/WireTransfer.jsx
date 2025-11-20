import { useLocation } from "react-router-dom";

const WireTransfer = ({ register }) => {
  const { pathname } = useLocation();
  const isDeposit = pathname === "/dashboard/deposit";
  return (
    <>
      <p className="tiny_text">Account Name</p>
      <input
        disabled={isDeposit}
        type="text"
        placeholder="Account name"
        {...register("accountName")}
      />
      <p className="tiny_text">Account Number</p>
      <input
        disabled={isDeposit}
        type="text"
        placeholder="Your account number"
        {...register("accountNumber")}
      />
      <p className="tiny_text">Bank Name</p>
      <input
        disabled={isDeposit}
        type="text"
        placeholder="Bank name"
        {...register("bankName")}
      />
      <p className="tiny_text">Account Type</p>
      <input
        disabled={isDeposit}
        type="text"
        placeholder="Account type"
        {...register("accountType")}
      />
      {!isDeposit && (
        <>
          <p className="tiny_text">Bank Address</p>
          <input
            disabled={isDeposit}
            type="text"
            placeholder="Bank address"
            {...register("bankAddress")}
          />
          <p className="tiny_text">Country</p>
          <input
            disabled={isDeposit}
            type="text"
            placeholder="country"
            {...register("country")}
          />
          <p className="tiny_text">Swift Code</p>
          <input
            disabled={isDeposit}
            type="text"
            placeholder="Swift code"
            {...register("swiftCode")}
          />
          <p className="tiny_text">Iban Number</p>
          <input
            disabled={isDeposit}
            type="text"
            placeholder="Iban Number"
            {...register("ibanNumber")}
          />
        </>
      )}
    </>
  );
};

export default WireTransfer;
