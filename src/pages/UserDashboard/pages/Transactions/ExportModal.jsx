import { useState } from "react";
import { useGlobalContext } from "../../../../context/context";
import { CiExport } from "react-icons/ci";
import { MdClose } from "react-icons/md";

// jsPDF blocked by security policy — PDF export temporarily unavailable
// eslint-disable-next-line
const jsPDF = function () {
  return {
    text: () => {},
    save: () => {},
    addImage: () => {},
    setFontSize: () => {},
    setFont: () => {},
    setTextColor: () => {},
    setFillColor: () => {},
    rect: () => {},
    line: () => {},
    internal: { pageSize: { getWidth: () => 595, getHeight: () => 842 } },
  };
};
// eslint-disable-next-line
const autoTable = () => {};

const ExportModal = ({ showExportModal, onClose }) => {
  const [exportType, setExportType] = useState("pdf");
  const [exportAs, setExportAs] = useState("download");
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

  const transactions = [
    ...loanHistory,
    ...userWithdrawals,
    ...depositHistory,
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const generatePDF = (details, txns) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setTextColor(40);
    doc.text("Statement of Account", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 105, 30, {
      align: "center",
    });

    doc.setDrawColor(200);
    doc.line(20, 35, 190, 35);

    doc.setFontSize(14);
    doc.text("ACCOUNT INFORMATION", 20, 45);
    doc.setFontSize(12);
    doc.text(`Name: ${details?.name}`, 20, 55);
    doc.text(`Email: ${details?.email}`, 20, 65);
    doc.text(`Account Number: ${details?.accountNum}`, 20, 75);

    doc.setFontSize(14);
    doc.text("ACCOUNT SUMMARY", 20, 90);

    autoTable(doc, {
      startY: 95,
      head: [["OPENING BALANCE", "TOTAL CREDITS", "TOTAL DEBITS"]],
      body: [
        [
          "$0.00",
          `$${formatNumber(totalBalance + totalWithdrawal)}`,
          `$${formatNumber(totalWithdrawal)}`,
        ],
      ],
      theme: "grid",
      headStyles: { fillColor: [37, 99, 235] },
    });

    doc.text(`CLOSING BALANCE: $${formatNumber(totalBalance)}`, 20, 130);

    doc.setFontSize(14);
    doc.text("TRANSACTION HISTORY", 20, 145);

    const rows = txns.map((tx) => [
      tx.createdAt,
      tx.email,
      tx.type,
      tx.status === "true" ? "approved" : tx.status,
      tx.txHash || tx.referenceNumber,
      `$${formatNumber(tx.amount)}`,
    ]);

    autoTable(doc, {
      startY: 150,
      head: [["DATE", "EMAIL", "TYPE", "STATUS", "REFERENCE", "AMOUNT"]],
      body: rows,
      theme: "grid",
      headStyles: { fillColor: [37, 99, 235] },
      styles: { fontSize: 10 },
    });

    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFontSize(10);
    doc.text(
      "Contact support at wealthwise@consultant.online with any questions.",
      20,
      pageHeight - 20
    );
    doc.text("WealthWise © 2025 All rights reserved", 105, pageHeight - 10, {
      align: "center",
    });

    return doc;
  };

  const handleExport = () => {
    if (!exportType || !exportAs) {
      alert("Please select a file format and export method.");
      return;
    }

    if (exportType === "pdf") {
      const pdfDoc = generatePDF(userDetails, transactions);
      if (exportAs === "download") {
        pdfDoc.save("account_statement.pdf");
      } else if (exportAs === "view") {
        window.open(pdfDoc.output("bloburl"), "_blank");
      } else if (exportAs === "email") {
        alert("Email delivery would be implemented here.");
      }
    }

    onClose();
  };

  if (!showExportModal) return null;

  return (
    <div className="tx_modal_overlay">
      <div className="tx_modal_backdrop" onClick={onClose} />

      <div className="tx_modal_sheet">
        <div className="tx_modal_handle" />

        {/* Header */}
        <div className="tx_modal_header">
          <div className="tx_modal_title_wrap">
            <p className="tx_modal_title">Export Transactions</p>
            <p className="tx_modal_sub">Download your account statement</p>
          </div>
          <button className="tx_modal_close" onClick={onClose}>
            <MdClose />
          </button>
        </div>

        {/* File format */}
        <div className="tx_modal_field">
          <label className="tx_modal_label">File Format</label>
          <select
            className="tx_modal_select"
            value={exportType}
            onChange={(e) => setExportType(e.target.value)}
          >
            <option value="">Select format</option>
            <option value="pdf">PDF</option>
          </select>
        </div>

        {/* Export as */}
        <div className="tx_modal_field">
          <label className="tx_modal_label">Delivery</label>
          <select
            className="tx_modal_select"
            value={exportAs}
            onChange={(e) => setExportAs(e.target.value)}
          >
            <option value="">How to receive?</option>
            <option value="view">Preview in browser</option>
            <option value="download">Download file</option>
            <option value="email">Send to email</option>
          </select>
        </div>

        {/* Statement style */}
        <div className="tx_modal_field">
          <label className="tx_modal_label">Statement Style</label>
          <div className="tx_style_grid">
            {["classic", "modern"].map((style) => (
              <div
                key={style}
                className={`tx_style_opt ${statementStyle === style ? "active" : ""}`}
                onClick={() => setStatementStyle(style)}
              >
                <div className="tx_style_name">
                  {style.charAt(0).toUpperCase() + style.slice(1)}
                </div>
                <div className="tx_style_preview">
                  {style === "classic" ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
                      <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                      <path d="M10 9H8M16 13H8M16 17H8"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect width="7" height="9" x="3" y="3" rx="1"/>
                      <rect width="7" height="5" x="14" y="3" rx="1"/>
                      <rect width="7" height="9" x="14" y="12" rx="1"/>
                      <rect width="7" height="5" x="3" y="16" rx="1"/>
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button className="tx_modal_btn" onClick={handleExport}>
          <CiExport size={18} />
          <span>Export Transactions</span>
        </button>
      </div>
    </div>
  );
};

export default ExportModal;
