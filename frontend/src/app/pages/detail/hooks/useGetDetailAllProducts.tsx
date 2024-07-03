import { useQuery } from 'react-query';
import { useEffect, useMemo, useState } from 'react';
import useProductStore from '../../../stores/productStorage';
import useFilterProductStorage from '@/app/stores/filterProductStorage';
import { ProductData } from '../../../types/product';

const useGetDetailAllProducts = () => {

    const [page, setPage] = useState(1);
    const [qtdItens, setQtdItens] = useState(4);
    const { addToFavorite } = useProductStore();
    const { search } = useFilterProductStorage();
    const [urlLocal, setUrlLocal] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUrl = localStorage.getItem('detailAll');
            setUrlLocal(storedUrl);
        }
    }, []);

    const filteredUrl = useMemo(() => {
        const baseUrl = search !== null
            ? `http://localhost:3001/product/search?page=${page}&limit=${qtdItens}`
            : `http://localhost:3001/product/getAllProducts?page=${page}&limit=${qtdItens}`;
        return urlLocal === 'sale-products'
            ? `http://localhost:3001/sale/all?page=${page}&limit=${qtdItens}`
            : baseUrl;
    }, [page, qtdItens, search, urlLocal]);

    const fetchProducts = async () => {

        try {
            const response = await fetch(filteredUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ search }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (data?.favorites) {
                data.favorites.forEach((favoriteId: string) => {
                    addToFavorite(favoriteId);
                });
            }

            setTotalPages(data.totalPages);
            return data?.data || [];
        } catch (error) {
            throw new Error(`Error fetching products: ${error}`);
        }
    };

    const { data: products = [], isLoading, isError, error, refetch } = useQuery<ProductData[]>(
        ['get_all_products', page, qtdItens, search],
        fetchProducts,
        { staleTime: 10000 }
    );

    useEffect(() => {
        refetch()
    }, [filteredUrl])

    const [totalPages, setTotalPages] = useState();

    return {
        totalPages,
        setTotalPages,
        products,
        isLoading,
        isError,
        error,
        refetch,
        page,
        setPage,
        qtdItens,
        setQtdItens,
    };
};

export default useGetDetailAllProducts;
