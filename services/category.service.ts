
import api from "@/lib/axios";


export const categoryService = {
    getAll: async () => {
        const {data} = await api.get('/category')
        return data
    }
}