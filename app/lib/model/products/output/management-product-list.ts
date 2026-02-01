import type { ProductColor, ProductSize } from "./product-size-and-color"

export type ProductList = {
    id: number;
    name: string;
    description: string;
    brand: ProductBrandList;
    category: ProducCategoryList;
    createdAt: string;
    updatedAt: string;
    colors: ProductColor[];
    imageBase64: string | null; // allow null if no image
};

export type ProductBrandList = {
    id: string,
    name: string
}

export type ProducCategoryList = {
    id: string,
    name: string,
}

export type ProductBrandAndCategory = {
    brand: ProductBrandList[],
    categories: ProducCategoryList[]
}

export type ProductListItem = {
    products: ProductList[],
    list?: {
        brand: ProductBrandList[]
        categories: ProducCategoryList[]
    }
}

export type ProductDetail = {
    id: number,
    name: string,
    description: string,
    brand: string,
    category: string,
    createdAt: string,
    updatedAt: string
}

export type ProductResult = {
    id: number,
    check: boolean,
    message: string
}