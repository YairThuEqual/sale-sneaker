export type ProductSize = {
    id: number,
    size: string,
    stock: number,
    price: number
}

export type ProductColor = {
    id: number,
    color: string,
    colorCode: string,
    image: string | null,
    sizes: ProductSize[],
    createdAt: string,
    updatedAt: string
}