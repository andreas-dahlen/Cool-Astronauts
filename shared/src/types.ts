import type { cartSchema } from './schemas/cartSchema.ts';
import { combinedProductsArraySchema, combinedProductSchema, productSchema } from './schemas/productSchema.ts';
import { combinedUserSchema, userSchema, idSchema } from './schemas/userSchema.ts';
import * as z from "zod"

//Route params
export type UserIdParam = {
  userId: string
}

export type ProductIdParam = {
  productId: string
}

//basic types without ID
export type UserSchema = z.infer<typeof userSchema>
export type ProductSchema = z.infer<typeof productSchema>
export type CartSchema = z.infer<typeof cartSchema>

//ID
export type IdSchema = z.infer<typeof idSchema>


//Combined types
export type CombinedProductSchema = z.infer<typeof combinedProductSchema>

export type CombinedUserSchema = z.infer<typeof combinedUserSchema>


//array validation for frontend
export type CombinedProductsArraySchema = z.infer<typeof combinedProductsArraySchema>