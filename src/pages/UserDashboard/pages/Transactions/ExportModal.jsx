import { useState } from "react";
import { useGlobalContext } from "../../../../context/context";
// jspdf blocked by security policy — PDF export temporarily unavailable
// eslint-disable-next-line
const jsPDF = function() { return { text:()=>{}, save:()=>{}, addImage:()=>{}, setFontSize:()=>{}, setFont:()=>{}, setTextColor:()=>{}, setFillColor:()=>{}, rect:()=>{}, line:()=>{}, internal:{ pageSize:{ getWidth:()=>595, getHeight:()=>842 } } }; };
// eslint-disable-next-line
const autoTable = () => {};

const ExportModal = ({ showExportModal, onClose, onExport }) => {
  const [exportType, setExportType] = useState("pdf"); // Default to PDF
  const [exportAs, setExportAs] = useState("download"); // Default to download
  const [statementStyle, setStatementStyle] = useState("classic");
  const {
    loanHistory,
    userWithdrawals,
    depositHistory,
    formatNumber,
    totalAmount,
    totalWithdrawal,
  } = useGlobalContext();
  const { firstName, lastName, email, accountNum } = JSON.parse(
    sessionStorage.getItem("user")
  );
  const totalBalance =
    JSON.parse(sessionStorage.getItem("totalBalance")) || totalAmount;
  const name = `${firstName} ${lastName}`;
  const userDetails = { name, email, accountNum };

  const transactions = [...loanHistory, ...userWithdrawals, ...depositHistory];

  // Sort by createdAt descending (most recent first)
  transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handleExport = () => {
    if (!exportType || !exportAs) {
      alert("Please select file format and export method");
      return;
    }

    if (exportType === "pdf") {
      const pdfDoc = generatePDF(userDetails, transactions);

      if (exportAs === "download") {
        pdfDoc.save("account_statement.pdf");
      } else if (exportAs === "view") {
        window.open(pdfDoc.output("bloburl"), "_blank");
      } else if (exportAs === "email") {
        // In a real app, you would send this to your backend for email delivery
        alert("Email functionality would be implemented here");
      }
    }

    onExport({
      type: exportType,
      method: exportAs,
      style: statementStyle,
    });
  };

  const generatePDF = (details, transactions) => {
    // Initialize jsPDF
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(20);
    doc.setTextColor(40);
    doc.text("Statement of Account", 105, 20, { align: "center" });

    // Add date
    doc.setFontSize(12);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 105, 30, {
      align: "center",
    });

    // Add divider line
    doc.setDrawColor(200);
    doc.line(20, 35, 190, 35);

    // Account Information
    doc.setFontSize(14);
    doc.text("ACCOUNT INFORMATION", 20, 45);

    doc.setFontSize(12);
    doc.text(`Name: ${details?.name}`, 20, 55);
    doc.text(`Email: ${details?.email}`, 20, 65);
    doc.text(`Account Number: ${details?.accountNum}`, 20, 75);

    // Statement Period
    doc.setFontSize(14);
    doc.text("Statement Period", 20, 90);

    doc.setFontSize(12);
    doc.text("- All Transactions", 20, 100);
    doc.text("- Account Type: Checking Account", 20, 110);

    // Account Summary - Using autoTable
    doc.setFontSize(14);
    doc.text("ACCOUNT SUMMARY", 20, 125);

    autoTable(doc, {
      startY: 130,
      head: [["OPENING BALANCE", "TOTAL CREDITS", "TOTAL DEBITS"]],
      body: [
        [
          "$0.00",
          `$${formatNumber(totalBalance + totalWithdrawal)}`,
          `$${formatNumber(totalWithdrawal)}`,
        ],
      ],
      theme: "grid",
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.text(`CLOSING BALANCE: $${formatNumber(totalBalance)}`, 20, 160);

    // Transaction History
    doc.setFontSize(14);
    doc.text("TRANSACTION HISTORY", 20, 175);

    // Convert transactions array to autoTable format
    const transactionRows = transactions.map((tx) => [
      tx.createdAt,
      tx.email,
      tx.type,
      tx.status,
      tx.txHash || tx.referenceNumber,
      `$${formatNumber(tx.amount)}`,
    ]);

    // Transactions table using autoTable
    autoTable(doc, {
      startY: 180,
      head: [["DATE", "EMAIL", "TYPE", "STATUS", "REFERENCE", "AMOUNT"]],
      body: transactionRows,
      theme: "grid",
      headStyles: { fillColor: [22, 160, 133] },
      styles: { fontSize: 10 },
      columnStyles: {
        0: { cellWidth: 30 }, // Date column
        1: { cellWidth: 40 }, // Description
        5: { cellWidth: 25 }, // Balance
      },
    });

    // Footer
    doc.setFontSize(10);
    const pageHeight = doc.internal.pageSize.height;
    doc.text(
      "Please contact our customer support at wealthwise@cosultant.online if you have any questions about this statement.",
      20,
      pageHeight - 30
    );
    doc.text(
      "All figures are shown in USD. This document serves as an official record of your account transactions.",
      20,
      pageHeight - 20
    );
    doc.text("WealthWise © 2025 All rights reserved", 105, pageHeight - 10, {
      align: "center",
    });
    doc.text("Page 1 of 1", 190, pageHeight - 10, { align: "right" });

    return doc;
  };

  if (!showExportModal) return null;

  return (
    <div className="export-modal-overlay">
      <div className="export-modal-container">
        {/* Background overlay */}
        <div className="export-modal-backdrop" aria-hidden="true"></div>

        {/* Modal container */}
        <div className="export-modal-content">
          {/* Close button */}
          <div className="export-modal-close">
            <button
              onClick={onClose}
              type="button"
              className="export-modal-close-btn"
            >
              <span className="sr-only">Close</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="export-modal-close-icon"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>

          {/* Modal content */}
          <div className="export-modal-header">
            <div className="export-modal-icon-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="export-modal-icon"
              >
                <path d="M12 15V3"></path>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <path d="m7 10 5 5 5-5"></path>
              </svg>
            </div>
            <h3 className="export-modal-title" id="export-title">
              Export Transactions
            </h3>
            <p className="export-modal-description">
              Download or receive your transaction data
            </p>
          </div>

          <div className="export-modal-body">
            <div className="export-modal-field">
              <label htmlFor="export-type" className="export-modal-label">
                File Format
              </label>
              <select
                id="export-type"
                value={exportType}
                onChange={(e) => setExportType(e.target.value)}
                className="export-modal-select"
              >
                <option value="">Select file type</option>
                <option value="pdf">PDF</option>
              </select>
            </div>

            <div className="export-modal-field">
              <label htmlFor="export-as" className="export-modal-label">
                Export as
              </label>
              <select
                id="export-as"
                value={exportAs}
                onChange={(e) => setExportAs(e.target.value)}
                className="export-modal-select"
              >
                <option value="">How do you want to receive this file?</option>
                <option value="view">Preview statement</option>
                <option value="download">Download file</option>
                <option value="email">Send file to email</option>
              </select>
            </div>

            <div className="export-modal-field">
              <label className="export-modal-label">Statement Style</label>
              <div className="export-style-grid">
                <div
                  onClick={() => setStatementStyle("modern")}
                  className={`export-style-option ${
                    statementStyle === "modern" ? "export-style-selected" : ""
                  }`}
                >
                  <div className="export-style-name">Modern</div>
                  <div className="export-style-preview">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="export-style-icon"
                    >
                      <rect width="7" height="9" x="3" y="3" rx="1"></rect>
                      <rect width="7" height="5" x="14" y="3" rx="1"></rect>
                      <rect width="7" height="9" x="14" y="12" rx="1"></rect>
                      <rect width="7" height="5" x="3" y="16" rx="1"></rect>
                    </svg>
                  </div>
                </div>
                <div
                  onClick={() => setStatementStyle("classic")}
                  className={`export-style-option ${
                    statementStyle === "classic" ? "export-style-selected" : ""
                  }`}
                >
                  <div className="export-style-name">Classic</div>
                  <div className="export-style-preview">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="export-style-icon"
                    >
                      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                      <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                      <path d="M10 9H8"></path>
                      <path d="M16 13H8"></path>
                      <path d="M16 17H8"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="export-modal-footer">
            <button
              onClick={handleExport}
              type="button"
              id="export-button"
              className="export-modal-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="export-modal-btn-icon"
              >
                <path d="M12 15V3"></path>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <path d="m7 10 5 5 5-5"></path>
              </svg>
              <span>Export Transactions</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
