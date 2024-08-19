function formatDuration(millis?: number): string {
  if (typeof millis !== "number") return "";

  const totalSeconds = Math.floor(millis / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
export default formatDuration;
