'use client';

import useProductsInSale from '@/app/hooks/useProductsInSale';
import { CarouselComponent } from '../carousel/carousel';
import PercentIcon from '@mui/icons-material/Percent';
import 'swiper/swiper-bundle.css';
import './style.scss';

export function RenderSaleProducts() {

    const { products } = useProductsInSale();

    return (
        <div className='main-sale-our-products-container'>
            <div className='text-sale-our-products-container'>
                <PercentIcon className='icon-sale-our-percent' />
                PRODUTOS EM PROMOÇÃO</div>
            <CarouselComponent products={products} scroll={'sale-products'} />
        </div>
    );
}
