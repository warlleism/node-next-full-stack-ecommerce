'use client'

import './style.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import useUserStore from '@/app/stores/userStorage';
import PersonIcon from '@mui/icons-material/Person';
import useProductSearch from '@/app/hooks/useProductSearch';
import useProductStore from '@/app/stores/productStorage';
import useProductAllSearch from '@/app/hooks/useProductAllSearch';
import ButtonLogout from '../logoutButton/logout';
import ecommerceIcon from '../../../assets/ecommece-logo.png'
import LocalMallIcon from '@mui/icons-material/LocalMall';
import useCartStore from '@/app/stores/cartStorage';

export function Header() {

    const [animate, setAnimate] = useState(false);
    const { detailProduct } = useProductStore();
    const { user, initializeUser } = useUserStore();
    const { handleInputClick } = useProductAllSearch()
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
        handleInputClick(String(inputRef?.current?.value))
    };

    return (
        <div className='main-container-header'>
            <Link href={'/'} className='container-image'>
                <Image
                    className='image'
                    src={ecommerceIcon}
                    objectFit='contain'
                    alt='logo'
                    width={50}
                    height={50} />
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
                        onChange={() => handleInputChange()}
                    />
                </form>
                {
                    products.length !== 0 ?
                        <div
                            className='container-search-list'
                            ref={inputRefContainer}>
                            {products?.map((item: any, index) => (
                                <Link
                                    style={{ borderTop: index !== 0 ? '1px rgba(0, 0, 0, 0.075) solid' : 'none' }}
                                    href={'/pages/detailOne'}
                                    key={item?.id}
                                    className='container-search-card'
                                    onClick={() => detailProduct(item)}>
                                    <Image
                                        className="image"
                                        objectFit="cover"
                                        alt={item.name}
                                        src={`data:image/jpeg;base64,${item.image}`}
                                        width={40}
                                        height={40}
                                    />
                                    <div className='container-text-search'>
                                        <div>{item?.name}</div>
                                        <div>{item.description.substring(0, 80)}...</div>
                                    </div>
                                </Link>
                            ))}
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
