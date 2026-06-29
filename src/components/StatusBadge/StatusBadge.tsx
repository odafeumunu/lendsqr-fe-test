import type { UserStatus } from "../../types/user";
import "./StatusBadge.scss";

interface StatusBadgeProps {
  status: UserStatus;
}

const LABELS: Record<UserStatus, string> = {
  active: "Active",
  inactive: "Inactive",
  pending: "Pending",
  blacklisted: "Blacklisted",
};

function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`status-badge status-badge--${status}`}>
      {LABELS[status]}
    </span>
  );
}

export default StatusBadge;
