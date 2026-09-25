import type { CartSchema } from '@project/shared'
import { randomUUID } from 'node:crypto'

export const cart: CartSchema[] = [
  {
    userId: randomUUID(),
    productIds: [randomUUID()],
    amount: 1
  },
  {
    userId: randomUUID(),
    productIds: [randomUUID(), randomUUID(), randomUUID()],
    amount: 3
  },
  {
    userId: randomUUID(),
    productIds: [randomUUID(), randomUUID()],
    amount: 2
  },
  {
    userId: randomUUID(),
    productIds: [randomUUID()],
    amount: 1
  },
  {
    userId: randomUUID(),
    productIds: [randomUUID(), randomUUID()],
    amount: 2
  }
]