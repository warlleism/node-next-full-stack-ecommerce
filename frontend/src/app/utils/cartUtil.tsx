import { useRouter } from "next/navigation";
import useCartStore from "../stores/cartStorage";
import useUserStore from "../stores/userStorage";
import { ProductData } from "../types/product";
import useFavoritesProducts from "../hooks/useFavoritesProducts";

export function useAddProductInCart(router: ReturnType<typeof useRouter>) {
    const { cart, addProductToCart, showCart } = useCartStore();
    const { user } = useUserStore();
    const { fetchFavorite } = useFavoritesProducts();

    const redirectUserFavorite = (id: number) => {
        if (user) {
            fetchFavorite({ product_id: id });
        } else {
            router.push('/pages/auth/login');
        }
    };

    const addProductInCart = (product: ProductData) => {
        try {
            const isInCart = cart.some(item => item.id === product.id && item.userId === user?.id);

            if (isInCart) {
                showCart();
            } else if (user) {
                addProductToCart({ ...product, cartPrice: product.price, userId: user.id, qtd: 1 });
            } else {
                router.push('/pages/auth/login');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return { addProductInCart, redirectUserFavorite };
};

export default useAddProductInCart;
