import { useRouter } from 'next/navigation';
import useProductStore from '../stores/productStorage';

const useProductAllSearch = () => {

    const route = useRouter()
    const { detailAllProduct, allProducts } = useProductStore();

    const handleInputClick = async (value: string) => {
        
        if (value.length === 0) {
            return null
        }

        const page = 1;
        const limit = 30;
        const url = `http://localhost:3001/product/search?page=${page}&limit=${limit}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    search: value,
                }),
            });

            const data = await response.json();
            detailAllProduct(data?.data);
            route.push('/pages/detailAll')
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };

    return { allProducts, handleInputClick };
};

export default useProductAllSearch;
