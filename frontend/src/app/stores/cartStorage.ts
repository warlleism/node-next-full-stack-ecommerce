'use client';

import { create } from 'zustand';
import { openDB } from 'idb';
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

const DB_NAME = 'shoppingCartDB';
const DB_VERSION = 1;
const STORE_NAME = 'cart';

const openCartDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

const useCartStore = create<ProductState>((set) => ({
  cart: [],
  fullPrice: 0,
  show: false,

  showCart: () => {
    set((state) => ({
      show: !state.show,
    }));
  },
  initializeCart: async () => {
    try {
      const db = await openCartDB();
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const allProducts = await store.getAll();
      set({ cart: allProducts });
    } catch (error) {
      console.error('Error initializing cart from IndexedDB:', error);
    }
  },
  addProductToCart: (product: ProductData) => {
    (async () => {
      try {
        const db = await openCartDB();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        await store.add(product);
        const allProducts = await store.getAll();
        set({ cart: allProducts });
      } catch (error) {
        console.error('Error adding product to IndexedDB:', error);
      }
    })();
  },
  removeProductFromCart: (productId: number) => {
    (async () => {
      try {
        const db = await openCartDB();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        await store.delete(productId);
        const allProducts = await store.getAll();
        set({ cart: allProducts });
      } catch (error) {
        console.error('Error removing product from IndexedDB:', error);
      }
    })();
  },
  incrementQuantity: (productId: number) => {
    (async () => {
      try {
        const db = await openCartDB();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        
        const product = await store.get(productId);
        if (product) {
          product.qtd = (product.qtd || 0) + 1;
          product.cartPrice = Number(product.price) * (product.qtd);
          await store.put(product);
        }
        
        const allProducts = await store.getAll();
        set({ cart: allProducts });
      } catch (error) {
        console.error('Error incrementing product quantity in IndexedDB:', error);
      }
    })();
  },
  decrementQuantity: (productId: number) => {
    (async () => {
      try {
        const db = await openCartDB();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        
        const product = await store.get(productId);
        if (product && product.qtd > 0) {
          product.qtd = product.qtd - 1;
          product.cartPrice = Number(product.price) * (product.qtd);
          await store.put(product);
        }
        
        const allProducts = await store.getAll();
        set({ cart: allProducts });
      } catch (error) {
        console.error('Error decrementing product quantity in IndexedDB:', error);
      }
    })();
  },
  calculatePrice: () => {
    set((state) => {
      const reducePrice = state.cart.reduce((acumulador: number, valorAtual: ProductData) => {
        const price =
          typeof valorAtual.cartPrice === 'string'
            ? parseFloat(valorAtual.cartPrice)
            : typeof valorAtual.cartPrice === 'number'
            ? valorAtual.cartPrice
            : 0;
        return acumulador + price;
      }, 0);

      return { fullPrice: reducePrice };
    });
  },
}));

export default useCartStore;
