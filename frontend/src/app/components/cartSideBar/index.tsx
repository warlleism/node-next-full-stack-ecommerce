'use client'

import './style.scss';
import Image from 'next/image';
import { useEffect } from 'react';
import { Box, Drawer } from "@mui/material";
import { useRouter } from 'next/navigation';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import useCartStore from "@/app/stores/cartStorage";
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import useUserStore from '@/app/stores/userStorage';
import useProductStore from '@/app/stores/productStorage';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export default function CartSideBar() {

    const route = useRouter()
    const { user } = useUserStore()
    const { detailProduct } = useProductStore();

    const {
        show,
        cart,
        showCart,
        fullPrice,
        calculatePrice,
        decrementQuantity,
        incrementQuantity,
        removeProductFromCart,
    } = useCartStore()

    useEffect(() => {
        calculatePrice()
    }, [cart]);

    return (
        <Drawer
            id='cart-side-container-drawer'
            anchor={'right'}
            open={show}
            onClose={() => showCart()}>
            <div className='main-cart-container' >
                <div className='container-close-cart'>
                    <div>
                        CARRINHO
                    </div>
                    <div>
                        <CloseIcon className='icon-close-cart' onClick={() => showCart()} />
                    </div>
                </div>
                <TransitionGroup className='container-cart-list-itens'>
                    {cart.map((item, index) => item.userId === user?.id && (
                        <CSSTransition
                            key={item.id}
                            classNames="item"
                            timeout={500}>
                            <div
                                className='container-itens-cart'
                                key={item.id}
                                style={{ borderBottom: cart.length === index + 1 ? 'none' : '1px solid #ddd' }}
                            >

                                <Image
                                    className="image-cart"
                                    style={{ objectFit: "contain" }}
                                    loading="eager"
                                    alt={item.name}
                                    src={`data:image/jpeg;base64,${item.image}`}
                                    width={500}
                                    height={500}
                                />
                                <div
                                    onClick={() => {
                                        detailProduct(item)
                                        route.push('/pages/detail/detailOne')
                                        showCart()
                                    }}
                                    className='cart-container-name'>{item.name}</div>
                                <div className='container-cart-qtd'>
                                    <div
                                        className='icon-container-qtd'
                                        onClick={() => incrementQuantity(item.id)}>
                                        <AddIcon className='cart-icon-qtd' />
                                    </div>
                                    <div className='cart-number-qtd'>
                                        {item.qtd}
                                    </div>
                                    <div
                                        style={{ pointerEvents: item.qtd === 1 ? 'none' : 'all' }}
                                        className='icon-container-qtd'
                                        onClick={() => decrementQuantity(item.id)}>
                                        <RemoveIcon className='cart-icon-qtd' />
                                    </div>
                                </div>
                                <div className='cart-container-price'>R$ {item.cartPrice}</div>
                                <DeleteIcon className='cart-icon-trash' onClick={() => removeProductFromCart(item.id)} />
                            </div>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
                <div className='container-finalize-purchase'>
                    <div className='container-cart-total'>Valor Total: <div style={{ fontWeight: 700 }}>R${fullPrice}</div></div>
                    <div className='container-cart-finalize'>
                        <AccountBalanceWalletIcon className='icon-purchase' />
                        <div>
                            Finalizar Compra
                        </div>
                    </div>
                </div>
            </div>

        </Drawer>
    );
}
