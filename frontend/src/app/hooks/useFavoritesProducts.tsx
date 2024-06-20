'use client'

import { useState } from 'react';
import { toast } from 'react-toastify';
import useUserStore from '../stores/userStorage';
import useProductStore from '../stores/productStorage';
import { getValidToken } from '../utils/validToken';

interface UseFavoritesProducts {
    fetchFavorite: ({ product_id }: { product_id: any }) => void;
}

const useFavoritesProducts = (): UseFavoritesProducts => {

    const { user } = useUserStore();
    const { favorite, addToFavorite, removeFromFavorite } = useProductStore();
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const fetchFavorite = async ({ product_id }: { product_id: string }): Promise<void> => {

        const token = getValidToken();

        if (isFetching) {
            return;
        }

        setIsFetching(true);

        const method = favorite?.includes(Number(product_id)) ? 'DELETE' : 'POST';
        const url = `http://localhost:3001/favorite/${method === 'DELETE' ? 'delete' : 'create'}`;
        const action = method === 'DELETE' ? removeFromFavorite : addToFavorite;

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user?.id,
                    product_id: product_id
                }),
            });

            const data = await response.json();
            action(String(product_id));
        } catch (error) {
            toast('Ocorreu um erro');
            console.error('Error fetching products:', error);
        } finally {
            setIsFetching(false);
        }

    };

    const debouncedFetchFavorite = debounce(
        (args: { product_id: string }) => fetchFavorite(args),
        500
    );

    return { fetchFavorite: debouncedFetchFavorite };
};

const debounce = <F extends (...args: any[]) => any>(
    func: F,
    delay: number
): ((...args: Parameters<F>) => void) => {
    let timeoutId: NodeJS.Timeout;

    return function (this: any, ...args: Parameters<F>): void {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};

export default useFavoritesProducts;
