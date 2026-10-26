// Reusable Pagination Component (Lectures 67–72: Pagination Workflows)

export function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav className="pagination" aria-label="Pagination Navigation">
      <button
        type="button"
        className="pagination-btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous Page"
      >
        ← Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          className={`pagination-btn ${p === currentPage ? "active" : ""}`}
          onClick={() => onPageChange(p)}
          aria-current={p === currentPage ? "page" : undefined}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        className="pagination-btn"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next Page"
      >
        Next →
      </button>
    </nav>
  );
}

export default Pagination;
