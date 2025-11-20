import React, { useState, useEffect, useCallback } from "react";

const CurrentDate = () => {
  const [currentDate, setCurrentDate] = useState("");

  // Memoize the date formatter to prevent recreation on every render
  const formatDate = useCallback((date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, []);

  useEffect(() => {
    // Update immediately
    setCurrentDate(formatDate(new Date()));

    // Set up interval to update at midnight
    const now = new Date();
    const msUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;

    const timer = setTimeout(() => {
      setCurrentDate(formatDate(new Date()));
      // After first midnight, update daily
      setInterval(() => {
        setCurrentDate(formatDate(new Date()));
      }, 86400000); // 24 hours
    }, msUntilMidnight);

    return () => clearTimeout(timer);
  }, [formatDate]);

  return <p className="tiny_text">{currentDate || "Loading date..."}</p>;
};

export default React.memo(CurrentDate);
