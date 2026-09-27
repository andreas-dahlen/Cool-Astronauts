import type { cartSchema, combinedCartSchema, dbCartSchema } from './schemas/cartSchema.ts';
import { combinedProductsArraySchema, combinedProductSchema, dbProductItemSchema, productSchema } from './schemas/productSchema.ts';
import { combinedUserSchema, userSchema, idSchema, dbUserSchema } from './schemas/userSchema.ts';
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

export type CombinedCartSchema = z.infer<typeof combinedCartSchema>


//database types
export type DbCartSchema = z.infer<typeof dbCartSchema>
export type DbProductItemSchema = z.infer<typeof dbProductItemSchema>
export type DbUserSchema = z.infer<typeof dbUserSchema>

export type GeneratedDbSchema = (
  | DbUserSchema
  | DbProductItemSchema
  | DbCartSchema
)[]




// Naming proposal — commented out for group discussion

// Route params
// export type UserIdParam = {
//   userId: string
// }

// export type ProductIdParam = {
//   productId: string
// }

// Basic types
// export type User = z.infer<typeof userSchema>
// export type Product = z.infer<typeof productSchema>
// export type Cart = z.infer<typeof cartSchema>

// ID
// export type Id = z.infer<typeof idSchema>

// Combined types
// export type ProductWithId = z.infer<typeof combinedProductSchema>
// export type UserWithId = z.infer<typeof combinedUserSchema>

