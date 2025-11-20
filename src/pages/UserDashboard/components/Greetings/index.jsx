import React, { useState, useEffect, useCallback } from "react";

const Greeting = ({ name }) => {
  const [greeting, setGreeting] = useState("");

  // Memoize the greeting calculation
  const getGreeting = useCallback(() => {
    const hour = new Date().getHours();
    if (hour < 12) return `Good Morning${name ? `, ${name}` : ""}`;
    if (hour < 18) return `Good Afternoon${name ? `, ${name}` : ""}`;
    return `Good Evening${name ? `, ${name}` : ""}`;
  }, [name]);

  useEffect(() => {
    // Update immediately
    setGreeting(getGreeting());

    // Set up interval to check for greeting changes
    const checkGreetingChange = () => {
      const newGreeting = getGreeting();
      if (newGreeting !== greeting) {
        setGreeting(newGreeting);
      }
    };

    // Check every hour (or more frequently if you want)
    const interval = setInterval(checkGreetingChange, 3600000); // 1 hour

    return () => clearInterval(interval);
  }, [getGreeting, greeting]);

  return <p className="tiny_text">{greeting}</p>;
};

export default React.memo(Greeting);
