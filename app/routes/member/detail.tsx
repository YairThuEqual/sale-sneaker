import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useNavigate, type LoaderFunctionArgs } from "react-router";
import { Minus, Plus } from "lucide-react";

import type { Route } from "./+types/detail";
import { AddToCart, ProductDetail } from "~/lib/client/member-product-client";
import type { MemberProductList } from "~/lib/model/products/output/member-product-list";
import type { ProductColor } from "~/lib/model/products/output/product-size-and-color";
import { AddToCartSchema, type AddToCartForm } from "~/lib/model/input/m-product-cart";

import { Button } from "~/components/ui/button";
import AppFormInput from "~/components/custom/app-form-input";

export async function loader({ params }: LoaderFunctionArgs) {
    return { id: params.id };
}

type SelectSizeProp = {
    id: number;
    size: string;
    price: number;
    stock: number;
};

export default function MemberProductDetail({ loaderData }: Route.ComponentProps) {
    const id = Number(loaderData.id);
    const navigate = useNavigate();

    const [product, setProduct] = useState<MemberProductList | null>(null);
    const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
    const [selectedSize, setSelectedSize] = useState<SelectSizeProp | null>(null);
    const [selectedImage, setSelectedImage] = useState("");
    const [quantity, setQuantity] = useState(1);

    const form = useForm<AddToCartForm>({
        resolver: zodResolver(AddToCartSchema),
        defaultValues: {
            productId: 0,
            colorId: 0,
            sizeId: 0,
            quantity: 1,
            price: 0
        }
    });

    /* ------------------ Load product ------------------ */
    useEffect(() => {
        async function load() {
            const response = await ProductDetail(id);
            setProduct(response);
            setSelectedImage(response.image);
            form.setValue("productId", response.id);
        }
        load();
    }, [id]);

    /* ------------------ Sync form values ------------------ */
    useEffect(() => {
        if (selectedColor) {
            form.setValue("colorId", selectedColor.id);
        }
    }, [selectedColor]);

    useEffect(() => {
        if (selectedSize) {
            form.setValue("sizeId", selectedSize.id);
            form.setValue("price", selectedSize.price);
        }
    }, [selectedSize]);

    useEffect(() => {
        form.setValue("quantity", quantity);
    }, [quantity]);

    /* ------------------ Quantity handlers ------------------ */
    const handleIncrease = () => {
        if (selectedSize && quantity < selectedSize.stock) {
            setQuantity(q => q + 1);
        }
    };

    const handleDecrease = () => {
        if (quantity > 1) setQuantity(q => q - 1);
    };

    /* ------------------ Submit ------------------ */
    const onSubmit = async (data: AddToCartForm) => {
        if (!selectedColor || !selectedSize) {
            alert("Please select color and size first!");
            return;
        }

        console.log("Add To Cart Payload:", data);

        const response = await AddToCart(data);
        console.log(response)

        if (response.check) {
            navigate("/member/cart");
        } else {
            alert("Add to cart failed");
        }
    };

    return (
        <div className="my-15">
            <div className="grid md:grid-cols-2 gap-5">
                {/* IMAGE */}
                <div className="flex justify-center p-10">
                    <img
                        src={selectedImage}
                        className="w-[400px] h-[440px] object-cover object-center shadow-lg"
                    />
                </div>

                {/* DETAIL */}
                <div className="p-10 shadow-lg rounded-2xl">
                    <h1 className="text-3xl font-bold">{product?.name}</h1>

                    <p className="text-gray-400 mt-2">
                        Brand: <span className="text-black ml-2">{product?.brand.name}</span>
                    </p>

                    <p className="text-gray-400">
                        Category: <span className="text-black ml-2">{product?.category.name}</span>
                    </p>

                    {/* COLOR */}
                    <div className="mt-4">
                        <p className="mb-2">Color</p>
                        <div className="flex gap-3">
                            {product?.colors.map(c => (
                                <ColorRadio
                                    key={c.id}
                                    colorCode={c.colorCode}
                                    checked={selectedColor?.id === c.id}
                                    onSelect={() => {
                                        setSelectedColor(c);
                                        setSelectedSize(null);
                                        setQuantity(1);
                                        if (c.image) setSelectedImage(c.image);
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* SIZE */}
                    {selectedColor && (
                        <div className="mt-4">
                            <p className="mb-2">Size</p>
                            <div className="flex gap-3 flex-wrap">
                                {selectedColor.sizes.map(s => (
                                    <button
                                        key={s.id}
                                        type="button"
                                        onClick={() => {
                                            setSelectedSize(s);
                                            setQuantity(1);
                                        }}
                                        className={`px-4 py-1 border rounded-md ${
                                            selectedSize?.id === s.id
                                                ? "bg-black text-white"
                                                : "border-gray-300"
                                        }`}
                                    >
                                        {s.size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* PRICE + FORM */}
                    {selectedSize && (
                        <div className="mt-6 space-y-3">
                            <p className="text-xl font-bold">
                                {selectedSize.price.toLocaleString()} MMK
                            </p>

                            <p
                                className={`text-sm ${
                                    selectedSize.stock > 0 ? "text-green-600" : "text-red-600"
                                }`}
                            >
                                {selectedSize.stock > 0
                                    ? `In Stock (${selectedSize.stock})`
                                    : "Out of Stock"}
                            </p>

                            {/* QUANTITY */}
                            <div className="flex items-center gap-2">
                                <Button type="button" variant="outline" onClick={handleDecrease}>
                                    <Minus />
                                </Button>
                                <span>{quantity}</span>
                                {quantity < selectedSize.stock && (
                                    <Button type="button" variant="outline" onClick={handleIncrease}>
                                        <Plus />
                                    </Button>
                                )}
                            </div>

                            {/* FORM */}
                            <FormProvider {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <AppFormInput control={form.control} path="productId" label="" type="hidden" />
                                    <AppFormInput control={form.control} path="colorId" label="" type="hidden" />
                                    <AppFormInput control={form.control} path="sizeId" label="" type="hidden" />
                                    <AppFormInput control={form.control} path="quantity" label="" type="hidden" />
                                    <AppFormInput control={form.control} path="price" label="" type="hidden" />

                                    <Button
                                        type="submit"
                                        disabled={selectedSize.stock === 0}
                                        className="mt-4 bg-black text-white"
                                    >
                                        <Plus /> Add to Cart
                                    </Button>
                                </form>
                            </FormProvider>
                        </div>
                    )}

                    <div className="mt-6">
                        <p className="text-gray-400">Description</p>
                        <p>{product?.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ------------------ Color Radio ------------------ */
type ColorRadioProps = {
    colorCode: string;
    checked: boolean;
    onSelect: () => void;
};

function ColorRadio({ colorCode, checked, onSelect }: ColorRadioProps) {
    return (
        <label className="cursor-pointer">
            <input type="radio" checked={checked} onChange={onSelect} className="hidden" />
            <div
                className="w-6 h-6 rounded-full border-2 flex items-center justify-center"
                style={{ borderColor: checked ? "#000" : "#ccc" }}
            >
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: colorCode }} />
            </div>
        </label>
    );
}
