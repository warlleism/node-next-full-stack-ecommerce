'use client';

import { create } from 'zustand';
import { ProductData } from '../types/product';

interface ProductState {
  cart: ProductData[];
  addProductToCart: (product: ProductData) => void;
}

const useCartStore = create<ProductState>((set) => ({
  cart: [],

  addProductToCart: (product: ProductData) => {
    set((state) => {
      const productExists = state.cart.some(item => item.id === product.id);
      if (productExists) { return state }
      return {
        cart: [...state.cart, product],
      };
    });
  },
}));

export default useCartStore;
