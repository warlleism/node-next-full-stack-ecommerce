'use client';

import './style.scss';
import 'swiper/swiper-bundle.css';
import { CarouselComponent } from '../carousel/carousel';
import useGetCarouselOurProducts from '../../hooks/useGetCarouselOurProducts';

export function RenderProducts() {

    const { listProducts } = useGetCarouselOurProducts();

    return (
        <div className='main-our-products-container'>
            <div className='text-our-products-container'>NOSSOS PRODUTOS</div>
            <CarouselComponent products={listProducts} scroll={'our-products'} />
        </div>
    );
}
