'use client'

import './style.scss'
import AddIcon from '@mui/icons-material/Add';
import useUserStore from "@/app/stores/userStorage";
import useNewProductStore from "@/app/stores/createStorage";
import { RenderProducts } from "./components/render-products/products"
import { RenderSaleProducts } from "./components/render-sale-products/sale-products"

export default function HomePage() {

    const { displayCrudContainer } = useNewProductStore();
    const { user } = useUserStore();

    return (
        <div className="main-home-container">
            <div className="container-create-new-product">
                {user?.isAdmin && <div onClick={() => displayCrudContainer()} className='button-create-new-product'> <AddIcon />CRIAR PRODUTO</div>}
            </div>
            <RenderProducts />
            <RenderSaleProducts />
        </div>
    )
}