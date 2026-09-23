import type { cartSchema } from './schemas/cartSchema.ts';
import { combinedProductsArraySchema, combinedProductSchema, productSchema } from './schemas/productSchema.ts';
import { combinedUserSchema, userSchema, idSchema } from './schemas/userSchema.ts';
import * as z from "zod"

//basic types without ID
export type UserSchema = z.infer<typeof userSchema>
export type ProductSchema = z.infer<typeof productSchema>
export type CartSchema = z.infer<typeof cartSchema>

//id schema types
export type IdSchema = z.infer<typeof idSchema>


//both ID and content
export type CombinedProductSchema = z.infer<typeof combinedProductSchema>

export type CombinedUserSchema = z.infer<typeof combinedUserSchema>


//array validation for frontend
export type CombinedProductsArraySchema = z.infer<typeof combinedProductsArraySchema>