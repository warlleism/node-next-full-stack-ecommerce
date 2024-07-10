'use client'

import { create } from 'zustand';
import { ProductData } from '../types/product';

interface ProductState {
  listProducts: ProductData[]
  product: ProductData | null;
  favorite: number[];
  detailProduct: (product: ProductData) => void;
  addToFavorite: (number: string) => void;
  removeFromFavorite: (number: string) => void;
  listAllProducts: (items: ProductData[]) => void
  updateAllProducts: (items: ProductData) => void
}

//inicializar os favoritos
const storedFavorites = localStorage.getItem('favorite');
const initialFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];

//inicializar o produto
const storedOneProduct = localStorage.getItem('product');
const initialOneProduct = storedOneProduct ? JSON.parse(storedOneProduct) : null;

const useProductStore = create<ProductState>((set) => ({
  listProducts: [],
  favorite: initialFavorites,
  product: initialOneProduct,
  listAllProducts: (items: ProductData[]) => {
    set(() => ({
      listProducts: items
    }));
  },
  updateAllProducts: (item: ProductData) => {
    set((state) => {
      const updatedItems = state.listProducts.filter((e: ProductData) => e.id !== item.id);
      const newItems = [...updatedItems, item];
      return { listProducts: newItems };
    });
  },
  detailProduct: (product) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('product', JSON.stringify(product));
    }
    set(() => ({
      product: product
    }));
  },
  addToFavorite: (numberToAdd) => {
    const numberToAddAsNumber = parseInt(numberToAdd, 10);
    set((state) => {
      const updatedFavorites = [...state.favorite, numberToAddAsNumber];
      localStorage.setItem('favorite', JSON.stringify(updatedFavorites));
      return { favorite: updatedFavorites };
    });
  },
  removeFromFavorite: (numberToRemove) => {
    const numberToRemoveAsNumber = parseInt(numberToRemove, 10);
    if (!isNaN(numberToRemoveAsNumber)) {
      set((state) => ({
        favorite: state.favorite.filter((number) => number !== numberToRemoveAsNumber),
      }));
    }
  },
}));



export default useProductStore;
