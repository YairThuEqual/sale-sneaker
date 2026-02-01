import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, Save, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router";

import AppFormInput from "~/components/custom/app-form-input";
import AppFormSelect, { type SelectOption } from "~/components/custom/app-form-select";
import AppFormTextarea from "~/components/custom/app-form-textarea";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";

import { brandAndCategory, createProduct, searchProduct, updateProduct } from "~/lib/client/management-product-clients";
import type { ProducCategoryList, ProductBrandList } from "~/lib/model/products/output/management-product-list";
import { productFormSchema, type ProductForm } from "~/lib/model/products/input/search-form-schema";
import type { Route } from "./+types/edit";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Card, CardContent } from "~/components/ui/card";

export function meta(){
    return [
        {   title: "My Sneaker | Product Edit"},
        { name: "description", content: "Welcome to My Shop!" },
    ]
}

export const handle = { title: "Edit" };

export async function loader({params}: Route.LoaderArgs){
    return {id: params.id}
}

export default function ProductEdit({ loaderData }: { loaderData: { id?: string } }) {
    const id = loaderData?.id;
    const navigate = useNavigate();

    const [brands, setBrands] = useState<ProductBrandList[]>([]);
    const [categories, setCategories] = useState<ProducCategoryList[]>([]);
    const [ready, setReady] = useState(false);

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const form = useForm<ProductForm>({
        resolver: zodResolver(productFormSchema),
        defaultValues: {
        id: undefined,
        name: "",
        brandId: 0,
        categoryId: 0,
        description: "",
        imageUrl: "",
        },
    });

    useEffect(() => {
        async function loadData() {
        const data = await brandAndCategory();
        setBrands(data.brand);
        setCategories(data.categories);
        setReady(true);
        }
        loadData();
    }, []);

    useEffect(() => {
        if (!ready || !id) return; 

        async function loadProduct() {
            const response = await searchProduct(Number(id));

            form.reset({
                id: response.id,
                name: response.name,
                brandId: Number(response.brand.id),       // number
                categoryId: Number(response.category.id), // number
                description: response.description,
                imageUrl: response.imageBase64 || "",
            });

            setPreview(response.imageBase64 || null);
        }

        loadProduct();
    }, [ready, id, form]);

    // --- Select options ---
    const brandOption: SelectOption[] = brands.map((b) => ({ label: b.name, value: b.id }));
    const categoryOption: SelectOption[] = categories.map((c) => ({ label: c.name, value: c.id }));

    // --- Handle image selection ---
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        setSelectedImage(file);

        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
    };

    // --- Save action ---
    const saveAction = async (data: ProductForm) => {
        try {
            let imageUrl = data.imageUrl || "";

            // If user selected a new image, convert to Base64
            if (selectedImage) {
            const toBase64 = (file: File) =>
                new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = (error) => reject(error);
                }); 
            imageUrl = await toBase64(selectedImage);
            }

            const payload = { ...data, imageUrl };

            let response;
            if (data.id) {
                // If id exists, call update
                response = await updateProduct(data.id, payload);
            } else {
                // If id is null/undefined, call create
                response = await createProduct(payload);
            }

            if (response.check) {
                navigate("/management/product");
            }
        } catch (error) {
            console.error("Failed to save product:", error);
        }
    };

    const fileRef = useRef<HTMLInputElement | null>(null)

    return (
        <section className="w-full">
            <Card>
                <CardContent>
                    <FormProvider {...form}>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(saveAction)}
                                className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2"
                            >
                                {/* IMAGE UPLOAD */}
                                <div className="flex flex-col items-center gap-4 p-6">
                                    {preview ? (
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="w-full rounded-md border object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center rounded-md border border-dashed text-muted-foreground">
                                            <ImageIcon size={32} />
                                        </div>
                                    )}

                                    {/* Hidden Input */}
                                    <Input
                                        ref={fileRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />

                                    {/* Button triggers input */}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="w-full"
                                        onClick={() => fileRef.current?.click()}
                                    >
                                        <Upload className="mr-2 h-8 w-8" />
                                        Upload Image
                                    </Button>
                                </div>

                                {/* PRODUCT FIELDS */}
                                <div className="md:col-span-2 flex flex-col gap-3 p-6">
                                    <AppFormInput
                                        control={form.control}
                                        label="Product Name"
                                        path="name"
                                        placeholder="Enter product name"
                                    />

                                    <div className="flex gap-4">
                                        <AppFormSelect
                                            control={form.control}
                                            label="Brands"
                                            option={brandOption}
                                            path="brandId"
                                        />

                                        <AppFormSelect
                                            control={form.control}
                                            label="Categories"
                                            option={categoryOption}
                                            path="categoryId"
                                        />
                                    </div>

                                    <AppFormTextarea
                                        control={form.control}
                                        label="Description"
                                        path="description"
                                        placeholder="Enter product"
                                    />

                                    <Button type="submit" className="mt-2 w-fit">
                                        <Save className="mr-2 h-4 w-4" />
                                        Save
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </FormProvider>
                </CardContent>
            </Card>
        </section>
    )
}
