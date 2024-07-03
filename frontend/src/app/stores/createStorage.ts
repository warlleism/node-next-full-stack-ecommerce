'use client'

import { create } from 'zustand';
import { ProductData } from '../types/product';

interface NewProductState {
    newProduct: ProductData | null;
    getNewProduct: (item: ProductData) => void;
    showCrudContainer: boolean;
    hiddenCrudContainer: () => void
    displayCrudContainer: () => void
    clearNewProduct: () => void
}

const useNewProductStore = create<NewProductState>((set) => ({
    newProduct: null,
    showCrudContainer: false,
    getNewProduct: (product: ProductData) => {
        set((state) => ({
            newProduct: product,
            showCrudContainer: !state.showCrudContainer
        }));
    },
    clearNewProduct: () => {
        set(() => ({
            newProduct: null,
        }));
    },
    hiddenCrudContainer: () => {
        set((state) => {
            state.clearNewProduct();
            return { showCrudContainer: false };
        });
    },
    displayCrudContainer: () => {
        set({ showCrudContainer: true })
    }
}));

export default useNewProductStore;
