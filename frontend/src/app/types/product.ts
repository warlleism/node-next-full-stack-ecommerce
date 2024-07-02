export interface Product {
    message: string;
    data: ProductData[];
    favorites: number[];
}

export interface ProductData {
    userId?: number;
    id: any;
    name: string;
    image: string;
    category: string;
    description: string;
    price: any;
    rate: number | string | any;
    qtd?: number;
    sale?: number | string;
    defaultPrice?: number | string;
    cartPrice?: number | string;
}
