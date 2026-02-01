import type { AddToCartForm, OrderForm } from "../model/input/m-product-cart";
import type { MemberProfileForm } from "../model/input/m-profile";
import type { ProductBrandAndCategory, ProductList, ProductResult } from "../model/products/output/management-product-list";
import type { MemberProductCart, MemberProductList, MemberWishlistItem } from "../model/products/output/member-product-list";
import type { MemberProfile, MemberResult } from "../model/products/output/member-profile";
import { restClientData } from "../utils";

const MY_SNEAKER_URL = "member"

export async function MemberProfileView(): Promise<MemberProfile> {
    const response = await restClientData().get(`${MY_SNEAKER_URL}/profile`)
    return response.data
}

export async function MemberProfileEdit(form: MemberProfileForm): Promise<MemberResult> {
    const response = await restClientData().put(`${MY_SNEAKER_URL}/profile/edit`, form)
    return response.data
}

export async function ProductShowList() : Promise<MemberProductList[]> {
    const response = await restClientData().get(`${MY_SNEAKER_URL}`)
    return response.data
} 

export async function ProductDetail(id: number): Promise<MemberProductList> {
    const response = await restClientData().get(`${MY_SNEAKER_URL}/product/${id}`)
    return response.data
}

export async function selectBrandAndCategory(): Promise<ProductBrandAndCategory> {
    const response = await restClientData().get(`${MY_SNEAKER_URL}/product/search/options`)
    return response.data
}

export async function searchProductByFilter(params: {
    keyword?: string;
    brand?: string;
    category?: string;
}): Promise<MemberProductList[]> {
  const response = await restClientData().get(
    `${MY_SNEAKER_URL}/product/search`,
    { params }
  );
  return response.data;
}


export async function MemberCart(): Promise<MemberProductCart[]> {
    const response = await restClientData().get(`${MY_SNEAKER_URL}/cart`)
    return response.data
}

export async function AddToCart(form: AddToCartForm): Promise<ProductResult> {
    const response = await restClientData().post(`${MY_SNEAKER_URL}/cart`, form)
    return response.data
}

export async function CartStockIncrease(id: number): Promise<ProductResult> {
    const response = await restClientData().patch(`${MY_SNEAKER_URL}/cart/${id}/increase`)
    return response.data
}

export async function CartStockDecrease(id: number): Promise<ProductResult> {
    const response = await restClientData().patch(`${MY_SNEAKER_URL}/cart/${id}/decrease`)
    return response.data
}

export async function CartDelete(id: number): Promise<ProductResult> {
    const response = await restClientData().delete(`${MY_SNEAKER_URL}/cart/${id}/delete`)
    return response.data
}

export async function OrderCreate(form: OrderForm): Promise<ProductResult> {
    const response = await restClientData().post(`${MY_SNEAKER_URL}/cart/order`, form)
    return response.data
}

// Wishlist
export async function memberWishlist(): Promise<MemberWishlistItem[]> {
    const response = await restClientData().get(`${MY_SNEAKER_URL}/wishlist`)
    return response.data
}

export async function memberWishlistToggle(id: number): Promise<ProductResult> {
    const response = await restClientData().get(`${MY_SNEAKER_URL}/wishlist/${id}`)
    return response.data
}