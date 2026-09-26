import type { CombinedCartSchema } from '@project/shared'
import { randomUUID } from 'node:crypto'

export const cart: CombinedCartSchema[] = [
  {
    productId: randomUUID(),
    amount: 1
  },
  {
    productId: randomUUID(),
    amount: 3
  },
  {
    productId: randomUUID(),
    amount: 2
  },
  {
    productId: randomUUID(),
    amount: 1
  },
  {
    productId: randomUUID(),
    amount: 2
  }
]