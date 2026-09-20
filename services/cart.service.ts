import api from "@/lib/axios";

export const cartAuthService = {
  cartGet: async () => {
    const { data } = await api.get(`/cart`);
    return data;
  },

  createCart: async (productData: any) => {
    const { data } = await api.post(`/cart`, productData);
    return data;
  },

  updateCart: async (productId: string, quantity: number) => {
    const { data } = await api.put(`/cart/${productId}`, { quantity });
    return data;
  },

  removeCart: async (productId: string) => {
    const { data } = await api.delete(`/cart/${productId}`);
    return data;
  },
};
