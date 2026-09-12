import api from "@/lib/axios";



export const orderService = {
    getAll: async () => {
        const {data} = await api.get('/order')
        return data
    },

    orderStatusUpadete: async (id: string, status: string) => {
        const {data} = await api.put(`/order/${id}/status`, {status});
        return data
    },

    createOrder: async () => {
        const {data} = await api.post(`/order`)
        return data
    }
    




}