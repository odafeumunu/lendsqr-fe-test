// src/components/HeaderComp/Header.tsx
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, ChevronDown, LogOut } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import "./Header.scss";

interface HeaderProps {
  toggleSidebar: () => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

function Header({ toggleSidebar, searchValue, onSearchChange }: HeaderProps) {
  const navigate = useNavigate();
  const userEmail = useAuthStore((state) => state.userEmail);
  const logout = useAuthStore((state) => state.logout);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <div
            className="toggle"
            onClick={toggleSidebar}
            role="button"
            tabIndex={0}
            aria-label="Toggle sidebar"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") toggleSidebar();
            }}>
            <div className="tog"></div>
            <div className="tog"></div>
            <div className="tog"></div>
          </div>
          <Link to="/dashboard">
            <img className="logo-img" src="/logo.png" alt="Lendsqr" />
          </Link>
        </div>

        <form
          className="search-bar"
          role="search"
          onSubmit={(e) => e.preventDefault()}>
          <input
            type="search"
            placeholder="Search for anything"
            aria-label="Search users"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <button type="submit" aria-label="Search">
            <img src="/search.png" alt="" />
          </button>
        </form>

        <div className="profile-cont">
          <a href="https://lendsqr.com/docs" target="_blank" rel="noreferrer">
            Docs
          </a>

          <Bell
            className="np_notification"
            size={20}
            aria-label="Notifications"
          />

          <div className="pro-user" ref={menuRef}>
            <button
              type="button"
              className="pro-user__trigger"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-haspopup="true"
              aria-expanded={isMenuOpen}>
              <img className="user_pro" src="/user.png" alt="" />
              <span>
                Admin
                <ChevronDown
                  size={16}
                  className={`np_dropdown ${
                    isMenuOpen ? "np_dropdown--open" : ""
                  }`}
                />
              </span>
            </button>

            {isMenuOpen && (
              <div className="pro-user__menu" role="menu">
                <p className="pro-user__email">
                  {userEmail ?? "lendsqr@gmail.com"}
                </p>
                <button
                  type="button"
                  className="pro-user__logout"
                  onClick={handleLogout}
                  role="menuitem">
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
