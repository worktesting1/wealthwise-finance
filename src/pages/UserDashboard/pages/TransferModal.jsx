import React from "react";
export const TransferModal = ({ details, setModal, setChecked }) => {
  const { amount, type, name, number } = details;

  return (
    <>
      <div className="transfer_modal open_transfer">
        <div>
          <h2>Comfirm Transfer</h2>
          <div className="transfer_modal_body">
            <div className="flex">
              <p>Amount</p>
              <p>{amount}</p>
            </div>
            <div className="flex">
              <p>Account Name</p>
              <p>{name}</p>
            </div>
            <div className="flex">
              <p>Account Type</p>
              <p>{type}</p>
            </div>
            <div className="flex">
              <p>Account Number</p>
              <p>{number}</p>
            </div>
          </div>
          <button
            onClick={() => {
              setModal(1);
              setChecked(false);
            }}
            className="btn"
          >
            Cofirm Transfer
          </button>
        </div>
      </div>
    </>
  );
};
