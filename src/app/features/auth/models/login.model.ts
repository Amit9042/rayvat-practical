import { z } from "zod"

export const loginSchema = z.object({
    username: z.string(),
    password: z.string(),
})


export const loginFormFields = loginSchema.keyof().enum

export type LoginModel = z.infer<typeof loginSchema>;

export const userSchema = z.object({
    id: z.number(),
    username: z.string(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    gender: z.string(),
    image: z.string(),
    accessToken: z.string(),
    refreshToken: z.string()
})

export type UserModel = z.infer<typeof userSchema>;

