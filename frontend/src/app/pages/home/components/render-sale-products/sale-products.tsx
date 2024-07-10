'use client';

import useGetCarouselInSaleProducts from '../../hooks/useGetCarouselInSaleProducts';
import { CarouselComponent } from '../carousel/carousel';
import PercentIcon from '@mui/icons-material/Percent';
import 'swiper/swiper-bundle.css';
import './style.scss';

export function RenderSaleProducts() {

    const { products } = useGetCarouselInSaleProducts();
   
    return (
        <div className='main-sale-our-products-container'>
            <div className='text-sale-our-products-container'>
                <PercentIcon className='icon-sale-our-percent' />
                PRODUTOS EM PROMOÇÃO</div>
            <CarouselComponent products={products} scroll={'sale-products'} />
        </div>
    );
}
