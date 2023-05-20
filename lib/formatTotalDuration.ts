const formatTotalDuration = (durationMs: number) => {
  const seconds = Math.floor(durationMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const formattedDuration = [];

  if (days > 0) {
    formattedDuration.push(`${days} day${days > 1 ? "s" : ""}`);
  }
  if (hours % 24 > 0) {
    formattedDuration.push(`${hours % 24} hour${hours % 24 > 1 ? "s" : ""}`);
  }
  if (minutes % 60 > 0) {
    formattedDuration.push(
      `${minutes % 60} minute${minutes % 60 > 1 ? "s" : ""}`
    );
  }
  if (seconds % 60 > 0) {
    formattedDuration.push(
      `${seconds % 60} second${seconds % 60 > 1 ? "s" : ""}`
    );
  }

  return formattedDuration.join(",");
};
export default formatTotalDuration;
