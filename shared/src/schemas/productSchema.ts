import * as z from "zod"
import { idSchema } from './userSchema.ts'

export const productSchema = z.object({
  name: z.string(),
  price: z.number().int().min(0),
  image: z.httpUrl(),
  amountInStock: z.number().int().min(0)
}).strict()

export const combinedProductSchema = productSchema.extend({
  productId: idSchema
})

export const combinedProductsArraySchema = z.array(combinedProductSchema)