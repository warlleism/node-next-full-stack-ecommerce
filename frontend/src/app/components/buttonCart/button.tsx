'use client';

import { useRouter } from 'next/navigation';
import { ProductData } from "@/app/types/product";
import useCartStore from '@/app/stores/cartStorage';
import useUserStore from '@/app/stores/userStorage';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './style.scss';
import { useAddProductInCart } from '@/app/utils/cartUtil';

export function Button({ data }: { data: ProductData }) {

    const router = useRouter();
    const { user } = useUserStore()
    const { id } = data;
    const { cart } = useCartStore();
    const isInCart = cart.some(item => item.id === id && item.userId === user?.id);

    const addProductInCart = useAddProductInCart(router);


    return (
        <button
            onClick={() => addProductInCart(data)}
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
