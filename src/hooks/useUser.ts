import { useQuery } from "@tanstack/react-query";
import { fetchUserById, fetchUsers } from "../api/user";
import type { User } from "../types/user";

const CACHE_PREFIX = "user-";

function getCachedUser(id: number): User | null {
  try {
    const cached = localStorage.getItem(`${CACHE_PREFIX}${id}`);
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
}

function setCachedUser(id: number, user: User) {
  try {
    localStorage.setItem(`${CACHE_PREFIX}${id}`, JSON.stringify(user));
  } catch {
    // localStorage can fail (quota, privacy mode) — non-fatal, just skip caching
  }
}

export const useUserDetail = (id: number) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const cached = getCachedUser(id);
      if (cached) return cached;

      const user = await fetchUserById(id);
      setCachedUser(id, user);
      return user;
    },
    enabled: !!id && !Number.isNaN(id),
  });
};

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000,
  });
};
