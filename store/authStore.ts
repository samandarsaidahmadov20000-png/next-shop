import {create} from "zustand";



export const authStore = create((set) => ({
    isLoggedIn: false,
    
    login: () => set({isLoggedIn: true}),
    logout: () => set({isLoggedIn: false }),
    initialize: () =>  {
        const token = localStorage.getItem("token");
        
        if(token) {
          set({isLoggedIn: true})
        }
    
    
    }

}))