
import * as z from "zod"
import type { dbUserSchema, idSchema, userSchema, UserWithIdSchema } from './schemas/userSchema.ts'
import type { dbProductSchema, productSchema, productWithIdSchema } from './schemas/productSchema.ts'
import { cartSchema, cartWithIdSchema, dbCartSchema } from './schemas/cartSchema.ts'

//Route params
export type UserIdParam = {
  userId: string
}

export type ProductIdParam = {
  productId: string
}

export type DoubleIdParam = {
  productId: string
  userId: string
}

//basic types without ID
export type User = z.infer<typeof userSchema>
export type Product = z.infer<typeof productSchema>
export type Cart = z.infer<typeof cartSchema>

//ID
export type Id = z.infer<typeof idSchema>


//Combined types
export type ProductWithId = z.infer<typeof productWithIdSchema>

export type UserWithId = z.infer<typeof UserWithIdSchema>

export type CartWithId = z.infer<typeof cartWithIdSchema>


//database types
export type DbCart = z.infer<typeof dbCartSchema>
export type DbProduct = z.infer<typeof dbProductSchema>
export type DbUser = z.infer<typeof dbUserSchema>

export type GeneratedDbData = (
  | DbUser
  | DbProduct
  | DbCart
)[]