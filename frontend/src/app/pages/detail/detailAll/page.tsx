'use client'

import { useEffect } from 'react';
import { Header } from "@/app/pages/components/header/page";
import useProductStore from "@/app/stores/productStorage";
import './style.scss'
import Image from "next/image";
import StarIcon from '@mui/icons-material/Star';
import { ProductData } from '@/app/types/product';

const DetailAllProduct = () => {
    const { allProducts, initializeAllProduct } = useProductStore();

    useEffect(() => {
        initializeAllProduct();
    }, [initializeAllProduct]);

    const products: ProductData[] = allProducts as ProductData[];

    return (
        <>
            <Header />
            {products?.map((item: ProductData, index: number) => (
                <div key={index} className="main-container-detailAll">
                    <div className="container-detailAll-name">{item?.name}</div>
                    <div className="container-detailAll-info">
                        <div className="container-detailAll-img">
                            <Image
                                className="image-detailAll"
                                objectFit="cover"
                                alt={item?.name}
                                src={`data:image/jpeg;base64,${item?.image}`}
                                width={500}
                                height={500}
                            />
                        </div>
                        <div className="container-detailAll-buy">
                            <div>{item?.price}</div>
                            <div>
                                <StarIcon style={{ color: '#ffca00', fontSize: '.9rem' }} />
                                <StarIcon style={{ color: '#ffca00', fontSize: '.9rem' }} />
                                <StarIcon style={{ color: '#ffca00', fontSize: '.9rem' }} />
                                ({item?.rate})
                            </div>
                            <div>{item?.category}</div>
                            <button>Adicionar ao Carrinho</button>
                        </div>
                    </div>
                    <div className="container-detailAll-description">{item?.description}</div>
                </div>
            ))}
        </>
    );
}

export default DetailAllProduct;
