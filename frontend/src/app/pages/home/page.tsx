import { RenderProducts } from "./products/products"
import { RenderSaleProducts } from "./sale-products/sale-products"

export default function HomePage() {
    return (
        <div style={{
            margin: "0 auto",
            gap: 100,
            display: "flex",
            flexDirection: "column",
            width: '70%',
            backgroundColor: " #224177"
        }}>
            <RenderProducts />
            <RenderSaleProducts />
        </div>
    )
}