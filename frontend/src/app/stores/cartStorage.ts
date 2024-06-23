'use client';

import { create } from 'zustand';
import { ProductData } from '../types/product';

interface ProductState {
  cart: ProductData[];
  show: boolean;
  showCart: () => void;
  addProductToCart: (product: ProductData) => void;
  removeProductFromCart: (productId: number) => void;
  initializeCart: () => void;
}

const useCartStore = create<ProductState>((set) => ({
  cart: [],
  show: false,
  showCart: () => {
    set((state) => ({
      show: !state.show
    }));
  },
  initializeCart: () => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        set({ cart: JSON.parse(storedCart) });
      }
    }
  },
  addProductToCart: (product: ProductData) => {
    set((state) => {
      const productExists = state.cart.some(item => item.id === product.id);

      if (productExists) { return state }

      if (typeof window !== 'undefined') {
        const cart = localStorage.getItem('cart');
        let newCart: ProductData[] = [];
        if (cart) { newCart = JSON.parse(cart) }
        newCart.push(product);
        localStorage.setItem('cart', JSON.stringify(newCart));
      }

      return {
        cart: [...state.cart, product],
      };
    });
  },
  removeProductFromCart: (productId: number) => {
    set((state) => {
      const updatedCart = state.cart.filter(product => product.id !== productId);
      if (typeof window !== 'undefined') { localStorage.setItem('cart', JSON.stringify(updatedCart)) }
      return {
        cart: updatedCart,
      };
    });
  },
}));

export default useCartStore;
