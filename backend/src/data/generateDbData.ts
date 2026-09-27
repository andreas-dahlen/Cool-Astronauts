import type { DbCartSchema, DbProductItemSchema, DbUserSchema, GeneratedDbSchema } from '@project/shared'
import { cart } from './cart.ts'
import { products } from './products.ts'
import { users } from './users.ts'

export function getDbData(): GeneratedDbSchema {
  const userIds = users.map(user => user.userId)
  const userItems = users.map(user => ({
    pk: 'USER',
    sk: `USER#${user.userId}`,
    name: user.name,
  })) satisfies DbUserSchema[]
  const productItems = products.map(prod => {
    const { productId, ...rest } = prod
    return {
      pk: 'PRODUCT',
      sk: `PRODUCT#${prod.productId}`,
      ...rest
    }
  }) satisfies DbProductItemSchema[]

  const cartItems = cart.map((item, index) => ({
    pk: `USER#${userIds[index % userIds.length]}`,
    sk: `PRODUCT#${item.productId}`,
    amount: item.amount,
  })) satisfies DbCartSchema[]
  return [
    ...userItems,
    ...productItems,
    ...cartItems
  ]
}