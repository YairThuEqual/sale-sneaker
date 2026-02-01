import type { ProductList } from "../products/output/management-product-list"
import type { MemberOrderItemList } from "../products/output/member-product-list"
import type { MemberProfile } from "../products/output/member-profile"

export type ManagementOrders = {
    id: number,
    name: string,
    email: string,
    phone: string,
    address: string,
    status: string,
    total: number,
    orderAt: string
}

export type ManagementOrderList = {
    id: number,
    member: memberInfoForManagement
    name: string,
    email: string,
    phone: string,
    address: string,
    status: string,
    total: number,
    orderedAt: string
}

export type memberInfoForManagement = {
    id: number,
    name: string,
    email: string,
    phone: string,
    address: string,
    image: string,
    createdAt: string,
    updatedAt: string
}

export type ManagementOrderListItems = {
    order: ManagementOrderList,
    orderItems: MemberOrderItemList[]
}

export type ManagementHome = {
    orderCounts: number,
    saleCounts: number,
    productCounts: number,
    lowProductCounts: number,
    orders: ManagementOrders[],
    products: ProductList[]
}