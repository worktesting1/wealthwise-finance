import "./styles.css"; // We'll create this CSS file
import { useGlobalContext } from "../../../../context/context";
import TimeAgo from "../TimeAgo";
import { showAppropriateClr, showIcon } from "./helperMethod";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

const TransactionTable = ({ transactions }) => {
  const { formatNumber, isLoadingTransactions } = useGlobalContext();

  return (
    <div className="table-container">
      <table className="transaction-table">
        <thead className="table-header">
          <tr>
            <th></th>
            <th>Amount</th>
            <th>Type</th>
            <th>Status</th>
            <th>Reference ID</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {isLoadingTransactions
            ? [1, 2, 3].map((_, index) => (
                <tr key={index} className="skeleton_wrapper">
                  <td>
                    <span></span>
                  </td>
                  <td>
                    <div className="skeleton_wrapper">
                      <Skeleton
                        baseColor="#fff"
                        highlightColor="#e1babaff"
                        width={100}
                        height={25}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="skeleton_wrapper">
                      <Skeleton
                        baseColor="#fff"
                        highlightColor="#e1babaff"
                        width={100}
                        height={25}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="skeleton_wrapper">
                      <Skeleton
                        baseColor="#fff"
                        highlightColor="#e1babaff"
                        width={100}
                        height={25}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="skeleton_wrapper">
                      <Skeleton
                        baseColor="#fff"
                        highlightColor="#e1babaff"
                        width={100}
                        height={25}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="skeleton_wrapper">
                      <Skeleton
                        baseColor="#fff"
                        highlightColor="#e1babaff"
                        width={100}
                        height={25}
                      />
                    </div>
                  </td>
                </tr>
              ))
            : transactions.length > 0 &&
              transactions.map((transaction) => (
                <tr
                  key={transaction?._id}
                  className="table-row"
                  id={transaction?.id && transaction?.id}
                >
                  <td className="icon-cell">
                    <div
                      className={`icon-container ${showAppropriateClr(
                        transaction?.type
                      )}`}
                    >
                      {showIcon(transaction?.type, transaction?.status)}
                    </div>
                  </td>
                  <td className="amount-cell">
                    ${formatNumber(transaction?.amount)} USD
                  </td>
                  <td className="type-cell">
                    <span
                      className={`type-badge ${transaction?.type?.toLowerCase()}`}
                    >
                      {transaction?.type}
                    </span>
                  </td>
                  <td className="status-cell">
                    <span className={`status-badge ${transaction?.status}`}>
                      {transaction?.status === "true"
                        ? "approved"
                        : transaction.status}
                    </span>
                  </td>
                  <td className="reference-cell">{`FOR-${
                    transaction?.txHash
                      ? transaction?.txHash.slice(0, 12)
                      : transaction?.referenceNumber.slice(0, 12)
                  }`}</td>
                  <td className="created-cell">
                    {<TimeAgo timestamp={transaction?.createdAt} />}
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
      {isLoadingTransactions
        ? ""
        : transactions <= 0 && <p className="">No Transactions Yet</p>}
    </div>
  );
};

export default TransactionTable;
