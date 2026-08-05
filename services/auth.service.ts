import api from "@/lib/axios";
import { Login } from "@/types/auth";

export const authService = {
  register: async (data: Login) => {
    const res = await api.post("/auth/register", data);
    return res.data;
  },
  login: async (data: Login) => {
    const res = await api.post("/auth/login", data);
    return res.data;
  },
};
