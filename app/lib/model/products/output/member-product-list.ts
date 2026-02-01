import type { ProducCategoryList, ProductBrandList } from "./management-product-list";
import type { ProductColor, ProductSize } from "./product-size-and-color";

export type MemberProductList = {
    id: number;
    name: string;
    description: string;
    brand: ProductBrandList;
    category: ProducCategoryList;
    colors: ProductColor[];
    image: string;
    wish: boolean;
}

export type MemberProductCart = {
    id: number,
    image: string,
    productName: string,
    colorName: string,
    size: number,
    quantity: number,
    price: number
}

export type MmeberOrderList = {
    id: number,
    name: string,
    email: string,
    phone: string,
    total: string,
    address: string,
    status: string,
    orderedAt: string,
    orderItems: MemberOrderItemList[]
}

export type MemberOrderItemList = {
    id: number,
    image: string,
    productName: string,
    color: string,
    size: number,
    quantity: number,
    price: number
}

export type MemberWishlistItem = {
    id: number,
    product: MemberProductList
}