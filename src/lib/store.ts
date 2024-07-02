import create from 'zustand';

interface CartState {
  cartCount: number;
  setCartCount: (count: number) => void;
  incrementCartCount: () => void;
  decrementCartCount: (count: number) => void;
}

const useCartStore = create<CartState>((set) => ({
  cartCount: 0,
  setCartCount: (count) => set({ cartCount: count }),
  incrementCartCount: () =>
    set((state) => ({ cartCount: state.cartCount + 1 })),
  decrementCartCount: (count) =>
    set((state) => ({ cartCount: state.cartCount - count })),
}));

export default useCartStore;
