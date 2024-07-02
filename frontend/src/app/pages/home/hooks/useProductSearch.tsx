import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import useProductStore from '@/app/stores/productStorage';

const useProductSearch = () => {

    const route = useRouter()
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('')
    let typingTimer: ReturnType<typeof setTimeout> | null = null;
    const inputRef = useRef<HTMLInputElement>(null);
    const inputRefContainer = useRef<HTMLInputElement>(null);
    const { detailAllProduct } = useProductStore();

    useEffect(() => {

        const handleClickOutside = (event: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                const container = inputRefContainer.current;
                if (container) {
                    container.style.opacity = '0';
                    setTimeout(() => { container.style.display = 'none' }, 300);
                    setError('');
                }
            }
            else {
                if (inputRefContainer.current) {
                    const container = inputRefContainer.current;
                    container.style.display = 'flex';
                    container.style.opacity = '1';
                    setError('')
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleInputChange = async (page: number, limit: number) => {
        if (typingTimer) {
            clearTimeout(typingTimer);
        }

        typingTimer = setTimeout(async () => {

            if (inputRef.current) {
                const inputValue = inputRef.current.value;
                const url = `http://localhost:3001/product/search?page=${page}&limit=${limit}`;

                if (inputValue.length === 0) {
                    setProducts([])
                    setError('')
                    return
                }

                try {
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            search: inputValue,
                        }),
                    });

                    if (response.status === 400) {
                        setProducts([])
                        setError('Produto não encontrado!')
                        return
                    }

                    const data = await response.json();

                    if (limit >= 30) {
                        detailAllProduct(data.data)
                        route.push('/pages/detail/detailAll')
                        const container = inputRefContainer.current;
                        if (container) {
                            container.style.opacity = '0';
                            setTimeout(() => { container.style.display = 'none' }, 300);
                        }
                    } else {
                        setProducts(data.data);
                    }

                } catch (error) {
                    console.error('Erro ao buscar produtos:', error);
                }
            }
        }, 800);
    };

    return {
        products,
        inputRef,
        handleInputChange,
        error,
        inputRefContainer
    };
};

export default useProductSearch;
