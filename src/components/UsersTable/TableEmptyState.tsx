import "./TableEmptyState.scss";

interface TableEmptyStateProps {
  hasActiveSearch: boolean;
  onClearSearch?: () => void;
}

function TableEmptyState({
  hasActiveSearch,
  onClearSearch,
}: TableEmptyStateProps) {
  return (
    <div className="table-empty-state" role="status">
      <svg
        width="160"
        height="130"
        viewBox="0 0 160 130"
        fill="none"
        role="img"
        aria-label="Illustration of an empty search result">
        <circle
          cx="65"
          cy="55"
          r="36"
          fill="#F4F6FA"
          stroke="#213F7D"
          strokeWidth="1.5"
        />
        <line
          x1="90"
          y1="80"
          x2="115"
          y2="105"
          stroke="#213F7D"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <line
          x1="50"
          y1="55"
          x2="80"
          y2="55"
          stroke="#545F7D"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.5"
        />
        <line
          x1="55"
          y1="45"
          x2="75"
          y2="45"
          stroke="#545F7D"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.3"
        />
        <line
          x1="55"
          y1="65"
          x2="75"
          y2="65"
          stroke="#545F7D"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.3"
        />
        <circle cx="130" cy="30" r="3" fill="#39CDCC" opacity="0.5" />
        <circle cx="20" cy="100" r="4" fill="#39CDCC" opacity="0.3" />
      </svg>

      <p className="table-empty-state__title">
        {hasActiveSearch ? "No users match your search" : "No users yet"}
      </p>
      <p className="table-empty-state__subtitle">
        {hasActiveSearch
          ? "Try adjusting your search or filters."
          : "Once users sign up, they'll show up here."}
      </p>
      {hasActiveSearch && onClearSearch && (
        <button
          type="button"
          className="table-empty-state__clear"
          onClick={onClearSearch}>
          Clear search
        </button>
      )}
    </div>
  );
}

export default TableEmptyState;
