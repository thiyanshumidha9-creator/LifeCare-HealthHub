// Empty State Component (Lectures 25–30 & 67–72)

export function EmptyState({
  icon = "🔍",
  title = "No Results Found",
  message = "We couldn't find any items matching your criteria. Try adjusting your search or filters.",
  actionText = "",
  onAction = null
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{message}</p>
      {actionText && onAction && (
        <button type="button" className="btn btn-secondary" onClick={onAction}>
          {actionText}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
