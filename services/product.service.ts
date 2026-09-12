import api from "@/lib/axios";
import { Product } from "@/types/product";

export const productService = {
  getAll: async (name = "", page = 1,category = ""): Promise<Product[]> => {
    const { data } = await api.get(`/products?name=${name}&page=${page}&limit=10&category=${category}`);
    return data;
  },

  getById: async (id: string): Promise<Product> => {
    const { data } = await api.get(`/products/${id}`);
    return data;
  },

  deleteProduct: async (id: string) => {
    const { data } = await api.delete(`/products/${id}`);
    return data;
  },

  productCreate: async (formData: any) => {
    const { data } = await api.post(`/products/`, formData);
    return data;
  },

  productUpdate: async (id: string, formData: any) => {
    const { data } = await api.put(`/products/${id}`, formData);
    return data;
  },
};
