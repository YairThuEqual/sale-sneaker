import { Eye, ImageIcon, Pencil, Plus, Save, Trash, Upload } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { useEffect, useRef, useState } from "react";
import { CreateColor, DeleteColor, ProductDetailById, UpdateColor } from "~/lib/client/management-product-clients";
import type { ProductColor, ProductSize } from "~/lib/model/products/output/product-size-and-color";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import AppFormInput from "~/components/custom/app-form-input";
import { ProductColorSchema, type ProductColorForm } from "~/lib/model/products/input/search-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Route } from "./+types/list";
import { Input } from "~/components/ui/input";
import { Link } from "react-router";
import { size } from "zod";

export async function loader({ params }: Route.LoaderArgs) {
    return { id: params.id }
}

export default function SizeListPage({ loaderData }: Route.ComponentProps) {

    const productId = Number(loaderData.id);
    const [colors, setColors] = useState<ProductColor[]>([]);

    // Load sizes
    useEffect(() => {
        async function loadTable() {
            const data = await ProductDetailById(productId);
            setColors(data.colors)
        }
        loadTable();
    }, [productId]);

    const isDelete = async function (colorId: number) {
      const response = await DeleteColor(productId, colorId)
      if(response.check){
        setColors(f => f.filter(c => c.id !== colorId))
      }
    }

    return (
        <div>
            <div className="w-full shadow-lg rounded-2xl p-2">
                <div className="flex justify-end">
                    <CreateDialog productIdNum={productId} setColors={setColors}/>
                </div>
            

                <div className="mt-3">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Image</TableHead>
                          <TableHead>Color</TableHead>
                          <TableHead>Color Code</TableHead>
                          <TableHead className="text-end">Stocks</TableHead>
                          <TableHead className="text-center">View</TableHead>
                          <TableHead className="text-center">Edit</TableHead>
                          <TableHead className="text-center">Delete</TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {colors.map(col => (
                          <TableRow key={col.id}>
                            <TableCell>
                              {col.image ? (
                                <img src={col.image} alt={col.color} className="w-16 h-16 object-cover object-center" />
                              ) : (
                                <span className="text-gray-400">
                                    No image
                                </span>
                              )}
                            </TableCell>
                            <TableCell className="capitalize">{col.color}</TableCell>
                            <TableCell>{col.colorCode}</TableCell>
                            <TableCell className="text-end">
                                {col.sizes.reduce((total, item) => total + item.stock, 0)}
                            </TableCell>
                            <TableCell className="text-center">
                                <div className="flex justify-center">
                                    <Link to={`${col.id}/size`}>
                                        <Eye/>
                                    </Link>
                                </div>   
                            </TableCell>
                            <TableCell className="text-center">
                              <EditDialog color={col} productId={productId} colorId={col.id} setColors={setColors} />
                            </TableCell>
                            <TableCell className="text-center">
                                <Button 
                                  variant="destructive" 
                                  size="icon"
                                  onClick={() => {
                                    if(confirm(`Are you sure want to delete color: ${col.color}`)) {
                                      isDelete(col.id)
                                    }
                                  }}>
                                    <Trash size={18} />
                                </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
            </div>
        </div>
    );
}

function CreateDialog({productIdNum, setColors}: {
  productIdNum: number;
  setColors: React.Dispatch<React.SetStateAction<ProductColor[]>>;
}) {
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement | null>(null);

    const form = useForm<ProductColorForm>({
        resolver: zodResolver(ProductColorSchema),
        defaultValues: {
        color: "",
        colorCode: "",
        image: "",
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setSelectedImage(file);
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
    };

    const toBase64 = (file: File) =>
        new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
        });

    const onSubmit = async (data: ProductColorForm) => {
        let image = "";

        if (selectedImage) {
        image = await toBase64(selectedImage);
        }

        const created = await CreateColor(productIdNum, {...data, image})

        setColors(created);
        setOpen(false);
        setPreview(null);
        setSelectedImage(null);
        form.reset();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Color
            </Button>
        </DialogTrigger>

        <DialogContent>
            <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <DialogHeader>
                <DialogTitle>Create Color</DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* Image */}
                <div className="w-40">
                    {preview ? (
                    <img src={preview} className="w-40 h-40 object-cover rounded-md border"/>
                    ) : (
                    <div className="w-40 h-40 flex items-center justify-center rounded-md border border-dashed text-muted-foreground">
                        <ImageIcon size={42} />
                    </div>
                    )}

                    <Input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="w-full mt-3"
                        onClick={() => fileRef.current?.click()}
                    >
                    
                    <Upload className="mr-2 h-4 w-4" />
                        Upload Image
                    </Button>
                </div>

                {/* Fields */}
                <div className="grid gap-3">
                    <AppFormInput control={form.control} label="Color" path="color" />
                    <AppFormInput control={form.control} label="Color Code" path="colorCode" placeholder="#000000" />

                    <DialogFooter className="mt-4">
                    <Button type="submit" className="w-full">
                        <Save className="mr-2 h-4 w-4" /> Create
                    </Button>
                    </DialogFooter>
                </div>
                </div>
            </form>
            </FormProvider>
        </DialogContent>
        </Dialog>
    );
}


type EditDialogProps = {
  color: ProductColor;
  productId: number;
  colorId: number
  setColors: React.Dispatch<React.SetStateAction<ProductColor[]>>;
};

function EditDialog({ color, productId, colorId, setColors }: EditDialogProps) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(color.image || null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<ProductColorForm>({
    resolver: zodResolver(ProductColorSchema),
    defaultValues: { 
      color: color.color,
      colorCode: color.colorCode,
      image: color.image || "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const onSubmit = async (data: ProductColorForm) => {
    let image = data.image || "";

    if (selectedImage) {
      image = await toBase64(selectedImage);
    }

    const updated = await UpdateColor(productId, colorId, { ...data, image });
    setColors(updated);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Pencil size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Edit Color</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              <div className="w-40">
                {preview ? (
                  <img src={preview} className="w-full h-40 object-cover rounded-md border" />
                ) : (
                  <div className="w-full h-40 flex items-center justify-center rounded-md border border-dashed">
                    <ImageIcon size={42} />
                  </div>
                )}

                <Input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />

                <Button
                  type="button"
                  variant="outline"
                  className="mt-3 w-full"
                  size="sm"
                  onClick={() => fileRef.current?.click()}
                >
                  <Upload className="mr-2 h-6 w-6" />
                  Upload Image
                </Button>
              </div>

              <div className="flex flex-col gap-3">
                <AppFormInput control={form.control} label="Color" path="color" />
                <AppFormInput control={form.control} label="Color Code" path="colorCode" placeholder="#000000" />
                <DialogFooter className="mt-4 w-full">
                  <Button type="submit" className="w-full">
                    <Save className="mr-2 h-4 w-4" /> Update
                  </Button>
                </DialogFooter>
              </div>

            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}


{/* Dialog for Create / Edit */}
{/* {dialogOpen && (
    <SizeDialog
        productId={productId}
        color={editingColor}
        setColors={setColors}
        open={dialogOpen}
        setOpen={setDialogOpen}
    />
)} */}

// interface SizeDialogProps {
//     productId: number;
//     color: ProductColor | null;
//     setColors: React.Dispatch<React.SetStateAction<ProductColor[]>>;
//     open: boolean;
//     setOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

// function SizeDialog({ productId, color, setColors, open, setOpen }: SizeDialogProps) {
//     const isEdit = !!color;

//     const form = useForm<ProductSizeForm>({
//         resolver: zodResolver(ProductSizeSchema),
//         defaultValues: { size: Number(color?.color) ?? 0 },
//     });

//     // Load existing size for edit
//     useEffect(() => {
//         if (!isEdit) return;
//         async function load() {
//             const response = await SearchSize(productId, color!.id);
//             response.map(res => {
//                 if(res.id === Number(color?.id)){
//                     form.reset({size:   Number( res.size)})
//                 }
//             })
//         }
//         load();
//     }, [productId, color, form, isEdit]);

//     const submitAction = async (data: ProductSizeForm) => {
//         if (isEdit && color) {
//             const updatedSizes = await UpdateSize(productId, size.id, data);
//             setSizes(updatedSizes);
//         } else {
//             const createdSizes = await CreateSize(productId, data);
//             setSizes(createdSizes);
//         }
//         setOpen(false);
//     };

//     return (
//         <Dialog open={open} onOpenChange={setOpen}>
//             <DialogContent className="sm:max-w-[280px]">
//                 <FormProvider {...form}>
//                     <form onSubmit={form.handleSubmit(submitAction)}>
//                         <DialogHeader className="mb-4">
//                             <DialogTitle>{isEdit ? "Edit Size" : "Create Size"}</DialogTitle>
//                         </DialogHeader>
//                         <div className="grid gap-4">
//                             <AppFormInput control={form.control} path="size" label="Size" type="number" />
//                         </div>
//                         <DialogFooter className="mt-5">
//                             <DialogClose asChild>
//                                 <Button type="button" variant="outline">Cancel</Button>
//                             </DialogClose>
//                             <Button type="submit">
//                                 <Save /> {isEdit ? "Update" : "Create"}
//                             </Button>
//                         </DialogFooter>
//                     </form>
//                 </FormProvider>
//             </DialogContent>
//         </Dialog>
//     );
// }
