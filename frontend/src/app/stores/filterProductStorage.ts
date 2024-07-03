'use client'

import create from 'zustand';

interface FilterProductState {
    search: string | null;
    changeSearch: (value: string | null) => void;
}

const useFilterProductStorage = create<FilterProductState>((set) => {
    let initialSearch: string | null = null;

    if (typeof window !== 'undefined') {
        initialSearch = localStorage.getItem('detailAll');
    }

    const search = (initialSearch === 'sale-products' || initialSearch === 'our-products') ? null : (initialSearch || '');

    return {
        search: search,
        changeSearch: (value: string | null) => {
            set({ search: value == null ? null : value.toLowerCase() });
        },
    };
});

export default useFilterProductStorage;