import { z } from "zod"

export const productSchema = z.object({
    id: z.number().optional(),
    title: z.string().default(""),
    price: z.number().nullable().default(null),
})

export const productFormFields = productSchema.keyof().enum

export type ProductModel = z.infer<typeof productSchema>;