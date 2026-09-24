import * as z from 'zod'
import { idSchema } from './userSchema.ts'

export const cartSchema = z.object({
  userId: idSchema,
  productId: idSchema,
  amount: z.number().int().min(1)
}).strict()

export const cartsArraySchema = z.array(cartSchema)