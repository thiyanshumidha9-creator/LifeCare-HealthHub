// Loading Spinner Component (Lectures 67–72: Async Loading States)

export function LoadingSpinner({ text = "Loading...", size = "md" }) {
  const sizeMap = {
    sm: 24,
    md: 40,
    lg: 56
  };
  const dimension = sizeMap[size] || 40;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px 10px",
        gap: "12px"
      }}
      role="status"
      aria-live="polite"
    >
      <svg
        width={dimension}
        height={dimension}
        viewBox="0 0 50 50"
        style={{
          animation: "spin 1s linear infinite"
        }}
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="#e2ecf2"
          strokeWidth="4"
        />
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="#087f8c"
          strokeWidth="4"
          strokeDasharray="80"
          strokeDashoffset="60"
        />
      </svg>
      {text && <p style={{ color: "#607d8b", fontSize: "0.9rem", fontWeight: 500 }}>{text}</p>}
      <style>{`
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default LoadingSpinner;
