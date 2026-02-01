import z from "zod"

export const brandAndCcategorySchema = z.object({
  name: z.string().nonempty("Please enter name.")
})
export type BrandAndCategoryForm = z.infer<typeof brandAndCcategorySchema>

export const searchProductSchema = z.object({
    brand: z.number(),
    category: z.number(), 
    keyword: z.string()
})
export type SearchProductForm = z.infer<typeof searchProductSchema>

export const productFormSchema = z.object({
  id: z.number().optional(), // edit mode only
  name: z.string().nonempty("Please enter product name").transform(str => str.trim()),
  brandId: z.number().min(1, "Please select a brand"),
  categoryId: z.number().min(1, "Please select a category"),
  description: z.string().nonempty("Please enter description").transform(str => str.trim()),
  imageUrl: z.string().optional()
});
export type ProductForm = z.infer<typeof productFormSchema>;

export const ProductColorSchema = z.object({
  color: z.string().nonempty("Please enter color"),
  colorCode: z.string().nonempty("Please enter color code"),
  
  image: z.string().optional()
});
export type ProductColorForm = z.infer<typeof ProductColorSchema>

export const ProductSizeSchema = z.object({
  size: z.number().min(1, "Size must be greater than 0"),
  stock: z.number(),
  price: z.number().min(10000, "Price must be greater than 10000"),
})
export type ProductSizeForm = z.infer<typeof ProductSizeSchema>