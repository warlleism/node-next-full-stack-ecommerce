'use client';

import useCartStore from '@/app/stores/cartStorage';
import './style.scss';
import { ProductData } from "@/app/types/product";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useRouter } from 'next/navigation';

export function Button({ data }: { data: ProductData }) {
    const route = useRouter();
    const { id, name, category, description, price, rate, image } = data;
    const { cart, addProductToCart } = useCartStore();
    const isInCart = cart.some(item => item.id === id);

    const handleClick = () => {
        if (isInCart) {
            route.push('/pages/auth/login');
        } else {
            addProductToCart({ ...data, qtd: 1 });
        }
    };

    return (
        <button
            onClick={handleClick}
            key={id}
            className="product-cart">
            <ShoppingCartIcon className='button-card' />
            <div>{isInCart ? ' CARRINHO' : 'COMPRAR'}</div>
        </button>
    );
}
