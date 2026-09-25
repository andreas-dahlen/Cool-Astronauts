import type { CartSchema } from '@project/shared'
import { products } from './products.ts'

const ids = products.map(product => product.productId)

export const cart: CartSchema[] = [
  {
    userId: 1,
    amount: 0,
    productIds: []
  },
  {
    userId: 2,
    productIds: [],
    amount: 0
  },
  {
    userId: 3,
    productIds: [],
    amount: 0
  },
  {
    userId: 4,
    productIds: [],
    amount: 0
  },
  {
    userId: 5,
    productIds: ids,
    amount: products.length
  }
]