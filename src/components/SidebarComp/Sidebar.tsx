// src/components/SidebarComp/Sidebar.tsx
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import "./Sidebar.scss";

interface SidebarProps {
  isOpen: boolean;
}

const items = [
  {
    id: 1,
    link: "/userdetail/1",
    name: "User",
    img: "/users 1.png",
    available: true,
  },
  {
    id: 2,
    link: "/",
    name: "Guarantors",
    img: "/user-friends 1.png",
    available: false,
  },
  { id: 3, link: "/", name: "Loans", img: "/Group 104.png", available: false },
  {
    id: 4,
    link: "/",
    name: "Decision Models",
    img: "/handshake-regular 1.png",
    available: false,
  },
  {
    id: 5,
    link: "/",
    name: "Savings",
    img: "/piggy-bank 1.png",
    available: false,
  },
  {
    id: 6,
    link: "/",
    name: "Loan Requests",
    img: "/user-friends 1.png",
    available: false,
  },
  {
    id: 7,
    link: "/",
    name: "Whitelist",
    img: "/user-check 1.png",
    available: false,
  },
  {
    id: 8,
    link: "/",
    name: "Karma",
    img: "/user-times 1.png",
    available: false,
  },
];

const items1 = [
  {
    id: 1,
    link: "/",
    name: "Organisation",
    img: "/briefcase 1.png",
    available: false,
  },
  {
    id: 2,
    link: "/",
    name: "Loan Products",
    img: "/Group 104.png",
    available: false,
  },
  {
    id: 3,
    link: "/",
    name: "Savings Products",
    img: "np_bank_148501_000000 1.png",
    available: false,
  },
  {
    id: 4,
    link: "/",
    name: "Fees and Charges",
    img: "/coins-solid 1.png",
    available: false,
  },
  {
    id: 5,
    link: "/",
    name: "Transactions",
    img: "/icon.png",
    available: false,
  },
  {
    id: 6,
    link: "/",
    name: "Services",
    img: "/galaxy 1.png",
    available: false,
  },
  {
    id: 7,
    link: "/",
    name: "Service Account",
    img: "/user-cog 1.png",
    available: false,
  },
  {
    id: 8,
    link: "/",
    name: "Settlement",
    img: "/scroll 1.png",
    available: false,
  },
  {
    id: 9,
    link: "/",
    name: "Reports",
    img: "/chart-bar 2.png",
    available: false,
  },
];

const items2 = [
  {
    id: 1,
    link: "/",
    name: "Preferences",
    img: "/sliders-h 1.png",
    available: false,
  },
  {
    id: 2,
    link: "/",
    name: "Fees and Pricing",
    img: "/badge-percent 1.png",
    available: false,
  },
  {
    id: 3,
    link: "/",
    name: "Audit Logs",
    img: "/clipboard-list 1.png",
    available: false,
  },
  {
    id: 4,
    link: "/",
    name: "Systems Messages",
    img: "/tire 1.png",
    available: false,
  },
];

function Sidebar({ isOpen }: SidebarProps) {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const renderItem = (item: {
    id: number;
    link: string;
    name: string;
    img: string;
    available: boolean;
  }) =>
    item.available ? (
      <NavLink
        key={item.id}
        to={item.link}
        className={({ isActive }) =>
          isActive ? "link-text active" : "link-text"
        }>
        <img className="link-text-img" src={item.img} alt={item.name} />
        {item.name}
      </NavLink>
    ) : (
      <span
        key={item.id}
        className="link-text link-text--disabled"
        title="Not available in this build">
        <img className="link-text-img" src={item.img} alt={item.name} />
        {item.name}
      </span>
    );

  return (
    <div className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
      <div className="new-bar" style={{ padding: "0 10px" }}>
        <form className="search-bar">
          <input type="search" placeholder="Search for anything!" required />
          <button type="submit">
            <img src="/search.png" alt="" />
          </button>
        </form>
      </div>

      <p className="p-text">
        <img className="p-text-img" src="/briefcase 1.png" alt="" />
        Switch Organisations
      </p>

      <div className="contt">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "link-text active" : "link-text"
          }>
          <img className="link-text-img" src="/home 1.png" alt="" />
          Dashboard
        </NavLink>
      </div>

      <div className="contt">
        <p className="psmall">Customer</p>
        {items.map(renderItem)}
      </div>

      <div className="contt">
        <p className="psmall">Businesses</p>
        {items1.map(renderItem)}
      </div>

      <div className="contt">
        <p className="psmall">Settings</p>
        {items2.map(renderItem)}
        <button
          type="button"
          className="link-text link-text--logout"
          onClick={handleLogout}>
          <img className="link-text-img" src="/sign-out 1.png" alt="" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
