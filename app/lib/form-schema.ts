import z from 'zod'

export const signupSchema = z.object({
    name: z.string().nonempty("Please enter your name"),
    email: z.string().nonempty("Please enter email"),
    password: z.string().nonempty("Please enter password")
})
export type SignUpForm = z.infer<typeof signupSchema>

export const signInSchema = z.object({
    email: z.string().nonempty("Please enter email"),
    password: z.string().nonempty("Please enter password")
}) 
export type SigninForm = z.infer<typeof signInSchema>