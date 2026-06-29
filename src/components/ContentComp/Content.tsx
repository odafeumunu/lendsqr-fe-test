import StatCards from "../StatCards/StatCards";
import UsersTable from "../UsersTable/UsersTable";
import type { User } from "../../types/user";
import type { UserFilters } from "../../types/filters";
import { filterUsers } from "../../utils/filterUsers";
import "./Content.scss";

interface ContentProps {
  users: User[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  onRetry: () => void;
  searchQuery: string;
  onClearSearch: () => void;
  filters: UserFilters;
  onApplyFilters: (filters: UserFilters) => void;
  onResetFilters: () => void;
}

function Content({
  users,
  isLoading,
  isError,
  errorMessage,
  onRetry,
  searchQuery,
  onClearSearch,
  filters,
  onApplyFilters,
  onResetFilters,
}: ContentProps) {
  const filteredUsers = filterUsers(users, filters);

  return (
    <div className="content-body">
      <div className="container">
        <p className="user-p">Users</p>

        <StatCards users={users} isLoading={isLoading} />

        <UsersTable
          users={filteredUsers}
          allUsers={users}
          isLoading={isLoading}
          isError={isError}
          errorMessage={errorMessage}
          onRetry={onRetry}
          globalFilter={searchQuery}
          onClearSearch={onClearSearch}
          filters={filters}
          onApplyFilters={onApplyFilters}
          onResetFilters={onResetFilters}
        />
      </div>
    </div>
  );
}

export default Content;
