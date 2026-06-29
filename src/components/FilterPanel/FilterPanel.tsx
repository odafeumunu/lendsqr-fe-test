import { useState, useEffect, useRef } from "react";
import type { UserFilters } from "../../types/filters";
import type { UserStatus } from "../../types/user";
import "./FilterPanel.scss";

interface FilterPanelProps {
  isOpen: boolean;
  position: { top: number; right: number };
  organizations: string[];
  initialFilters: UserFilters;
  onApply: (filters: UserFilters) => void;
  onReset: () => void;
  onClose: () => void;
}

const STATUS_OPTIONS: UserStatus[] = [
  "active",
  "inactive",
  "pending",
  "blacklisted",
];

function FilterPanel({
  isOpen,
  position,
  organizations,
  initialFilters,
  onApply,
  onReset,
  onClose,
}: FilterPanelProps) {
  const [draft, setDraft] = useState<UserFilters>(initialFilters);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDraft(initialFilters);
  }, [initialFilters]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (field: keyof UserFilters, value: string) => {
    setDraft((prev) => ({ ...prev, [field]: value || undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(draft);
    onClose();
  };

  const handleReset = () => {
    setDraft({});
    onReset();
  };

  return (
    <div
      ref={panelRef}
      className="filter-panel"
      role="region"
      aria-label="Filter users"
      style={{ top: position.top, right: position.right }}>
      <form onSubmit={handleSubmit}>
        <div className="filter-panel__field">
          <label htmlFor="filter-organization">Organization</label>
          <select
            id="filter-organization"
            value={draft.organization ?? ""}
            onChange={(e) => handleChange("organization", e.target.value)}>
            <option value="">Select</option>
            {organizations.map((org) => (
              <option key={org} value={org}>
                {org}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-panel__field">
          <label htmlFor="filter-username">Username</label>
          <input
            id="filter-username"
            type="text"
            placeholder="User"
            value={draft.username ?? ""}
            onChange={(e) => handleChange("username", e.target.value)}
          />
        </div>

        <div className="filter-panel__field">
          <label htmlFor="filter-email">Email</label>
          <input
            id="filter-email"
            type="email"
            placeholder="Email"
            value={draft.email ?? ""}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        <div className="filter-panel__field">
          <label htmlFor="filter-date">Date</label>
          <input
            id="filter-date"
            type="date"
            value={draft.date ?? ""}
            onChange={(e) => handleChange("date", e.target.value)}
          />
        </div>

        <div className="filter-panel__field">
          <label htmlFor="filter-phone">Phone Number</label>
          <input
            id="filter-phone"
            type="tel"
            placeholder="Phone Number"
            value={draft.phone ?? ""}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>

        <div className="filter-panel__field">
          <label htmlFor="filter-status">Status</label>
          <select
            id="filter-status"
            value={draft.status ?? ""}
            onChange={(e) => handleChange("status", e.target.value)}>
            <option value="">Select</option>
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-panel__actions">
          <button
            type="button"
            className="filter-panel__reset"
            onClick={handleReset}>
            Reset
          </button>
          <button type="submit" className="filter-panel__apply">
            Filter
          </button>
        </div>
      </form>
    </div>
  );
}

export default FilterPanel;
