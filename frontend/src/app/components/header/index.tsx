'use client'

import './style.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ButtonLogout from '../logoutButton/logout';
import { ProductData } from '@/app/types/product';
import useUserStore from '@/app/stores/userStorage';
import useCartStore from '@/app/stores/cartStorage';
import PersonIcon from '@mui/icons-material/Person';
import useProductStore from '@/app/stores/productStorage';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ecommerceIcon from '../../assets/ecommece-logo.png';
import useProductSearch from '@/app/hooks/useProductSearch';
import useFilterProductStorage from '@/app/stores/filterProductStorage';

export function Header() {

    const route = useRouter()
    const { user } = useUserStore();
    const { cart, showCart } = useCartStore();
    const { detailProduct } = useProductStore();
    const [animate, setAnimate] = useState(false);
    const { changeSearch } = useFilterProductStorage()
    const { error, products, setProducts, inputRef, handleInputChange, inputRefContainer } = useProductSearch()

    useEffect(() => {
        if (cart.length > 0) {
            setAnimate(true);
            const timer = setTimeout(() => setAnimate(false), 300);
            return () => clearTimeout(timer);
        }
    }, [cart.length]);

    function handleClick(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        try {
            if (inputRef.current?.value.length) {
                changeSearch(inputRef.current?.value)
                setProducts([])
                localStorage.setItem('detailAll', inputRef.current?.value)
                route.push('/pages/detail/detailAll')
            }
        } catch (error) {
            console.log(error)
        }
    };

    function cartlength() {
        const qtdItem = cart.filter((items) => items.userId == user?.id).length
        return qtdItem
    }


    return (
        <div className='main-container-header'>
            <Link href={'/'} className='container-image'>
                <Image
                    priority
                    alt='logo'
                    width={50}
                    height={50}
                    className='image'
                    src={ecommerceIcon}
                />
            </Link>
            <div className='search-container'>
                <form
                    className='input-container'
                    onSubmit={handleClick}>
                    <input
                        className='input-search'
                        ref={inputRef}
                        type='text'
                        placeholder='Busque aqui...'
                        onKeyDown={() => { handleInputChange() }}
                    />
                </form>
                {
                    products?.length !== 0 ?
                        <div className='container-search-list' ref={inputRefContainer}>
                            {products?.map((item: ProductData, index) => (
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
                                onClick={(event: React.MouseEvent<HTMLDivElement>) => handleClick(event as unknown as React.FormEvent<HTMLFormElement>)}
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
                <div>{cartlength()}</div>
                <LocalMallIcon />
            </div>
        </div>
    );
};

