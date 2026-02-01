import type { searchOrderForm } from "../model/management-orders/Management-order-search";
import type { ManagementHome, ManagementOrderList, ManagementOrderListItems, ManagementOrders } from "../model/management-orders/Mangement-order";
import type { BrandAndCategoryForm, ProductColorForm, ProductForm, ProductSizeForm, SearchProductForm } from "../model/products/input/search-form-schema";
import type { ProducCategoryList, ProductBrandAndCategory, ProductBrandList, ProductDetail, ProductList, ProductListItem, ProductResult } from "../model/products/output/management-product-list";
import type { ProductColor, ProductSize } from "../model/products/output/product-size-and-color";
import { restClient, restClientData } from "../utils";

const MY_SNEAKER_URL = "management/product"

// Home
export async function managementHomeShow(): Promise<ManagementHome> {
    const response = await restClientData().get(`management/home`)
    return response.data
}

// Brands
export async function BrandCreate (form: BrandAndCategoryForm): Promise<ProductBrandList[]> {
    const response = await restClientData().post(`${MY_SNEAKER_URL}/brand/create`, form)
    return response.data
}
export async function Brands(): Promise<ProductBrandList[]> {
    const response = await restClientData().get(`${MY_SNEAKER_URL}/brand`)
    return response.data
}
export async function BrandDelete (id: number): Promise<ProductBrandList[]> {
    const response = await restClientData().post(`${MY_SNEAKER_URL}/brand/delete/${id}`)
    return response.data
}

// Category
export async function CategoryCreate (form: BrandAndCategoryForm): Promise<ProducCategoryList[]> {
    const response = await restClientData().post(`${MY_SNEAKER_URL}/category/create`, form)
    return response.data
}
export async function Categories(): Promise<ProducCategoryList[]> {
    const response = await restClientData().get(`${MY_SNEAKER_URL}/category`)
    return response.data
}
export async function CategoryDelete (id: number): Promise<ProducCategoryList[]> {
    const response = await restClientData().post(`${MY_SNEAKER_URL}/category/delete/${id}`)
    return response.data
}

// Products
export async function ProductListItems(): Promise<ProductListItem[]> {
    const response = await restClientData().get(`${MY_SNEAKER_URL}`)
    return response.data
}

export async function searchProducts(form: SearchProductForm): Promise<ProductList[]> {
    const response = await restClientData().get(`${MY_SNEAKER_URL}/search`, {params: form})
    return response.data
}

export async function createProduct(form: ProductForm):  Promise<ProductResult> {
    const response = await restClientData().post(`${MY_SNEAKER_URL}/edit`, form)
    return response.data
}

export async function updateProduct(id: unknown, form: ProductForm):  Promise<ProductResult> {
    const response = await restClientData().put(`${MY_SNEAKER_URL}/edit/${id}`, form)
    return response.data
}

export async function brandAndCategory(): Promise<ProductBrandAndCategory> {
    const response = await restClientData().get(`${MY_SNEAKER_URL}/edit`)
    return response.data
}

export async function searchProduct(id: number): Promise<ProductList> {
    const response = await restClientData().get(`${MY_SNEAKER_URL}/edit/${id}`)
    return response.data
}

export async function ProductDetailById(id: number): Promise<ProductList> {
    const response = await restClientData().get(`${MY_SNEAKER_URL}/${id}`)
    return response.data
}

export async function ProductSizeList(id: number): Promise<ProductSize[]> {
    const response = await restClientData().get(`${MY_SNEAKER_URL}${id}/size`)
    return response.data
}

export async function ProductDelete(id: number): Promise<ProductResult> {
    const response = await restClientData().delete(`${MY_SNEAKER_URL}/${id}`)
    return response.data
}

// Colors
export async function ShowAllColor(id: number): Promise<ProductColor[]> {
    const repsonse = await restClientData().get(`${MY_SNEAKER_URL}/${id}/color`)
    return repsonse.data
}

export async function CreateColor(productId: number, form: ProductColorForm): Promise<ProductColor[]> {
    const response = await restClientData().post(`${MY_SNEAKER_URL}/${productId}/color`, form)
    return response.data
}

export async function UpdateColor(productId: number, id: number, form: ProductColorForm): Promise<ProductColor[]> {
    const resposne = await restClientData().put(`${MY_SNEAKER_URL}/${productId}/color/${id}`, form)
    return resposne.data
}

export async function DeleteColor(productId: number, id: number): Promise<ProductResult> {
    const resposne = await restClientData().delete(`${MY_SNEAKER_URL}/${productId}/color/${id}`)
    return resposne.data
}

// Sizes
export async function CreateSize(productId: number, colorId: number, form: ProductSizeForm): Promise<ProductSize[]> {
    const response = await restClientData().post(`${MY_SNEAKER_URL}/${productId}/color/${colorId}/size`, form)
    return response.data
}

export async function UpdateSize(productId: number, colorId: number, sizeId: number, form: ProductSizeForm): Promise<ProductSize[]> {
    const response = await restClientData().put(`${MY_SNEAKER_URL}/${productId}/color/${colorId}/size/${sizeId}`, form)
    return response.data
}

export async function SearchSize(productId: number, colorId: number): Promise<ProductSize[]> {
    const response = await restClientData().get(`${MY_SNEAKER_URL}/${productId}/color/${colorId}/size`)
    return response.data
}

export async function DeleteSize(productId: number, colorId: number, sizeId: number): Promise<ProductResult> {
    const response = await restClientData().delete(`${MY_SNEAKER_URL}/${productId}/color/${colorId}/size/${sizeId}`)
    return response.data
}

// Order
export async function ManagementOrderList(): Promise<ManagementOrders[]> {
    const response = await restClientData().get(`management/order`)
    return response.data
}

export async function ManagementOrderSearch(form: searchOrderForm): Promise<ManagementOrders[]> {
    const response = await restClientData().get(`management/order/search`, {params: form})
    return response.data
}

export async function ManagementOrderItemsDetail(id: number): Promise<ManagementOrderListItems> {
    const reponse = await restClientData().get(`management/order/${id}`)
    return reponse.data
}

export async function ManagementOrderConfirmed(id: number): Promise<ProductResult> {
    const reponse = await restClientData().put(`management/order/${id}`)
    return reponse.data
}