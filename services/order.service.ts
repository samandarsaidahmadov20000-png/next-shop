import api from "@/lib/axios";



export const orderService = {
    getAll: async () => {
        const {data} = await api.get('/order')
        return data
    }
}