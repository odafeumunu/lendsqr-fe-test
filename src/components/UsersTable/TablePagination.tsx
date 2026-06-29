import type { Table } from "@tanstack/react-table";
import type { User } from "../../types/user";
import "./TablePagination.scss";

interface TablePaginationProps {
  table: Table<User>;
}

function TablePagination({ table }: TablePaginationProps) {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();

  const renderPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("ellipsis");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("ellipsis");
      pages.push(totalPages);
    }

    return pages.map((page, idx) =>
      page === "ellipsis" ? (
        <span key={`ellipsis-${idx}`} className="pagination__ellipsis">
          …
        </span>
      ) : (
        <button
          key={page}
          type="button"
          className={
            page === currentPage
              ? "pagination__page pagination__page--active"
              : "pagination__page"
          }
          onClick={() => table.setPageIndex(page - 1)}
          aria-current={page === currentPage ? "page" : undefined}
          aria-label={`Go to page ${page}`}>
          {page}
        </button>
      )
    );
  };

  if (totalPages <= 1) return null;

  return (
    <nav className="pagination" aria-label="Table pagination">
      <button
        type="button"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        aria-label="Previous page">
        <img src="/leftVector.png" alt="" />
      </button>

      {renderPageNumbers()}

      <button
        type="button"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        aria-label="Next page">
        <img src="/np_next.png" alt="" />
      </button>
    </nav>
  );
}

export default TablePagination;
