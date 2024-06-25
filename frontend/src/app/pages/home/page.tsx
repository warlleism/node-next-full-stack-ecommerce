import { RenderProducts } from "./components/render-products/products"
import { RenderSaleProducts } from "./components/render-sale-products/sale-products"
import './style.scss'

export default function HomePage() {
    return (
        <div className="main-home-container">
            <RenderProducts />
            <RenderSaleProducts />
        </div>
    )
}