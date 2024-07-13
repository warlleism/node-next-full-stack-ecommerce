import { useEffect, useRef, useState, useCallback } from 'react';
import { getValidToken } from '../utils/validToken';
import useProductStore from '../stores/productStorage';

const useProductSearch = () => {
    const [error, setError] = useState('');
    const [products, setProducts] = useState([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const inputRefContainer = useRef<HTMLInputElement>(null);
    let typingTimer: ReturnType<typeof setTimeout> | null = null;
    const { addToFavorite } = useProductStore();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                const container = inputRefContainer.current;
                if (container) {
                    container.style.opacity = '0';
                    setTimeout(() => {
                        container.style.display = 'none';
                    }, 300);
                    setError('');
                }
            } else {
                if (inputRefContainer.current) {
                    const container = inputRefContainer.current;
                    container.style.display = 'flex';
                    container.style.opacity = '1';
                    setError('');
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const fetchProducts = useCallback(async (inputValue: string) => {

        const token = await getValidToken();
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
        };

        const isToken = {
            method: 'POST',
            headers,
            body: JSON.stringify({ search: inputValue }),
        };

        if (inputValue.trim()) {
            const url = `http://localhost:3001/product/search?page=1&limit=4`;
            try {
                const response = await fetch(url, isToken);

                if (response.status === 400) {
                    setProducts([]);
                    setError('Produto não encontrado!');
                    return;
                }

                const data = await response.json();

                if (data?.favorites) {
                    data.favorites.forEach((favoriteId: string) => {
                        addToFavorite(favoriteId);
                    });
                }

                setProducts(data.data);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        }
    }, []);

    const handleInputChange = useCallback(() => {
        if (typingTimer) { clearTimeout(typingTimer) }

        if (inputRef.current) {
            const inputValue = inputRef.current.value;

            if (inputValue.length === 1) {
                setProducts([]);
                setError('');
                return;
            }

            typingTimer = setTimeout(() => {
                fetchProducts(inputValue);
            }, 800);
        }
    }, [fetchProducts]);

    return {
        products,
        setProducts,
        inputRef,
        error,
        inputRefContainer,
        handleInputChange,
    };
};

export default useProductSearch;
