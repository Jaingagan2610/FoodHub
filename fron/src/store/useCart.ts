import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
};

type CartStore = {
  cartItems: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearCart: () => void;
};

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],

      // Add item
      addItem: (item) => {
        const existing = get().cartItems.find((i) => i.id === item.id);
        if (existing) {
          // increase quantity
          set({
            cartItems: get().cartItems.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({
            cartItems: [...get().cartItems, { ...item, quantity: 1 }],
          });
        }
      },

      // Remove item fully
      removeItem: (id) =>
        set({
          cartItems: get().cartItems.filter((item) => item.id !== id),
        }),

      // Increase quantity
      increaseQty: (id) =>
        set({
          cartItems: get().cartItems.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }),

      // Decrease quantity
      decreaseQty: (id) =>
        set({
          cartItems: get().cartItems
            .map((i) =>
              i.id === id && i.quantity > 1
                ? { ...i, quantity: i.quantity - 1 }
                : i
            )
            .filter((item) => item.quantity > 0),
        }),

      // Clear entire cart
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "foodhub-cart-storage", // localStorage key
    }
  )
);
