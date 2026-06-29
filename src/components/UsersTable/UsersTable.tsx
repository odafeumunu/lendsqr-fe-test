import { useState, useRef } from "react";
import { flexRender } from "@tanstack/react-table";
import { SlidersHorizontal } from "lucide-react";
import type { User } from "../../types/user";
import type { UserFilters } from "../../types/filters";
import { useUsersTable } from "./useUsersTable";
import TablePagination from "./TablePagination";
import TableSkeleton from "./TableSkeleton";
import TableEmptyState from "./TableEmptyState";
import TableErrorState from "./TableErrorState";
import FilterPanel from "../FilterPanel/FilterPanel";
import "./UserTable.scss";

interface UsersTableProps {
  users: User[];
  allUsers: User[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  onRetry: () => void;
  globalFilter: string;
  onClearSearch: () => void;
  filters: UserFilters;
  onApplyFilters: (filters: UserFilters) => void;
  onResetFilters: () => void;
}

function UsersTable({
  users,
  allUsers,
  isLoading,
  isError,
  errorMessage,
  onRetry,
  globalFilter,
  onClearSearch,
  filters,
  onApplyFilters,
  onResetFilters,
}: UsersTableProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [panelPosition, setPanelPosition] = useState({ top: 0, right: 0 });
  const filterTriggerRef = useRef<HTMLButtonElement>(null);
  const table = useUsersTable(users, globalFilter);

  const organizations = Array.from(
    new Set(allUsers.map((u) => u.organization))
  ).sort();
  const hasActiveFilters = Object.values(filters).some(Boolean);

  const handleToggleFilter = () => {
    if (!isFilterOpen && filterTriggerRef.current) {
      const rect = filterTriggerRef.current.getBoundingClientRect();
      setPanelPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
    setIsFilterOpen((prev) => !prev);
  };

  if (isLoading) {
    return (
      <div className="users-table">
        <TableSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="users-table">
        <TableErrorState message={errorMessage} onRetry={onRetry} />
      </div>
    );
  }

  const rows = table.getRowModel().rows;

  return (
    <div className="users-table">
      <div className="users-table__toolbar">
        <button
          type="button"
          className="users-table__filter-trigger"
          onClick={handleToggleFilter}
          aria-haspopup="true"
          aria-expanded={isFilterOpen}>
          <SlidersHorizontal size={16} />
          Filter
          {hasActiveFilters && (
            <span
              className="users-table__filter-dot"
              aria-label="Filters active"
            />
          )}
        </button>

        <FilterPanel
          isOpen={isFilterOpen}
          position={panelPosition}
          organizations={organizations}
          initialFilters={filters}
          onApply={onApplyFilters}
          onReset={onResetFilters}
          onClose={() => setIsFilterOpen(false)}
        />
      </div>

      {rows.length === 0 ? (
        <TableEmptyState
          hasActiveSearch={globalFilter.length > 0 || hasActiveFilters}
          onClearSearch={() => {
            onClearSearch();
            onResetFilters();
          }}
        />
      ) : (
        <>
          <div className="users-table__scroll">
            <div className="users-table__row users-table__row--head" role="row">
              {table.getHeaderGroups()[0].headers.map((header) => (
                <button
                  key={header.id}
                  type="button"
                  role="columnheader"
                  className="users-table__head-cell"
                  onClick={header.column.getToggleSortingHandler()}
                  disabled={!header.column.getCanSort()}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getIsSorted() === "asc" && " ▲"}
                  {header.column.getIsSorted() === "desc" && " ▼"}
                </button>
              ))}
            </div>

            {rows.map((row) => (
              <div key={row.id} className="users-table__row" role="row">
                {row.getVisibleCells().map((cell) => (
                  <div key={cell.id} className="users-table__cell" role="cell">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="users-table__footer">
            <p className="users-table__count">
              Showing{" "}
              <span className="users-table__count-badge">{rows.length}</span>{" "}
              out of {users.length}
            </p>
            <TablePagination table={table} />
          </div>
        </>
      )}
    </div>
  );
}

export default UsersTable;
