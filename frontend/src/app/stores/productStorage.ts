'use client'

import { create } from 'zustand';
import { ProductData } from '../types/product';

interface ProductState {
  listProducts: ProductData[]
  product: ProductData | null;
  favorite: number[];
  detailProduct: (product: ProductData) => void;
  addToFavorite: (numberToAdd: string) => void;
  removeFromFavorite: (numberToRemove: string) => void;
  initializeOneProduct: () => void;
  listAllProducts: (items: ProductData[]) => void
  updateAllProducts: (items: ProductData) => void
}

const useProductStore = create<ProductState>((set) => ({
  listProducts: [],
  favorite: [],
  product: null,
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
  initializeOneProduct: () => {
    if (typeof window !== 'undefined') {
      const storedProduct = localStorage.getItem('product');
      if (storedProduct) {
        set({ product: JSON.parse(storedProduct) });
      }
    }
  },
  detailProduct: (product) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('product', JSON.stringify(product));
    }
    set((state) => ({
      product: product
    }));
  },
  addToFavorite: (numberToAdd) => {
    const numberToAddAsNumber = parseInt(numberToAdd, 10);
    if (!isNaN(numberToAddAsNumber)) {
      set((state) => ({
        favorite: [...state.favorite, numberToAddAsNumber],
      }));
    }
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
