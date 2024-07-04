'use client'

import './style.scss';
import { Header } from '../../../components/header';
import CircularProgress from '@mui/material/CircularProgress';
import useGetDetailAllProducts from '../hooks/useGetDetailAllProducts';
import Card from '@/app/components/card/card';


export default function DetailAllProduct() {

    const { products, setPage, totalPages } = useGetDetailAllProducts();

    const pagination = () => {
        const stars = Array(totalPages).fill(null).map((_, index) => (
            <li key={index} onClick={() => setPage(index + 1)}>{index + 1}</li>
        ));
        return stars
    };

    return (
        <>
            <Header />
            {products ? (
                <div className='main-container-detail-all-container'>
                    <div className='list-filter-products-container'>
                        <div className='container-filter-container'>
                            <div className='filter-detail-all-container'>
                                filtro
                            </div>
                        </div>
                        <div className='container-cards-detail-all-container'>
                            <Card products={products} />
                            <ul className='container-paginacao-detadetail-all-container'>{pagination()}</ul>
                        </div>
                    </div>
                </div>

            ) : (
                <div className='container-detailAll-loading'>
                    <CircularProgress
                        variant="indeterminate"
                        disableShrink
                        sx={{ color: '#32004e', animationDuration: '550ms' }}
                        size={120}
                    />
                </div>
            )}

        </>
    );
};

