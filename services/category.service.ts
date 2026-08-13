import api from "@/lib/axios";

export const categoryService = {
  getAll: async () => {
    const { data } = await api.get("/category");
    return data;
  },

  categoryCreate: async (dataCategory: any) => {
    const { data } = await api.post("/category", dataCategory);
    return data;
  },

  categoryDelete: async (id: string) => {
    const { data } = await api.delete(`/category/${id}`);
    return data;
  },

  categoryUpdate: async (id: string, categoryData: any) => {
    const { data } = await api.put(`/category/${id}`,categoryData);
    return data;
  },
};
