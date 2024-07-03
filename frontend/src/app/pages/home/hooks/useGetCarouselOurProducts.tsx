import { useQuery } from 'react-query';
import { ProductData } from '../../../types/product';
import { useMemo, useState } from 'react';
import useProductStore from '../../../stores/productStorage';
import { getValidToken } from '../../../utils/validToken';

const useGetCarouselOurProducts = () => {

    const { addToFavorite } = useProductStore();
    const [pages, setPages] = useState(1);
    const [qtdItens, setQtdItens] = useState(17);
    const { listProducts, listAllProducts } = useProductStore()

    const fetchProducts = useMemo(() => async () => {
        const token = getValidToken();
        const headers: HeadersInit = token ? { 'Authorization': `Bearer ${token}` } : {};
        const response = await fetch(`http://localhost:3001/product/ourProducts?page=${pages}&limit=${qtdItens}`, { headers });
        const data = await response.json();

        if (data?.favorites) {
            data.favorites.forEach((favoriteId: string) => {
                addToFavorite(favoriteId);
            });
        }

        listAllProducts(data.data)

        return data?.data || [];
    }, [pages, qtdItens, addToFavorite]);

    const { data: products = [], isLoading, isError, error, refetch } = useQuery<ProductData[]>(
        'carousel_products',
        fetchProducts,
        { staleTime: 10000 }
    );

    return {
        listProducts,
        isLoading,
        isError,
        error,
        refetch,
        setPages,
        setQtdItens
    };
};

export default useGetCarouselOurProducts;