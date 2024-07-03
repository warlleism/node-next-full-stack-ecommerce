import { useEffect, useRef, useState, useCallback } from 'react';

const useProductSearch = () => {
    const [error, setError] = useState('');
    const [products, setProducts] = useState([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const inputRefContainer = useRef<HTMLInputElement>(null);
    let typingTimer: ReturnType<typeof setTimeout> | null = null;

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
        if (inputValue.trim()) {
            const url = `http://localhost:3001/product/search?page=1&limit=4`;
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ search: inputValue }),
                });

                if (response.status === 400) {
                    setProducts([]);
                    setError('Produto não encontrado!');
                    return;
                }

                const data = await response.json();
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

            if (inputValue.length === 0) {
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
        inputRef,
        error,
        inputRefContainer,
        handleInputChange,
    };
};

export default useProductSearch;
