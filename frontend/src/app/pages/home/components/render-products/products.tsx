'use client';

import useProductsWithFavorites from '../../hooks/useGetProducts';
import { CarouselComponent } from '../carousel/carousel';
import 'swiper/swiper-bundle.css';
import './style.scss';

export function RenderProducts() {

    const { listProducts } = useProductsWithFavorites();

    return (
        <div className='main-our-products-container'>
            <div className='text-our-products-container'>NOSSOS PRODUTOS</div>
            <CarouselComponent products={listProducts} scroll={'our-products'} />
        </div>
    );
}
