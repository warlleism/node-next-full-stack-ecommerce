'use client';

import useGetCarouselOurProducts from '../../hooks/useGetCarouselOurProducts';
import { CarouselComponent } from '../carousel/carousel';
import 'swiper/swiper-bundle.css';
import './style.scss';

export function RenderProducts() {

    const { listProducts } = useGetCarouselOurProducts();

    return (
        <div className='main-our-products-container'>
            <div className='text-our-products-container'>NOSSOS PRODUTOS</div>
            <CarouselComponent products={listProducts} scroll={'our-products'} />
        </div>
    );
}
