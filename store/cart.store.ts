import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  id: string;
  quantity: number;
  name: string;
  price: number;
  image: string;
};

type CartStore = {
  cart: CartItem[];
  addToCart: (
    id: string,
    quantity: number,
    name: string,
    price: number,
    image: string,
  ) => void;
  quantityPlus: (id: string) => void;
  quantityMinus: (id: string) => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (id, quantity, name, price, image) =>
        set((state) => {
          const existing = state.cart.find((item) => item.id === id);
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.id === id ? { ...item, quantity } : item,
              ),
            };
          }
          return {
            cart: [...state.cart, { id, quantity, name, price, image }],
          };
        }),

      quantityPlus: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        })),
      quantityMinus: (id) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
            )
            .filter((item) => item.quantity > 0),
        })),

      totalQuantity: () =>
        get().cart.reduce((sum, item) => sum + item.quantity, 0),

      totalSum: () =>
        get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0),

      removeItem: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
    }),
    { name: "cart" },
  ),
);
