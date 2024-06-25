'use client';

import './style.scss';
import Image from 'next/image';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { Tooltip } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import useProductStore from '@/app/stores/productStorage';
import { useRouter } from 'next/navigation';
import 'swiper/swiper-bundle.css';
import { ProductData } from '@/app/types/product';
import { Button } from '../buttonCart/button';
import FavoriteComponent from '../favoriteToggler/toggler';

export function CarouselComponent({ products, scroll }: any) {

    const route = useRouter()
    const { detailProduct, detailAllProduct } = useProductStore();

    return (
        <>
            <div className="container-cards">
                <div
                    onClick={() => {
                        detailAllProduct(products)
                        route.push('/pages/detail/detailAll')
                    }}
                    className='container-carousel-see-all'>Ver Todos</div>
                <div className='container-caroussel'>
                    <ArrowCircleLeftIcon
                        id={`${scroll}swiper-button-next-custom`}
                        className="swiper-button" />
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
                        {products?.map((item: ProductData) => (
                            <SwiperSlide
                                key={item.id}
                                className="product-card">
                                {item.sale && <div className='container-sale-number'>{item?.sale}%</div>}
                                <div
                                    className="card-image-container">
                                    <FavoriteComponent id={item.id} />
                                    <Image
                                        onClick={() => {
                                            detailProduct(item)
                                            route.push('/pages/detail/detailOne')
                                        }}
                                        className="image"
                                        objectFit="cover"
                                        alt={item.name}
                                        src={`data:image/jpeg;base64,${item.image}`}
                                        width={500}
                                        height={500}
                                    />
                                </div>
                                <div>
                                    <div className="card-category-container">{item.category}</div>
                                    <div className="card-name-container">{item.name}</div>
                                </div>
                                <Tooltip title={item.description}>
                                    <div className="card-description-container"> {item.description.substring(0, 80)}...</div>
                                </Tooltip>
                                <div className="card-price-container">
                                    <div>R$ {item.price}</div>
                                    <div>À vista ou pix</div>
                                </div>
                                <Tooltip title={`${item.rate} avaliações`}>
                                    <div className="card-rate-container">
                                        <StarIcon className='start-home-icon' />
                                        <StarIcon className='start-home-icon' />
                                        <StarHalfIcon className='start-home-icon' />
                                        ({item.rate} avaliações)
                                    </div>
                                </Tooltip>
                                <Button data={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <ArrowCircleRightIcon id={`${scroll}swiper-button-prev-custom`} className="swiper-button" />
                </div>
            </div>
        </>
    );
}
