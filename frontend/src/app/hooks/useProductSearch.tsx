import { useEffect, useRef, useState } from 'react';

const useProductSearch = () => {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState('')
    let typingTimer: ReturnType<typeof setTimeout> | null = null;
    const inputRef = useRef<HTMLInputElement>(null);
    const inputRefContainer = useRef<HTMLInputElement>(null);

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
            }
            else {
                if (inputRefContainer.current) {
                    const container = inputRefContainer.current;
                    container.style.display = 'block';
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

    const handleInputChange = async () => {
        if (typingTimer) {
            clearTimeout(typingTimer);
        }

        const page = 1
        const limit = 4

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
                    setProducts(data.data);

                } catch (error) {
                    console.error('Erro ao buscar produtos:', error);
                }
            }
        }, 1000);
    };

    return { products, inputRef, handleInputChange, error, inputRefContainer };
};

export default useProductSearch;
