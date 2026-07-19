/**
 * Returns a badge config object based on the isKYC value from context.
 * Normalised values after context.js lowercasing:
 *   null / undefined  → not submitted
 *   "pending"         → awaiting admin review
 *   "approved"        → approved
 *   "rejected"        → rejected
 */
export const getKYCBadgeConfig = (isKYC) => {
  const status =
    isKYC === null || isKYC === undefined
      ? null
      : String(isKYC).toLowerCase();

  switch (status) {
    case "approved":
      return { label: "KYC Verified", colorClass: "kyc-badge--verified" };
    case "pending":
      return { label: "KYC Pending", colorClass: "kyc-badge--pending" };
    case "rejected":
      return { label: "KYC Rejected", colorClass: "kyc-badge--rejected" };
    default:
      return { label: "Not Verified", colorClass: "kyc-badge--unverified" };
  }
};
