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

    const baseUrls = {
        products: 'http://localhost:3001/product',
        sales: 'http://localhost:3001/sale'
    };

    const filteredUrl = useMemo(() => {
        let baseUrl = baseUrls.products + '/getAllProducts';

        if (search !== null) {
            baseUrl = baseUrls.products + '/search';
        } else if (urlLocal === 'sale-products') {
            baseUrl = baseUrls.sales + '/all';
        }

        const urlParams = `?page=${page}&limit=${qtdItens}`;

        return baseUrl + urlParams;
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
