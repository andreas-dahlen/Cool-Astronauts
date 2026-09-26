import * as z from "zod"
import { idSchema } from './userSchema.ts'

export const productSchema = z.object({
  name: z.string(),
  price: z.number().int().min(0),
  image: z.httpUrl(),
  amountInStock: z.number().int().min(0)
}).strict()

export const dbProductItemSchema = productSchema.extend({
  pk: z.literal('PRODUCT'),
  sk: z.templateLiteral([
    z.literal('PRODUCT#'),
    idSchema,
  ]),
}).strict()

export const dbProductItemsArraySchema = z.array(dbProductItemSchema)


export const combinedProductSchema = productSchema.extend({
  productId: idSchema
})

export const combinedProductsArraySchema = z.array(combinedProductSchema)


// renaming suggestions = productSchema

// productArraySchema

// dbProductSchema
// dbProductArraySchema

// productWithIdSchema
// productWithIdArraySchema
