'use client';

import { create } from 'zustand';
import { ProductData } from '../types/product';

interface ProductState {
  fullPrice: number | string;
  show: boolean;
  cart: ProductData[];
  showCart: () => void;
  initializeCart: () => void;
  calculatePrice: () => void;
  incrementQuantity: (productId: number) => void;
  decrementQuantity: (productId: number) => void;
  addProductToCart: (product: ProductData) => void;
  removeProductFromCart: (productId: number) => void;
}

const useCartStore = create<ProductState>((set) => ({
  cart: [],
  fullPrice: 0,
  show: false,

  showCart: () => {
    set((state) => ({
      show: !state.show
    }));
  },
  initializeCart: () => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      set({ cart: JSON.parse(storedCart) });
    }
  },
  addProductToCart: (product: ProductData) => {
    set((state) => {
      try {
        if (typeof window !== 'undefined') {
          const cart = localStorage.getItem('cart');
          let newCart: any = [];
          if (cart) { newCart = JSON.parse(cart) }
          newCart.push(product);
          localStorage.setItem('cart', JSON.stringify(newCart));
        }
      } catch (error) {
        console.error('Error storing item in cart:', error);
      }
      return {
        cart: [...state.cart, product],
      };
    });
  },

  removeProductFromCart: (productId: number) => {
    set((state) => {
      const updatedCart = state.cart.filter(product => product.id !== productId);
      try {
        if (typeof window !== 'undefined') {
          const cartString = JSON.stringify(updatedCart);
           localStorage.setItem('cart', cartString);
        }
      } catch (error) {
        console.error('Error storing updated cart:', error);
      }

      return {
        cart: updatedCart,
      };
    });
  },
  incrementQuantity: (productId) => {
    set((state) => {
      const updatedCart = state.cart.map((item) =>
        item.id === productId
          ? {
            ...item,
            qtd: (item.qtd || 0) + 1,
            cartPrice: Number(item.price) * ((item.qtd || 0) + 1),
          }
          : item
      );
      try {
        if (typeof window !== 'undefined') {
          const cartString = JSON.stringify(updatedCart);
          if (cartString.length >= 5 * 1024 * 1024) {
            console.error('Storage quota exceeded. Cannot update cart.');
            return state;
          }

          localStorage.setItem('cart', cartString);
        }
      } catch (error) {
        console.error('Error storing updated cart:', error);
      }

      return { cart: updatedCart };
    });
  },
  decrementQuantity: (productId) => {
    set((state) => {
      const updatedCart = state.cart.map((item) =>
        item.id === productId
          ? {
            ...item,
            qtd: (item.qtd || 0) > 0 ? (item.qtd || 0) - 1 : 0,
            cartPrice: Number(item.price) * ((item.qtd || 0) > 0 ? (item.qtd || 0) - 1 : 0),
          }
          : item
      );

      try {
        if (typeof window !== 'undefined') {
          const cartToStore = updatedCart.map(item => ({
            id: item.id,
            qtd: item.qtd,
          }));

          const cartString = JSON.stringify(cartToStore);
          if (cartString.length >= 5 * 1024 * 1024) {
            console.error('Storage quota exceeded. Cannot update cart.');
            return state;
          }

          localStorage.setItem('cart', cartString);
        }
      } catch (error) {
        console.error('Error storing updated cart:', error);
      }

      return { cart: updatedCart };
    });
  },
  calculatePrice: () => {
    set((state) => {
      const reducePrice = state.cart.reduce((acumulador: number, valorAtual: ProductData) => {
        const price = typeof valorAtual.cartPrice === 'string'
          ? parseFloat(valorAtual.cartPrice)
          : typeof valorAtual.cartPrice === 'number'
            ? valorAtual.cartPrice
            : 0;
        return acumulador + price;
      }, 0);

      return { fullPrice: reducePrice };
    })
  }

}));

export default useCartStore;
