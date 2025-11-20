import React, { useState, useEffect, useCallback } from "react";

const Clock = () => {
  // Memoize the format function
  const formatTime = useCallback((date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }, []);

  const [currentTime, setCurrentTime] = useState(() => {
    const now = new Date();
    return formatTime(now);
  });

  useEffect(() => {
    // Use requestAnimationFrame for better performance
    let animationFrameId;
    let lastUpdate = 0;
    const updateInterval = 1000; // Update every second

    const updateClock = (timestamp) => {
      if (timestamp - lastUpdate >= updateInterval) {
        setCurrentTime(formatTime(new Date()));
        lastUpdate = timestamp;
      }
      animationFrameId = requestAnimationFrame(updateClock);
    };

    animationFrameId = requestAnimationFrame(updateClock);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [formatTime]);

  return <h3 className="medium_tiny_text">{currentTime}</h3>;
};

export default React.memo(Clock);
