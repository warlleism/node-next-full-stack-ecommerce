'use client'

import useCartStore from "@/app/stores/cartStorage"
import { Header } from "../components/header/page"
import { useEffect } from "react"

export default function Cart() {

    const { cart, initializeCart } = useCartStore()
    console.log(cart)

    return (
        <>
            <Header />
            cart
        </>
    )
}
