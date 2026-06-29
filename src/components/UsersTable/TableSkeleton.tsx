import "./TableSkeleton.scss";

function TableSkeleton({ rows = 10 }: { rows?: number }) {
  return (
    <div className="table-skeleton" role="status" aria-label="Loading users">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="table-skeleton__row">
          {Array.from({ length: 6 }).map((_, j) => (
            <div key={j} className="table-skeleton__cell" />
          ))}
        </div>
      ))}
    </div>
  );
}

export default TableSkeleton;
