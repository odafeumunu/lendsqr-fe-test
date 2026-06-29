import axios from "axios";
import type { User } from "../types/user";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
});

export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await apiClient.get<User[]>("/api/users");
  return data;
};

export const fetchUserById = async (id: number): Promise<User> => {
  const { data } = await apiClient.get<User>(`/api/users?id=${id}`);
  return data;
};
