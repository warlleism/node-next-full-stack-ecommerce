'use client'

import './style.scss';
import { Drawer } from "@mui/material";
import useCartStore from "@/app/stores/cartStorage";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useProductStore from '@/app/stores/productStorage';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';

export default function CartSideBar() {

    const route = useRouter()
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
            anchor={'right'}
            open={show}
            onClose={() => showCart()}>
            <div className='container-close-cart'>
                <div>
                    CARRINHO
                </div>
                <div>
                    <CloseIcon className='icon-close-cart' onClick={() => showCart()} />
                </div>
            </div>
            <TransitionGroup className='container-cart-list-itens'>
                {cart.map((item) => (
                    <CSSTransition
                        key={item.id}
                        classNames="item"
                        timeout={500}>
                        <div className='container-itens-cart' key={item.id}>
                            <Image
                                className="image-cart"
                                objectFit="cover"
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
                <div className='container-cart-total'>Valor Total: R${fullPrice}</div>
                <div className='container-cart-finalize'>
                    <AccountBalanceWalletIcon className='icon-purchase' />
                    <div>
                        Finalizar Compra
                    </div>
                </div>
            </div>

        </Drawer>
    );
}
