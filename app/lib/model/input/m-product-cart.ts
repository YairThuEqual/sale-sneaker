import z, { number } from "zod";

export const AddToCartSchema = z.object({
    productId: z.number(),
    colorId: z.number(),
    sizeId: z.number(),
    quantity: z.number(),
    price: z.number()
})
export type AddToCartForm = z.infer<typeof AddToCartSchema>

export const OrderSchema = z.object({
    name: z.string().nonempty("Enter name"),
    email: z.string().nonempty("Enter email"),
    phone: z.string().nonempty("Enter phone"),
    address: z.string().nonempty("Enter address"),
    total: z.number()
})
export type OrderForm = z.infer<typeof OrderSchema>