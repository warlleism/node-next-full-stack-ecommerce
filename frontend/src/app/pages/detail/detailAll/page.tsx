'use client'

import { useEffect } from 'react';
import useProductStore from "@/app/stores/productStorage";
import './style.scss';
import Image from "next/image";
import StarIcon from '@mui/icons-material/Star';
import { ProductData } from '@/app/types/product';
import { Header } from '../../../components/header';

export default function DetailAllProduct() {
    
    const { allProducts, initializeAllProduct } = useProductStore();

    useEffect(() => {
        initializeAllProduct();
    }, []);

    const renderStars = (rate: number | string) => {
        const stars = Array(3).fill(null).map((_, index) => (
            <StarIcon key={index} style={{ color: '#ffca00', fontSize: '.9rem' }} />
        ));
        return <div>{stars} ({rate})</div>;
    };

    return (
        <>
            <Header />
            {allProducts && allProducts.length > 0 ? (
                allProducts.map((item: ProductData, index: number) => (
                    <div key={index} className="main-container-detailAll">
                        <div className="container-detailAll-name">{item?.name}</div>
                        <div className="container-detailAll-info">
                            <div className="container-detailAll-img">
                                <Image
                                    className="image-detailAll"
                                    style={{ objectFit: "contain" }}
                                    alt="imagem-produto"
                                    src={`data:image/png;base64,${item?.image}`}
                                    width={500}
                                    height={500}
                                    loading="eager"
                                />
                            </div>
                            <div className="container-detailAll-buy">
                                <div>{item?.price}</div>
                                <div>{renderStars(item?.rate)}</div>
                                <div>{item?.category}</div>
                                <button>Adicionar ao Carrinho</button>
                            </div>
                        </div>
                        <div className="container-detailAll-description">{item?.description}</div>
                    </div>
                ))
            ) : (
                <div>Carregando produtos...</div>
            )}
        </>
    );
};

