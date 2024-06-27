export interface Product {
    message: string;
    data: ProductData[];
    favorites: number[];
}

export interface ProductData {
    userId?: number;
    id: number;
    name: string;
    image: string;
    category: string;
    description: string;
    price: number | string;
    rate: number | string;
    qtd?: number;
    sale?: number | string;
    defaultPrice?: number | string;
    cartPrice?: number | string;
}
