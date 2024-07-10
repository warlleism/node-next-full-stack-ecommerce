import { useQuery } from 'react-query';
import { useEffect, useMemo, useState } from 'react';
import useProductStore from '../../../stores/productStorage';
import useFilterProductStorage from '@/app/stores/filterProductStorage';
import { ProductData } from '../../../types/product';
import { getValidToken } from '@/app/utils/validToken';

const useGetDetailAllProducts = () => {

    const [page, setPage] = useState(1);
    const [qtdItens, setQtdItens] = useState(5);
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
        let baseUrl;

        if (search !== null) {
            baseUrl = baseUrls.products + '/search';
        } else if (urlLocal === 'sale-products') {
            baseUrl = baseUrls.sales + '/all';
        } else if (urlLocal === 'our-products') {
            baseUrl = baseUrls.products + '/getAllProducts'
        }

        const urlParams = `?page=1&limit=${qtdItens}`;

        return baseUrl + urlParams;
    }, [page, qtdItens, search, urlLocal]);


    const fetchProducts = async () => {

        const token = await getValidToken();
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
        };

        const isToken = {
            method: 'POST',
            headers,
            body: JSON.stringify({ search }),
        };

        try {
            const response = await fetch(filteredUrl, isToken);

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

            const priceSale = data?.data.map((item: ProductData) => {
                let valorDesconto = (Number(item.price) * Number(item.sale)) / 100;
                let precoFinal = Number(item.price) - valorDesconto;
                return item.sale ? { ...item, price: precoFinal, defaultPrice: item.price } : { ...item }
            })

            return priceSale || [];

        } catch (error) {
            throw new Error(`Error fetching products: ${error}`);
        }
    };

    const { data: products = [], isLoading, isError, error, refetch } = useQuery<ProductData[]>(
        ['get_all_products', page, qtdItens, search, urlLocal],
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
