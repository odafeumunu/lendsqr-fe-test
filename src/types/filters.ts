import type { UserStatus } from "./user";

export interface UserFilters {
  organization?: string;
  username?: string;
  email?: string;
  date?: string;
  phone?: string;
  status?: UserStatus;
}

export const EMPTY_FILTERS: UserFilters = {};
