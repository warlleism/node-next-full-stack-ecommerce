'use client'

import './style.scss'
import { ProductData } from "@/app/types/product";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export function Button({ data }: { data: ProductData }) {

    const { id, name, category, description, price, rate, image } = data;

    return (
        <button key={id} className="product-cart">
            <ShoppingCartIcon className='button-card'  />
            <div>COMPRAR</div>
        </button>
    );
}
