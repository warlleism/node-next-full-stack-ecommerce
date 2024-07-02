import { useQuery } from 'react-query';
import { ProductData } from '../../../types/product';
import { useMemo, useState } from 'react';

const useProductsInSale = () => {

    const [pages, setPages] = useState(1);
    const [qtdItens, setQtdItens] = useState(30);

    const fetchProducts = useMemo(() => async () => {
        const response = await fetch(`http://localhost:3001/sale/all?page=${pages}&limit=${qtdItens}`);
        const data = await response.json();

        const priceSale = data?.data.map((item: ProductData) => {
            let valorDesconto = (Number(item.price) * Number(item.sale)) / 100;
            let precoFinal = Number(item.price) - valorDesconto;
            return { ...item, price: precoFinal, defaultPrice: item.price }
        })

        return priceSale || [];
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