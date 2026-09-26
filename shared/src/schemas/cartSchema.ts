import * as z from 'zod'
import { idSchema } from './userSchema.ts'

export const cartSchema = z.object({
  amount: z.number().int().min(1)
}).strict()


export const dbCartSchema = cartSchema.extend({
  pk: z.templateLiteral([
    z.literal('USER#'),
    idSchema,
  ]),
  sk: z.templateLiteral([
    z.literal('PRODUCT#'),
    idSchema,
  ]),
}).strict()

export const combinedCartSchema = cartSchema.extend({
  productId: idSchema
})

export const combinedCartArraySchema = z.array(combinedCartSchema)
export const dbCartArraySchema = z.array(dbCartSchema)