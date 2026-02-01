import type { MemberProductCart, MemberWishlistItem, MmeberOrderList } from "./member-product-list"

export type MemberProfile = {
    name: string,
    email: string,
    phone: string,
    address: string,
    profileImage: string,
    wish: MemberWishlistItem[]
    cart: MemberProductCart[],
    order: MmeberOrderList[]
}

export type MemberResult = {
    success: boolean,
    message: string
}