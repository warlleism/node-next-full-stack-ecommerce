'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProductData } from "@/app/types/product";
import useCartStore from '@/app/stores/cartStorage';
import useUserStore from '@/app/stores/userStorage';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './style.scss';

export function Button({ data }: { data: ProductData }) {

    const route = useRouter();
    const { user } = useUserStore()
    const { id, price, } = data;
    const { cart, addProductToCart, initializeCart, showCart } = useCartStore();
    const isInCart = cart.some(item => item.id === id && item.userId === user?.id);

    useEffect(() => {
        initializeCart()
    }, [])

    const handleClick = () => {
        isInCart ? showCart() : user ?
            addProductToCart({ ...data, cartPrice: price, userId: user.id, qtd: 1 }) :
            route.push('/pages/auth/login');
    };

    return (
        <button
            onClick={handleClick}
            key={id}
            className="product-cart">
            <div>{isInCart ?
                <div
                    style={{ display: 'flex', alignItems: 'center' }}>
                    <ShoppingBagIcon className='button-card' />
                    CARRINHO
                </div> :
                <div
                    style={{ display: 'flex', alignItems: 'center' }}>
                    <ShoppingCartIcon className='button-card' />
                    COMPRAR
                </div>}
            </div>
        </button>
    );
}
