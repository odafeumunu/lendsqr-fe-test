import type { User } from "../types/user";

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  usersWithLoans: number;
  usersWithSavings: number;
}

export function deriveStats(users: User[]): DashboardStats {
  return {
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.status === "active").length,
    usersWithLoans: users.filter((u) => u.hasLoan).length,
    usersWithSavings: users.filter((u) => u.hasSavings).length,
  };
}
