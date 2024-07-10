'use client';

import './style.scss';
import 'swiper/swiper-bundle.css';
import { Navigation } from 'swiper/modules';
import { useRouter } from 'next/navigation';
import { ProductData } from '@/app/types/product';
import { Swiper, SwiperSlide } from 'swiper/react';
import SkeletonComponent from '../../../../components/skeleton/skeleton';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import useFilterProductStorage from '@/app/stores/filterProductStorage';
import Card from '../card/card';

export function CarouselComponent({ products, scroll }: any) {

    const route = useRouter()
    const { changeSearch } = useFilterProductStorage();

    function redirect() {
        changeSearch(null)
        localStorage.setItem('detailAll', scroll)
        setTimeout(() => route.push('/pages/detail/detailAll'), 400)
    }

    return (
        <div className="container-cards">
            <div className='container-carousel-see-all'>
                <div
                    onClick={() => redirect()}
                    style={{ cursor: 'pointer', width: 80, textAlign: 'center' }}>Ver Todos</div>
            </div>
            <div className='container-caroussel'>
                <ArrowCircleLeftIcon
                    style={{ display: products.length !== 0 ? 'block' : 'none' }}
                    id={`${scroll}swiper-button-next-custom`} className="swiper-button" />
                <Swiper
                    className='carousel'
                    spaceBetween={10}
                    slidesPerView={5}
                    slidesPerGroup={1}
                    pagination={{ clickable: true }}
                    navigation={{
                        prevEl: `#${scroll}swiper-button-next-custom`,
                        nextEl: `#${scroll}swiper-button-prev-custom`
                    }}
                    breakpoints={{ 768: { slidesPerView: 5 }, 100: { slidesPerView: 1 } }}
                    modules={[Navigation]}
                >
                    {
                        products.length !== 0 ?
                            products?.map((item: ProductData) => (
                                <SwiperSlide key={item.id}>
                                    <Card product={item} />
                                </SwiperSlide>
                            ))
                            :
                            <div style={{ display: 'flex', gap: 10, position: 'relative' }}>
                                <SkeletonComponent />
                            </div>
                    }
                </Swiper>
                <ArrowCircleRightIcon
                    style={{ display: products.length !== 0 ? 'block' : 'none' }}
                    id={`${scroll}swiper-button-prev-custom`} className="swiper-button" />
            </div>
        </div>
    );
}
