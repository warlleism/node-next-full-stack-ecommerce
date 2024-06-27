'use client'

import './style.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import useUserStore from '@/app/stores/userStorage';
import PersonIcon from '@mui/icons-material/Person';
import useProductSearch from '@/app/hooks/useProductSearch';
import useProductStore from '@/app/stores/productStorage';
import ButtonLogout from '../logoutButton/logout';
import ecommerceIcon from '../../../assets/ecommece-logo.png'
import LocalMallIcon from '@mui/icons-material/LocalMall';
import useCartStore from '@/app/stores/cartStorage';

export function Header() {

    const [animate, setAnimate] = useState(false);
    const { detailProduct } = useProductStore();
    const { user, initializeUser } = useUserStore();
    const { cart, initializeCart, showCart } = useCartStore();
    const { error, products, inputRef, handleInputChange, inputRefContainer } = useProductSearch()

    useEffect(() => {
        initializeUser();
        initializeCart();
    }, [initializeUser]);

    useEffect(() => {
        if (cart.length > 0) {
            setAnimate(true);
            const timer = setTimeout(() => setAnimate(false), 300);
            return () => clearTimeout(timer);
        }
    }, [cart.length]);

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        handleInputChange(1, 30)
    };

    const handleClick = () => {
        const syntheticEvent = { preventDefault: () => { } } as React.FormEvent<HTMLFormElement>;
        handleFormSubmit(syntheticEvent);
    };

    return (
        <div className='main-container-header'>
            <Link href={'/'} className='container-image'>
                <Image
                    className='image'
                    src={ecommerceIcon}
                    alt='logo'
                    width={50}
                    height={50}
                    priority
                />
            </Link>
            <div className='search-container'>
                <form
                    className='input-container'
                    onSubmit={handleFormSubmit}>
                    <input
                        className='input-search'
                        ref={inputRef}
                        type='text'
                        placeholder='Busque aqui...'
                        onChange={() => handleInputChange(1, 4)}
                    />
                </form>
                {
                    products.length !== 0 ?
                        <div className='container-search-list' ref={inputRefContainer}>
                            {products?.map((item: any, index) => (
                                <Link
                                    style={{ borderTop: index !== 0 ? '1px rgba(0, 0, 0, 0.075) solid' : 'none' }}
                                    href={'/pages/detail/detailOne'}
                                    key={item?.id}
                                    className='container-search-card'
                                    onClick={() => detailProduct(item)}>
                                    <Image
                                        className="image"
                                        style={{ objectFit: "contain" }}
                                        alt={item.name}
                                        src={`data:image/png;base64,${item.image}`}
                                        width={40}
                                        height={40}
                                        loading="eager"
                                    />
                                    <div className='container-text-search'>
                                        <div>{item?.name}</div>
                                        <div>{item.description.substring(0, 80)}...</div>
                                    </div>
                                </Link>
                            ))}
                            <div
                                onClick={handleClick}
                                style={{ fontWeight: 700, color: '#000000b0', cursor: 'pointer' }}>
                                Ver Todos...
                            </div>
                        </div>
                        :
                        error.length !== 0 && <div className='container-search-list'>{error.length !== 0 ? error : null}</div>
                }
            </div>
            {
                user !== null ? (
                    <div className='container-logout'>
                        <div> Olá, {user.name}</div> |
                        <ButtonLogout />
                    </div>
                ) : (
                    <div className='container-login-cadastro'>
                        <div className='container-header-icon'>
                            <PersonIcon style={{ fontSize: 34 }} />
                        </div>
                        <div className='container-header-links'>
                            Faça seu
                            <Link href={'/pages/auth/login'}> Login</Link> ou crie seu
                            <Link href={'/pages/auth/register'}> Cadastro</Link>
                        </div>
                    </div>
                )
            }
            <div
                id='qtd-cart'
                className={`container-header-bag-number ${animate ? 'animated' : ''}`}
                onClick={() => showCart()}>
                <div>{cart?.length}</div>
                <LocalMallIcon />
            </div>
        </div>
    );
};

