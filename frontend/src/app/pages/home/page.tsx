import { RenderProducts } from "./products/products"
import { Header } from "@/app/components/header/page"

export default async function HomePage() {

    return (
        <div>
            <Header />
            <RenderProducts />
        </div>
    )
}