import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MoreHorizontal, Eye, UserX, UserCheck } from "lucide-react";
import "./ActionMenu.scss";

interface ActionMenuProps {
  userId: number;
  onBlacklist?: (id: number) => void;
  onActivate?: (id: number) => void;
}

function ActionMenu({ userId, onBlacklist, onActivate }: ActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="action-menu" ref={menuRef}>
      <button
        type="button"
        className="action-menu__trigger"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Open user actions">
        <MoreHorizontal size={18} />
      </button>

      {isOpen && (
        <div className="action-menu__dropdown" role="menu">
          <Link
            to={`/userdetail/${userId}`}
            className="action-menu__item"
            role="menuitem"
            onClick={() => setIsOpen(false)}>
            <Eye size={16} />
            View Details
          </Link>
          <button
            type="button"
            className="action-menu__item"
            role="menuitem"
            onClick={() => {
              onBlacklist?.(userId);
              setIsOpen(false);
            }}>
            <UserX size={16} />
            Blacklist User
          </button>
          <button
            type="button"
            className="action-menu__item"
            role="menuitem"
            onClick={() => {
              onActivate?.(userId);
              setIsOpen(false);
            }}>
            <UserCheck size={16} />
            Activate User
          </button>
        </div>
      )}
    </div>
  );
}

export default ActionMenu;
