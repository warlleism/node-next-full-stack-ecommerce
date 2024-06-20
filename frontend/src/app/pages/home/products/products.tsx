'use client';

import './style.scss';
import Image from 'next/image';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { Tooltip } from '@mui/material';
import { Button } from '../components/buttonCart/button';
import useProductsWithFavorites from '@/app/hooks/useProductsWithFavorites';
import FavoriteComponent from '../components/favoriteToggler/toggler';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Autoplay } from 'swiper/modules';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

export function RenderProducts() {
    const { products } = useProductsWithFavorites();

    return (
        <>
            <div className="container-cards">
                <div className='container-caroussel'>
                    <ArrowCircleLeftIcon className="swiper-button swiper-button-prev-custom" />
                    <Swiper
                        className='carousel'
                        spaceBetween={10}
                        slidesPerView={5}
                        loop={true}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        navigation={{
                            nextEl: '.swiper-button-next-custom',
                            prevEl: '.swiper-button-prev-custom'
                        }}
                        modules={[Navigation, Autoplay]}
                    >
                        {products?.map((item) => (
                            <SwiperSlide
                                key={item.id}
                                className="product-card">
                                <div className="card-image-container">
                                    <FavoriteComponent id={item.id} />
                                    <Image
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
                    <ArrowCircleRightIcon className="swiper-button swiper-button-next-custom" />
                </div>
            </div>
        </>
    );
}