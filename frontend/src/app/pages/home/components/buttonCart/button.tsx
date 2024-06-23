'use client';

import useCartStore from '@/app/stores/cartStorage';
import './style.scss';
import { ProductData } from "@/app/types/product";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useUserStore from '@/app/stores/userStorage';

export function Button({ data }: { data: ProductData }) {

    const route = useRouter();
    const { user } = useUserStore()
    const { id, name, category, description, price, rate, image } = data;
    const { cart, addProductToCart, initializeCart, showCart } = useCartStore();
    const isInCart = cart.some(item => item.id === id && item.userId === user?.id);

    useEffect(() => {
        initializeCart()
    }, [])

    const handleClick = () => {
        if (isInCart) {
            if (user) {
                showCart()
                // route.push('/pages/cart');
            }
            else {
                route.push('/pages/auth/login')
            }
        } else {
            if (user) {
                showCart()
                addProductToCart({ ...data, userId: user?.id, qtd: 1 });
            } else {
                route.push('/pages/auth/login')
            }
        }
    };


    return (
        <button
            onClick={handleClick}
            key={id}
            className="product-cart">
            <ShoppingCartIcon className='button-card' />
            <div>{isInCart ? 'FINALIZAR COMPRA' : 'COMPRAR'}</div>
        </button>
    );
}
