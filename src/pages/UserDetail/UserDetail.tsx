import { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/HeaderComp/Header";
import Sidebar from "../../components/SidebarComp/Sidebar";
import ContentDetail from "../../components/ContentDetail/ContentDetail";

function UserDetail() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <>
      <Helmet>
        <title>Lendsqr Assessment || User Details</title>
      </Helmet>
      <div className="dashboard">
        <Header
          toggleSidebar={toggleSidebar}
          searchValue=""
          onSearchChange={() => {}}
        />
        <Sidebar isOpen={isSidebarOpen} />
        <ContentDetail />
      </div>
    </>
  );
}

export default UserDetail;
