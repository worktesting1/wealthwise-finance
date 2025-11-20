const TimeAgo = ({ timestamp }) => {
  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const diff = Math.floor(diffInSeconds / secondsInUnit);
      if (diff !== 0) {
        return rtf.format(-diff, unit); // Negative for past times
      }
    }

    return "just now";
  };

  return <span>{getTimeAgo(timestamp)}</span>;
};

export default TimeAgo;
