import * as z from "zod"
import { idSchema } from './userSchema.ts'

export const productSchema = z.object({
  name: z.string(),
  price: z.number().int().min(0),
  image: z.httpUrl(),
  amountInStock: z.number().int().min(0)
}).strict()

export const dbProductSchema = productSchema.extend({
  pk: z.literal('PRODUCT'),
  sk: z.templateLiteral([
    z.literal('PRODUCT#'),
    idSchema,
  ]),
}).strict()

export const dbProductArraySchema = z.array(dbProductSchema)


export const productWithIdSchema = productSchema.extend({
  productId: idSchema
})

export const productsWithIdArraySchema = z.array(productWithIdSchema)
