import type { cartSchema } from './schemas/cartSchema.ts';
import type { combinedProductsArraySchema, combinedProductSchema, productIdSchema } from './schemas/productSchema.ts';
import type { combinedUserSchema, userIdSchema, userSchema } from './schemas/userSchema.ts';
import * as z from "zod"

//basic types without ID
export type UserSchema = z.infer<typeof userSchema>
export type ProductSchema = z.infer<typeof productIdSchema>
export type CartSchema = z.infer<typeof cartSchema>

//id schema types
export type UserIdSchema = z.infer<typeof userIdSchema>
export type ProductIdSchema = z.infer<typeof productIdSchema>

//both ID and content
export type CombinedProductSchema = z.infer<typeof combinedProductSchema>

export type CombinedUserSchema = z.infer<typeof combinedUserSchema>


//array validation for frontend
export type CombinedProductsArraySchema = z.infer<typeof combinedProductsArraySchema>