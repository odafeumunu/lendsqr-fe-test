import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "../../components/HeaderComp/Header";
import Sidebar from "../../components/SidebarComp/Sidebar";
import Content from "../../components/ContentComp/Content";
import { useUsers } from "../../hooks/useUser";
import type { UserFilters } from "../../types/filters";
// import "./Dashboard.scss";

const FILTER_KEYS: (keyof UserFilters)[] = [
  "organization",
  "username",
  "email",
  "date",
  "phone",
  "status",
];

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("q") ?? "";

  const filters: UserFilters = FILTER_KEYS.reduce((acc, key) => {
    const value = searchParams.get(key);
    if (value) acc[key] = value as never;
    return acc;
  }, {} as UserFilters);

  const { data: users, isLoading, isError, error, refetch } = useUsers();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleSearchChange = (value: string) => {
    const next = new URLSearchParams(searchParams);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    value ? next.set("q", value) : next.delete("q");
    setSearchParams(next);
  };

  const handleApplyFilters = (newFilters: UserFilters) => {
    const next = new URLSearchParams(searchParams);
    FILTER_KEYS.forEach((key) => {
      const value = newFilters[key];
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      value ? next.set(key, value) : next.delete(key);
    });
    setSearchParams(next);
  };

  const handleResetFilters = () => {
    const next = new URLSearchParams(searchParams);
    FILTER_KEYS.forEach((key) => next.delete(key));
    setSearchParams(next);
  };

  return (
    <>
      <Helmet>
        <title>Lendsqr Assessment || Dashboard</title>
      </Helmet>
      <div className="dashboard">
        <Header
          toggleSidebar={toggleSidebar}
          searchValue={searchQuery}
          onSearchChange={handleSearchChange}
        />
        <Sidebar isOpen={isSidebarOpen} />
        <Content
          users={users ?? []}
          isLoading={isLoading}
          isError={isError}
          errorMessage={
            error instanceof Error ? error.message : "Something went wrong."
          }
          onRetry={refetch}
          searchQuery={searchQuery}
          onClearSearch={() => handleSearchChange("")}
          filters={filters}
          onApplyFilters={handleApplyFilters}
          onResetFilters={handleResetFilters}
        />
      </div>
    </>
  );
}

export default Dashboard;
