import { create } from 'zustand';

interface CartState {
  cartCount: number;
  setCartCount: (count: number) => void;
  incrementCartCount: () => void;
  decrementCartCount: (count: number) => void;
}
interface AuthState {
  isLoggedIn: boolean;
  setLogIn: () => void;
  setLogOut: () => void;
}

const useCartStore = create<CartState>((set) => ({
  cartCount: 0,
  setCartCount: (count) => set({ cartCount: count }),
  incrementCartCount: () =>
    set((state) => ({ cartCount: state.cartCount + 1 })),
  decrementCartCount: (count) =>
    set((state) => ({ cartCount: state.cartCount - count })),
}));

export const useIsLoggedIn = create<AuthState>((set) => ({
  isLoggedIn: false,
  setLogIn: () => set(() => ({ isLoggedIn: true })),
  setLogOut: () => set(() => ({ isLoggedIn: false })),
}));

export default useCartStore;
