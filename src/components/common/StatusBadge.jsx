// Reusable Status Badge Component
// Front-End Engineering II (Lectures 25–30: Reusable Components & Conditional Rendering)

export function StatusBadge({ status }) {
  const normalized = (status || "pending").toLowerCase();

  let label = status;
  let icon = "•";

  switch (normalized) {
    case "confirmed":
      label = "Confirmed";
      icon = "✓";
      break;
    case "completed":
      label = "Completed";
      icon = "✔";
      break;
    case "rescheduled":
      label = "Rescheduled";
      icon = "⟳";
      break;
    case "cancelled":
      label = "Cancelled";
      icon = "✕";
      break;
    case "pending":
      label = "Pending";
      icon = "⏳";
      break;
    default:
      label = status;
  }

  return (
    <span className={`status-badge ${normalized}`} title={`Status: ${label}`}>
      <span>{icon}</span> {label}
    </span>
  );
}

export default StatusBadge;
