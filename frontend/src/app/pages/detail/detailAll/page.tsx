'use client';

import './style.scss';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Header } from '../../../components/header';
import useGetDetailAllProducts from '../hooks/useGetDetailAllProducts';
import LoadingComponent from '@/app/components/loadingComponent/loading';
import CardDetail from '@/app/components/cardDetail/card';
import { Select, MenuItem, InputLabel, FormControl, TextField } from '@mui/material';

export default function DetailAllProduct() {

    const [price, setPrice] = useState<any>('Selecione...')
    const [searchTerm, setSearchTerm] = useState('');
    const { totalPages, products, setPage, qtdItens, setQtdItens } = useGetDetailAllProducts();
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        let sortedProducts = [...products];
        if (price === 'Maior preço') {
            sortedProducts.sort((a, b) => b.price - a.price);
        } else if (price === 'Menor preço') {
            sortedProducts.sort((a, b) => a.price - b.price);
        }
        setFilteredProducts(sortedProducts);
    }, [price]);

    useEffect(() => {
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchTerm]);


    const pagination = () => {
        const pages = Array(totalPages).fill(null).map((_, index) => (
            <li key={index} onClick={() => setPage(index + 1)}>{index + 1}</li>
        ));
        return pages;
    };

    const handleItemsPerPageChange = (event: any) => {
        setQtdItens(Number(event.target.value));
    };


    return (
        <div>
            <div style={{ position: 'absolute', top: 0, backgroundColor: '#f6f6f6' }} />
            <Header />
            {
                products.length !== 0 ? (
                    <div className='main-container-detail-all-container'>
                        <div className='container-controls'>
                            <div className='items-per-page'>
                                <FormControl variant='outlined' fullWidth>
                                    <InputLabel id='items-per-page-label'>Quantidade de produtos</InputLabel>
                                    <Select
                                        labelId='items-per-page-label'
                                        id='items-per-page'
                                        value={qtdItens}
                                        onChange={handleItemsPerPageChange}
                                        label='Quantidade de produtos'
                                    >
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={10}>10</MenuItem>
                                        <MenuItem value={20}>20</MenuItem>
                                        <MenuItem value={50}>50</MenuItem>
                                        <MenuItem value={100}>100</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className='items-per-page'>
                                <FormControl variant='outlined' fullWidth>
                                    <InputLabel id='items-per-page-label'>Ordem de preço:</InputLabel>
                                    <Select
                                        labelId='items-per-page-label'
                                        id='items-per-page'
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        label='Quantidade de produtos'
                                    >
                                        <MenuItem value={'Selecione...'}>Selecione...</MenuItem>
                                        <MenuItem value={'Maior preço'}>Maior preço</MenuItem>
                                        <MenuItem value={'Menor preço'}>Menor preço</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className='search-bar'>
                                <TextField
                                    id='search'
                                    label='Buscar produto...'
                                    variant='outlined'
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    fullWidth
                                />
                            </div>
                        </div>
                        <div className='container-cards-detail-all-container'>
                            <motion.div
                                className='card-animation'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <CardDetail products={filteredProducts.length !== 0 ? filteredProducts : products} />
                            </motion.div>
                            {searchTerm.length !== 0 ? null : <ul className='container-paginacao-detadetail-all-container'>{pagination()}</ul>}
                        </div>
                    </div>
                ) : (
                    <LoadingComponent />
                )}
        </div>
    );
};
