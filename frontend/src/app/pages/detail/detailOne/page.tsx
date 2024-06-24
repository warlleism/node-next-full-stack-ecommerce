'use client'

import './style.scss'
import Image from "next/image";
import { useEffect } from 'react';
import StarIcon from '@mui/icons-material/Star';
import useProductStore from "@/app/stores/productStorage";
import { Header } from '../../components/header';

export default function DetailOneProduct() {

    const { product, initializeOneProduct } = useProductStore();

    useEffect(() => {
        initializeOneProduct();
    }, [initializeOneProduct]);

    if (!product) {
        return null;
    }

    return (
        <>
            <Header />
            <div className="main-container-detail">
                <div className="container-detail-name">{product.name}</div>
                <div className="container-detail-info">
                    <div className="container-detail-img">
                        <Image
                            className="image-detail"
                            objectFit="cover"
                            alt={product.name}
                            src={`data:image/jpeg;base64,${product.image}`}
                            width={500}
                            height={500}
                        />
                    </div>
                    <div className="container-detail-buy">
                        <div>{product.price}</div>
                        <div>
                            <StarIcon style={{ color: '#ffca00', fontSize: '.9rem' }} />
                            <StarIcon style={{ color: '#ffca00', fontSize: '.9rem' }} />
                            <StarIcon style={{ color: '#ffca00', fontSize: '.9rem' }} />
                            ({product.rate})
                        </div>
                        <div>{product.category}</div>
                        <button>Adicionar ao Carrinho</button>
                    </div>
                </div>
                <div className="container-detail-description">{product.description}</div>
            </div>
        </>
    );
}

