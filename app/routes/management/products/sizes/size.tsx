import { id } from "zod/v4/locales"
import type { Route } from "./+types/size"
import React, { useEffect, useState } from "react";
import { CreateSize, DeleteSize, SearchSize, UpdateSize } from "~/lib/client/management-product-clients";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { Pencil, Plus, Save, Trash } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { FormProvider, useForm } from "react-hook-form";
import { ProductSizeSchema, type ProductSizeForm } from "~/lib/model/products/input/search-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import AppFormInput from "~/components/custom/app-form-input";
import type { ProductSize } from "~/lib/model/products/output/product-size-and-color";

export const handle = {
    title: "Sizes"
}

export async function loader({params}: Route.LoaderArgs){
    return {
      productId: params.id,
      colorId: params.colorId
    }
}

export default function ProductSizePage ({loaderData}: Route.ComponentProps) {

  const productId = Number(loaderData.productId);
  const colorId = Number(loaderData.colorId);

  const [sizes, setSizes] = useState<ProductSize[]>([])

  useEffect(() => {
    async function load() {
      const response = await SearchSize(productId, colorId)
      setSizes(response)
    }
    load()
  }, [productId, colorId])

  const onDelete = async (sizeId: number) => {
    const response = await DeleteSize(productId, colorId, sizeId)
    if(response.check){
      setSizes(p => p.filter(s => s.id !== sizeId))
    }
  }

  return (
    <section className="p-4">
      <div className="w-full flex justify-end">
        <CreateDialog productId={productId} colorId={colorId} setSizes={setSizes} />
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-end">Size</TableHead>
              <TableHead className="text-end">Stocks</TableHead>
              <TableHead className="text-end">Price</TableHead>
              <TableHead className="text-center">Edit</TableHead>
              <TableHead className="text-center">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sizes?.map(item => 
              <TableRow key={item.id}>
                <TableCell className="text-end">{item.size}</TableCell>
                <TableCell className="text-end">{item.stock}</TableCell>
                <TableCell className="text-end">{item.price.toLocaleString()} MMK</TableCell>
                <TableCell className="text-center">
                  <Button variant={"ghost"}>
                    <EditDialog size={item} productId={productId} colorId={colorId} setSizes={setSizes} />
                  </Button>
                </TableCell>
                <TableCell className="text-center">
                  <Button variant={"destructive"} onClick={() => {
                    if(confirm(`Are you sure want to delete size: ${item.size}?`)){
                      onDelete(item.id)
                    }
                  }}>
                    <Trash/>
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}

type createProp = {
  productId: number,
  colorId: number,
  setSizes: React.Dispatch<React.SetStateAction<ProductSize[]>>
}

function CreateDialog ({productId, colorId, setSizes}: createProp) {
  const form = useForm<ProductSizeForm>({
    resolver: zodResolver(ProductSizeSchema),
    defaultValues: {
      size: 0,
      stock: undefined,
      price: 0
    }
  })

  const createHandle = async (form: ProductSizeForm) => {
    const response = await CreateSize(productId, colorId, form)
    setSizes(response)
  }

  return (
    <Dialog>
      <DialogTrigger>
         <Button>
            <Plus/> Add Size
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[300px]">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(createHandle)}>
            <DialogHeader>
              <DialogTitle>Create New Size</DialogTitle>
            </DialogHeader>

            <div className="mt-5 flex flex-col gap-4">
              <AppFormInput control={form.control} path="size" label="Size" type="number" />
              <AppFormInput control={form.control} path="stock" label="Stock" type="number" />
              <AppFormInput control={form.control} path="price" label="Price" type="number" />

              <DialogFooter>
                <DialogClose>
                  <Button className="mt-2">
                    <Save/> Create
                  </Button>
                </DialogClose>
              </DialogFooter>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}


type editProp = {
  size: ProductSize
  productId: number,
  colorId: number,
  setSizes: React.Dispatch<React.SetStateAction<ProductSize[]>>
}
function EditDialog ({size, productId, colorId, setSizes}: editProp) {

  const [open, setOpen] = useState(false)

  const form = useForm<ProductSizeForm>({
    resolver: zodResolver(ProductSizeSchema),
    defaultValues: {
      size: Number(size.size),
      stock: size.stock,
      price: size.price
    }
  })

  const updateHandle = async (form: ProductSizeForm) => {
    const response = await UpdateSize(productId, colorId, size.id, form)
    setSizes(response)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
         <Button variant={"ghost"}>
            <Pencil/>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[300px]">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(updateHandle)}>
            <DialogHeader>
              <DialogTitle>Update Size</DialogTitle>
            </DialogHeader>

            <div className="mt-5 flex flex-col gap-4">
              <AppFormInput control={form.control} path="size" label="Size" type="number" />
              <AppFormInput control={form.control} path="stock" label="Stock" type="number" />
              <AppFormInput control={form.control} path="price" label="Price" type="number" />

              <DialogFooter>
                <DialogClose>
                  <Button className="mt-2">
                    <Save/> Edit
                  </Button>
                </DialogClose>
              </DialogFooter>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}