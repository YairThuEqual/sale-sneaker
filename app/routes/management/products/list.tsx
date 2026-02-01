import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, Pencil, Plus, PlusCircle, Search, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router";
import AppFormInput from "~/components/custom/app-form-input";
import AppFormSelect, { type SelectOption } from "~/components/custom/app-form-select";
import { Button } from "~/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "~/components/ui/table";
import { ProductDelete, ProductListItems, searchProducts } from "~/lib/client/management-product-clients";
import { searchProductSchema, type SearchProductForm} from "~/lib/model/products/input/search-form-schema";
import type { ProducCategoryList, ProductBrandList, ProductList } from "~/lib/model/products/output/management-product-list";

type SearchFormProps = {
    onSearch: (products: ProductList[]) => void;
    load: (products: ProductList[]) => void;
};

type ProductTableListProps = {
    products: ProductList[];
    onDelete: (id: number) => void;
};

export function meta(){
    return [
        {title: "My Sneaker | Product Edit"},
        { name: "description", content: "Welcome to My Shop!" },
    ] 
}

export default function List() {
    const [products, setProducts] = useState<ProductList[]>([]);

    const handlerDelete = async (id: number) => {
        try {
            const res = await ProductDelete(id);

            if (res.check) {
                // ✅ remove deleted product from UI
                setProducts(prev =>
                    prev.filter(product => product.id !== id)
                );
            }
        } catch (error) {
            console.error("Error while deleting product", error);
        }
    };

    return (
        <section className="border-2 p-2 rounded-2xl">
            <SearchForm onSearch={setProducts} load={setProducts} />

            <div className="mt-3">
                {products.length === 0 ? (
                    <p>No products found.</p>
                ) : (
                    <ProductTableList
                        products={products}
                        onDelete={handlerDelete}
                    />
                )}
            </div>
        </section>
    );
}

function SearchForm({ onSearch, load }: SearchFormProps) {
    const [brands, setBrands] = useState<ProductBrandList[]>([]);
    const [categories, setCategories] = useState<ProducCategoryList[]>([]);

    const form = useForm<SearchProductForm>({
        resolver: zodResolver(searchProductSchema),
        defaultValues: {
            brand: 0,
            category: 0,
            keyword: "",
        },
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await ProductListItems();

                const allProducts = data.flatMap(
                    item => item.products ?? []
                );
                load(allProducts);

                setBrands(data.flatMap(item => item.list?.brand ?? []));
                setCategories(
                    data.flatMap(item => item.list?.categories ?? [])
                );
            } catch (err) {
                console.error("Failed to fetch data", err);
                setBrands([]);
                setCategories([]);
            }
        }

        fetchData();
    }, [load]);

    const brandOptions: SelectOption[] = brands.map(b => ({
        label: b.name,
        value: b.id,
    }));

    const categoryOptions: SelectOption[] = categories.map(c => ({
        label: c.name,
        value: c.id,
    }));

    const handleSearch = async (data: SearchProductForm) => {
        try {
            const result = await searchProducts(data);
            onSearch(result);
        } catch (err) {
            console.error("Search failed", err);
            onSearch([]);
        }
    };

    return (
        <div className="flex justify-between items-end">
            <FormProvider {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSearch)}
                    className="flex items-end gap-3"
                >
                    <AppFormSelect
                        control={form.control}
                        label="Category"
                        option={categoryOptions}
                        valueType="number"
                        path="category"
                    />
                    <AppFormSelect
                        control={form.control}
                        label="Brand"
                        option={brandOptions}
                        valueType="number"
                        path="brand"
                    />
                    <AppFormInput
                        control={form.control}
                        label="Keyword"
                        path="keyword"
                        placeholder="Search"
                    />
                    <Button type="submit">
                        <Search className="mr-1" /> Search
                    </Button>
                </form>
            </FormProvider>

            <div className="flex gap-1">
                <Button asChild variant="outline">
                    <Link to="edit">
                        <Plus className="mr-1" /> Product
                    </Link>
                </Button>
                <Button asChild variant="outline">
                    <Link to="b&ca">
                        <Plus className="mr-1" /> Brands & Categories
                    </Link>
                </Button>
            </div>
        </div>
    );
}

function ProductTableList({ products, onDelete }: ProductTableListProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-end">Stocks</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead />
                    <TableHead />
                    <TableHead />
                </TableRow>
            </TableHeader>

            <TableBody>
                {products.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>
                            {item.imageBase64 ? (
                                <img
                                    src={item.imageBase64}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded-lg"
                                />
                            ) : (
                                <span className="text-gray-400">
                                    No image
                                </span>
                            )}
                        </TableCell>

                        <TableCell className="capitalize">{item.name}</TableCell>
                        <TableCell className="capitalize">{item.brand?.name ?? "-"}</TableCell>
                        <TableCell className="capitalize">{item.category?.name ?? "-"}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell className="text-end">
                            {
                                item.colors
                                    .flatMap(color => color.sizes)
                                    .reduce((total, size) => total + size.stock, 0)
                            }
                        </TableCell>

                        <TableCell>{item.createdAt}</TableCell>
                        <TableCell>{item.updatedAt}</TableCell>

                        <TableCell>
                            <Link to={`${item.id}/color`}>
                                <Eye size={18} />
                            </Link>
                        </TableCell>

                        <TableCell>
                            <Link to={`edit/${item.id}`}>
                                <Pencil size={18} />
                            </Link>
                        </TableCell>

                        <TableCell>
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                onClick={() => {
                                    if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
                                        onDelete(item.id);
                                    }
                                }}
                            >
                                <Trash size={18} />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
