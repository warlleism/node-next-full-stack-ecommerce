import { useQuery } from 'react-query';
import { ProductData } from '../types/product';
import { useMemo, useState } from 'react';
import useProductStore from '../stores/productStorage';

const useProductsWithFavorites = () => {

    const { addToFavorite } = useProductStore();
    const [pages, setPages] = useState(1);
    const [qtdItens, setQtdItens] = useState(7);

    const fetchProducts = useMemo(() => async () => {
        const token = localStorage.getItem('token');
        const headers: HeadersInit = token ? { 'Authorization': `Bearer ${token}` } : {};
        const response = await fetch(`http://localhost:3001/product/all?page=${pages}&limit=${qtdItens}`, { headers });
        const data = await response.json();

        if (data?.favorites) {
            data.favorites.forEach((favoriteId: string) => {
                addToFavorite(favoriteId);
            });
        }

        return data?.data || [];
    }, [pages, qtdItens, addToFavorite]);

    const { data: products = [], isLoading, isError, error, refetch } = useQuery<ProductData[]>(
        'products',
        fetchProducts,
        { staleTime: 10000 }
    );

    return {
        products,
        isLoading,
        isError,
        error,
        refetch,
        setPages,
        setQtdItens
    };
};

export default useProductsWithFavorites;