'use client'

import './style.scss'
import Image from "next/image";
import { useEffect } from 'react';
import StarIcon from '@mui/icons-material/Star';
import useProductStore from "@/app/stores/productStorage";
import { Header } from '../../../components/header';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useRouter } from 'next/navigation';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { useAddProductInCart } from '@/app/utils/cartUtil';
import LoadingComponent from '@/app/components/loadingComponent/loading';

export default function DetailOneProduct() {

    const router = useRouter();
    const { favorite, product, initializeOneProduct } = useProductStore();
    const { addProductInCart, redirectUserFavorite } = useAddProductInCart(router);

    useEffect(() => {
        initializeOneProduct();
    }, []);

    const generateStars = (rate: number) => {
        const starts = [1, 2, 3].map((e, index) => < StarIcon key={index} className='start-detail-one' />)
        return <div className='container-detail-one-stars'>
            {starts}
            <StarHalfIcon className='start-detail-one' />
            ({rate})
        </div>
    }

    if (!product) {
        return null;
    }


    return (
        <>
            <Header />
            {
                product ?
                    <div className="main-container-detail">
                        <ArrowBackIosIcon onClick={() => router.back()} style={{ fontSize: 30, cursor: 'pointer', textAlign: 'center', padding: 10 }} />
                        <div className="container-detail-info">
                            <div className="container-detail-img">
                                <Image
                                    className="image-detail"
                                    style={{ objectFit: "contain" }}
                                    loading="eager"
                                    alt={product?.name}
                                    src={`data:image/jpeg;base64,${product?.image}`}
                                    width={500}
                                    height={500}
                                />
                            </div>
                            <div className="container-detail-buy">
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div className='container-detail-one-category'>{product?.category}</div>
                                        {generateStars(product?.rate)}
                                    </div>
                                    <div className="container-detail-name">{product?.name}</div>
                                </div>
                                {
                                    product?.defaultPrice ?
                                        <div className='container-detail-one-prices'>
                                            <div className='container-detail-one-default-price' style={{ textDecoration: 'line-through' }}>R${product?.defaultPrice}</div>
                                            <div className='container-detail-one-price' >R${product?.price}</div>
                                        </div>
                                        :
                                        <div className='container-detail-one-prices'>
                                            <div className='container-detail-one-price' >R${product?.price}</div>
                                        </div>
                                }
                                <div className="container-detail-description">
                                    <div>Descrição Do Produto:</div>
                                    <div>
                                        {product?.description}
                                    </div>
                                </div>
                                <div className="container-detail-cart-buttons">
                                    <button onClick={() => addProductInCart(product)} className="container-detail-cart-button"><ShoppingBagIcon />Carrinho</button>
                                    <button onClick={() => redirectUserFavorite(product?.id)} className="container-detail-cart-button"><FavoriteIcon style={{ color: favorite?.includes(product?.id) ? '#ff7e33' : '#0c0c0cea' }} />Favoritar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <LoadingComponent />
            }

        </>
    );
}

