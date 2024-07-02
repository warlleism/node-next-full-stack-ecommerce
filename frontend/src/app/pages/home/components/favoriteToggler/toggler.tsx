'use client'

import useFavoritesProducts from '@/app/hooks/useFavoritesProducts';
import useProductStore from '@/app/stores/productStorage';
import useUserStore from '@/app/stores/userStorage';
import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useRouter } from 'next/navigation';

export default function FavoriteComponent({ id }: any) {

    const router = useRouter()
    const { user } = useUserStore()
    const { favorite } = useProductStore();
    const { fetchFavorite } = useFavoritesProducts()

    const redirectUserFavorite = (id: string) => {
        const favorite = user !== null ? fetchFavorite({ product_id: id }) : router.push('/pages/auth/login')
    }

    return (
        <FavoriteIcon
            className='card-icon-favorite'
            onClick={() => redirectUserFavorite(String(id))}
            style={{ color: favorite?.includes(id) ? '#ff7e33' : '#777777c7' }} />
    );
};

