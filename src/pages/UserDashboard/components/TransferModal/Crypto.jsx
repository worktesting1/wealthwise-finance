import { useLocation } from "react-router-dom";

function Crypto({ register }) {
  const { pathname } = useLocation();
  const isDeposit = pathname === "/dashboard/deposit";
  return (
    <>
      <p className="tiny_text">Cryptocurrency Name</p>
      <input
        disabled={isDeposit}
        type="text"
        placeholder="Cryptocurrency name"
        {...register("cryptocurrency")}
      />
      <p className="tiny_text">Network</p>
      <input
        disabled={isDeposit}
        type="text"
        placeholder="Cryptocurrency Network"
        {...register("network")}
      />
      <p className="tiny_text">Wallet Address</p>
      <input
        disabled={isDeposit}
        type="text"
        placeholder="Wallet address"
        {...register("destinationAddress")}
      />
    </>
  );
}

export default Crypto;
