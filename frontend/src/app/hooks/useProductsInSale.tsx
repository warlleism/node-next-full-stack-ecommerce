import { useQuery } from 'react-query';
import { ProductData } from '../types/product';
import { useMemo, useState } from 'react';

const useProductsInSale = () => {

    const [pages, setPages] = useState(1);
    const [qtdItens, setQtdItens] = useState(17);

    const fetchProducts = useMemo(() => async () => {
        const response = await fetch(`http://localhost:3001/sale/all`);
        const data = await response.json();

        return data?.data || [];
    }, [pages, qtdItens]);

    const { data: products = [], isLoading, isError, error, refetch } = useQuery<ProductData[]>(
        'sales',
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

export default useProductsInSale;