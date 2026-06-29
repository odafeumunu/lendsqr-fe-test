import type { User } from "../types/user";
import type { UserFilters } from "../types/filters";

export function filterUsers(users: User[], filters: UserFilters): User[] {
  return users.filter((user) => {
    if (filters.organization && user.organization !== filters.organization) {
      return false;
    }
    if (
      filters.username &&
      !user.username.toLowerCase().includes(filters.username.toLowerCase())
    ) {
      return false;
    }
    if (
      filters.email &&
      !user.email.toLowerCase().includes(filters.email.toLowerCase())
    ) {
      return false;
    }
    if (filters.phone && !user.phone.includes(filters.phone)) {
      return false;
    }
    if (filters.status && user.status !== filters.status) {
      return false;
    }
    if (filters.date) {
      const userDate = new Date(user.dateJoined).toISOString().slice(0, 10);
      if (userDate !== filters.date) {
        return false;
      }
    }
    return true;
  });
}
