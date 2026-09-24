import * as z from "zod"
import { combinedProductSchema } from './productSchema.ts'
import type { CartSchema } from '../types.ts'

export const cartSchema = z.object({
  amount: z.number().int().min(0),
  products: z.array(combinedProductSchema)
})