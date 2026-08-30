import api from "@/lib/axios";
import { Conversations } from "@/types/conversations";

export const conversations = {
  conversationsGet: async (): Promise<Conversations[]> => {
    const { data } = await api.get("/message/conversations");
    return data;
  },

  getUsersDialog: async (id: string) => {
    const { data } = await api.get(`/message/${id}`);
    return data;
  },

  sendAdminMessage: async (text: string, userId: string ) => {
    const { data } = await api.post(`/message`, {text, userId});
    return data;
  },
};
