// Error State with Retry Component (Lectures 67–72: Error Handling & Retry)

export function ErrorState({
  title = "Something went wrong",
  message = "Failed to load data from the service. Please check your connection and try again.",
  onRetry = null,
  retryText = "Retry Request"
}) {
  return (
    <div className="error-state" role="alert">
      <div className="error-state-icon">⚠️</div>
      <h3>{title}</h3>
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="btn btn-red" onClick={onRetry}>
          ⟳ {retryText}
        </button>
      )}
    </div>
  );
}

export default ErrorState;
