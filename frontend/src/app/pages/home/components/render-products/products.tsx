'use client';

import useProductsWithFavorites from '@/app/hooks/useProducts';
import { CarouselComponent } from '../carousel/carousel';
import 'swiper/swiper-bundle.css';
import './style.scss';

export function RenderProducts() {

    const { products } = useProductsWithFavorites();

    return (
        <div className='main-our-products-container'>
            <div className='text-our-products-container'>NOSSOS PRODUTOS</div>
            <CarouselComponent products={products} scroll={'our-products'} />
        </div>
    );
}
