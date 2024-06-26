'use client';

import './style.scss';
import Image from 'next/image';
import 'swiper/swiper-bundle.css';
import { Tooltip } from '@mui/material';
import { Navigation } from 'swiper/modules';
import { useRouter } from 'next/navigation';
import { Button } from '../buttonCart/button';
import StarIcon from '@mui/icons-material/Star';
import { ProductData } from '@/app/types/product';
import { Swiper, SwiperSlide } from 'swiper/react';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import useProductStore from '@/app/stores/productStorage';
import FavoriteComponent from '../favoriteToggler/toggler';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import SkeletonComponent from '../skeleton/skeleton';

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
                        {
                            products.length !== 0 ?
                                products?.map((item: ProductData) => (
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
                                                style={{ objectFit: "contain" }}
                                                loading="eager"
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
                                            {item.defaultPrice &&
                                                <div className='card-price-container-number'>
                                                    <div style={{ textDecoration: 'line-through' }}>
                                                        R${item.defaultPrice}
                                                    </div>
                                                    -
                                                    <div>
                                                        R${item.price}
                                                    </div>
                                                </div>
                                            }
                                            {!item.defaultPrice && <div className='card-price-container-number'>R${item.price}</div>}
                                            <div className='card-pix-container-number'>À vista ou pix</div>
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
                                ))
                                :
                                <SwiperSlide style={{ width: "100vw" }}>
                                    <div style={{ display: 'flex', gap: 10, position: 'relative' }}>
                                        {
                                            [1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => <SkeletonComponent key={index} />)
                                        }
                                    </div>
                                </SwiperSlide>
                        }
                    </Swiper>
                    <ArrowCircleRightIcon id={`${scroll}swiper-button-prev-custom`} className="swiper-button" />
                </div>
            </div>
        </>
    );
}
