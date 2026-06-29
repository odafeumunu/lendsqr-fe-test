import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "../../components/HeaderComp/Header";
import Sidebar from "../../components/SidebarComp/Sidebar";
import "./NotFound.scss";

function NotFound() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <>
      <Helmet>
        <title>Lendsqr Assessment || Page not found</title>
      </Helmet>
      <div className="dashboard">
        <Header
          toggleSidebar={toggleSidebar}
          searchValue=""
          onSearchChange={() => {}}
        />
        <Sidebar isOpen={isSidebarOpen} />
        <div className="content-body">
          <div className="container">
            <div className="not-found">
              <svg
                width="220"
                height="180"
                viewBox="0 0 220 180"
                fill="none"
                role="img"
                aria-label="Illustration of a lost document">
                <rect
                  x="60"
                  y="20"
                  width="100"
                  height="130"
                  rx="8"
                  fill="#F4F6FA"
                  stroke="#213F7D"
                  strokeWidth="1.5"
                />
                <line
                  x1="78"
                  y1="50"
                  x2="142"
                  y2="50"
                  stroke="#545F7D"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="78"
                  y1="68"
                  x2="142"
                  y2="68"
                  stroke="#545F7D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.6"
                />
                <line
                  x1="78"
                  y1="86"
                  x2="120"
                  y2="86"
                  stroke="#545F7D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.6"
                />
                <circle
                  cx="110"
                  cy="120"
                  r="26"
                  fill="#FFF"
                  stroke="#E4033B"
                  strokeWidth="2"
                />
                <text
                  x="110"
                  y="128"
                  textAnchor="middle"
                  fontSize="22"
                  fontWeight="600"
                  fill="#E4033B">
                  ?
                </text>
                <circle cx="40" cy="40" r="4" fill="#39CDCC" opacity="0.5" />
                <circle cx="185" cy="60" r="3" fill="#39CDCC" opacity="0.5" />
                <circle cx="180" cy="135" r="5" fill="#39CDCC" opacity="0.3" />
              </svg>

              <h1 className="not-found__title">Page not found</h1>
              <p className="not-found__message">
                The page you&apos;re looking for doesn&apos;t exist or may have
                moved.
              </p>
              <button
                type="button"
                className="not-found__cta"
                onClick={() => navigate("/dashboard")}>
                Go to dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
