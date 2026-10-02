
import type { CartWithId } from '@project/shared'
import { products } from './products.ts'

export const cart: CartWithId[] = [
  { productId: products[0]!.productId, amount: 1 },
  { productId: products[1]!.productId, amount: 3 },
  { productId: products[2]!.productId, amount: 2 },
  { productId: products[3]!.productId, amount: 6 },
  { productId: products[4]!.productId, amount: 4 },
  { productId: products[5]!.productId, amount: 5 },
  { productId: products[6]!.productId, amount: 2 },
  { productId: products[7]!.productId, amount: 12 },
  { productId: products[8]!.productId, amount: 5 },
  { productId: products[9]!.productId, amount: 2 }
]
