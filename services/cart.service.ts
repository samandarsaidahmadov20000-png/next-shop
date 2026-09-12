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
  


};
