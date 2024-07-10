'use client'

import './style.scss';
import { Header } from '../../../components/header';
import useGetDetailAllProducts from '../hooks/useGetDetailAllProducts';
import LoadingComponent from '@/app/components/loadingComponent/loading';
import CardDetail from '@/app/components/cardDetail/card';

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
            {
                products.length !== 0 ? (
                    <div className='main-container-detail-all-container'>
                        <div className='list-filter-products-container'>
                            <div className='container-filter-container'>
                                <div className='filter-detail-all-container'>
                                    filtro
                                </div>
                            </div>
                            <div className='container-cards-detail-all-container'>
                                <CardDetail products={products} />
                                <ul className='container-paginacao-detadetail-all-container'>{pagination()}</ul>
                            </div>
                        </div>
                    </div>

                ) : (
                    <LoadingComponent />
                )}

        </>
    );
};

