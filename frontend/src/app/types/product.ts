export interface Product {
    message: string;
    data: ProductData[];
    favorites: number[];
}

export interface ProductData {
    id: number;
    name: string;
    image: string;
    category: string;
    description: string;
    price: number | string;
    rate: number | string;
}
