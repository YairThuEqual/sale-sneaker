import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { ProductDetailById } from "~/lib/client/management-product-clients";
import type { Route } from "./+types/details";
import type { ProductList } from "~/lib/model/products/output/management-product-list";

export function meta () {
    return [
        { title: "My Sneaker | Product Detail"},
        { name: "description", content: "Welcome to My Shop!" },
    ]
}

export const handle = {
    title: "Detail"
}

export async function loader({params}: Route.LoaderArgs){
    return {id: params.id}
}

export default function ProductDetails ({loaderData}: Route.ComponentProps) {

    const [product, setProduct] = useState<ProductList>()

    useEffect(() => {
        async function loadDetail() {
            const data = await ProductDetailById(Number(loaderData.id))
            setProduct(data)
        }
        loadDetail()
    }, [])

    return (
    <section className="w-full grid sm:grid-cols-1 md:grid-cols-4 gap-2">
        <div className="h-fit md:col-span-1 shadow-lg rounded-2xl p-3 gap-4 ">
            <div>
                <h1 className="text-3xl mb-3 font-bold">{product?.name}</h1>
                {product?.imageBase64 ? (
                    <img
                        src={product.imageBase64}
                        alt={product.name}
                        className="w-40 h-45 rounded-2xl object-cover object-center shadow-lg"
                    />
                ) : (
                 <span className="text-gray-400">
                    No image
                </span>
                )}
            </div>

            <div className="mt-3 flex flex-col gap-1 ml-3">
                <h3 className="text-gray-600 flex flex-col">
                    <span className="text-sm text-gray-400">Brand</span>
                    <span className="text-2xl">{product?.brand.name}</span>
                </h3>
                <h3 className="text-gray-600 flex flex-col">
                    <span className="text-sm text-gray-400">Category</span>
                    <span className="text-2xl">{product?.category.name}</span>
                </h3>
                <p className="text-sm text-gray-700">{product?.description}</p>
            </div>
        </div>
        <div className="h-fit md:col-span-3">
            <Outlet/>
        </div>

    </section>

    )
}