import * as z from "zod"

export const productSchema = z.object({
  name: z.string(),
  price: z.number().int().min(0),
  image: z.httpUrl(),
  amountInStock: z.number().int().min(0)
}).strict()

export const productIdSchema = z.object({
  productId: z.number().int().min(0)
}).strict()


export const combinedProductSchema = productSchema.extend(productIdSchema.shape)

export const combinedProductsArraySchema = z.array(combinedProductSchema)