import z from "zod";

export const searchOrderSchema = z.object({
    email: z.string(),
    status: z.string(),
    dateFrom: z.string(),
    dateTo: z.string()
})
export type searchOrderForm = z.infer<typeof searchOrderSchema>