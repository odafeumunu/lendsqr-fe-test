import "./TableErrorState.scss";

interface TableErrorStateProps {
  message: string;
  onRetry: () => void;
}

function TableErrorState({ message, onRetry }: TableErrorStateProps) {
  return (
    <div className="table-error-state" role="alert">
      <svg
        width="150"
        height="130"
        viewBox="0 0 150 130"
        fill="none"
        role="img"
        aria-label="Illustration of a connection error">
        <path
          d="M75 20L130 110H20L75 20Z"
          fill="#FCEAEE"
          stroke="#E4033B"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <line
          x1="75"
          y1="55"
          x2="75"
          y2="80"
          stroke="#E4033B"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="75" cy="95" r="3" fill="#E4033B" />
        <circle cx="25" cy="30" r="3" fill="#39CDCC" opacity="0.4" />
        <circle cx="125" cy="40" r="4" fill="#39CDCC" opacity="0.3" />
      </svg>

      <p className="table-error-state__title">Couldn&apos;t load users</p>
      <p className="table-error-state__message">{message}</p>
      <button
        type="button"
        className="table-error-state__retry"
        onClick={onRetry}>
        Try again
      </button>
    </div>
  );
}

export default TableErrorState;
