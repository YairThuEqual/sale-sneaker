import { zodResolver } from "@hookform/resolvers/zod"
import { Save, Trash } from "lucide-react"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import AppFormInput from "~/components/custom/app-form-input"
import { Button } from "~/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { BrandCreate, Brands, Categories, CategoryCreate } from "~/lib/client/management-product-clients"
import { brandAndCcategorySchema, type BrandAndCategoryForm } from "~/lib/model/products/input/search-form-schema"
import type { ProducCategoryList, ProductBrandAndCategory, ProductBrandList } from "~/lib/model/products/output/management-product-list"

export const handle = {
    title: "Brands & Categories"
}

export default function BrandAndCategory () {



    return (
        <section className="flex flex-wrap justify-center gap-5">
            <BrandsList/>
            <CategoriesList/>
        </section>
    )
}

function BrandsList () {

    const [brands, setBrands] = useState<ProductBrandList[]>()

    useEffect(() => {
        async function loadBrand() {
            const data = await Brands()
            setBrands(data)
        }
        loadBrand()
    }, [])

    const form = useForm<BrandAndCategoryForm>({
        resolver: zodResolver(brandAndCcategorySchema),
        defaultValues: {
            name: ""
        }
    })

    const createHandler = async (form: BrandAndCategoryForm) => {
        const response = await BrandCreate(form);
        setBrands(response)
    }

    return (
    <div className="my-3">
        <h1>Brands</h1>

        <div className="shadow-lg rounded-2xl p-4 h-full">
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(createHandler)} className="flex items-end gap-3">
                    <AppFormInput control={form.control} label="Brand Name" path="name" placeholder="Enter brand name" />

                    <Button type="submit" className="mt-2">
                        <Save/> Create
                    </Button>
                </form>   
            </FormProvider>

            <div className="w-full mt-3 overflow-hidden">
                <div className="grid grid-cols-[80px_1fr_100px] bg-background sticky top-0 z-20 border-b">
                    <div className="p-3 text-end font-medium">NO</div>
                    <div className="p-3 font-medium">Brand Name</div>
                    <div className="p-3 text-end font-medium pr-5">Delete</div>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                    {brands?.map((item, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-[80px_1fr_100px] border-b items-center"
                    >
                        <div className="p-3 text-end">{index + 1}</div>
                        <div className="p-3 capitalize">{item.name}</div>
                        <div className="p-3 text-end pr-5">
                        <Button variant="destructive">
                            <Trash />
                        </Button>
                        </div>
                    </div>
                    ))}
                </div>
            </div>

        </div>
    </div>
    )
}

function CategoriesList () {
    const [categories, setCategories] = useState<ProducCategoryList[]>()

    useEffect(() => {
        async function loadBrand() {
            const data = await Categories()
            setCategories(data)
        }
        loadBrand()
    }, [])

    const form = useForm<BrandAndCategoryForm>({
        resolver: zodResolver(brandAndCcategorySchema),
        defaultValues: {
            name: ""
        }
    })

    const createHandler = async (form: BrandAndCategoryForm) => {
        const response = await CategoryCreate(form);
        setCategories(response)
    }

    return (
    <div className="my-3">
        <h1>Categories</h1>

        <div className="shadow-lg rounded-2xl p-4 h-full">
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(createHandler)} className="flex items-end gap-3">
                    <AppFormInput control={form.control} label="Category Name" path="name" placeholder="Enter Category name" />

                    <Button type="submit" className="mt-2">
                        <Save/> Create
                    </Button>
                </form>   
            </FormProvider>

            <div className="w-full mt-3 overflow-hidden">
                <div className="grid grid-cols-[80px_1fr_100px] bg-background sticky top-0 z-20 border-b">
                    <div className="p-3 text-end font-medium">NO</div>
                    <div className="p-3 font-medium">Category Name</div>
                    <div className="p-3 text-end font-medium pr-5">Delete</div>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                    {categories?.map((item, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-[80px_1fr_100px] border-b items-center"
                    >
                        <div className="p-3 text-end">{index + 1}</div>
                        <div className="p-3 capitalize">{item.name}</div>
                        <div className="p-3 text-end pr-5">
                        <Button variant="destructive">
                            <Trash />
                        </Button>
                        </div>
                    </div>
                    ))}
                </div>
            </div>

        </div>
    </div>
    )
}