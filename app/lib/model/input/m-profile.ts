import z from "zod";

export const MemberProfileSchema = z.object({
    name: z.string().nonempty("Please enter name"),
    email: z.string().nonempty("Please enter email"),
    phone: z.string().nonempty("Please enter phone"),
    address: z.string(),
    image: z.string().optional()
})
export type MemberProfileForm = z.infer<typeof MemberProfileSchema>

