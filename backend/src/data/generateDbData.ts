
import type { DbCart, DbProduct, DbUser, GeneratedDbData } from '@project/shared'
import { cart } from './cart.ts'
import { products } from './products.ts'
import { users } from './users.ts'

export function getDbData(): GeneratedDbData {
  const userIds = users.map(user => user.userId)
  const userItems = users.map(user => ({
    pk: 'USER',
    sk: `USER#${user.userId}`,
    name: user.name,
  })) satisfies DbUser[] //2
  const productItems = products.map(prod => {
    const { productId, ...rest } = prod
    return {
      pk: 'PRODUCT',
      sk: `PRODUCT#${prod.productId}`,
      ...rest
    }
  }) satisfies DbProduct[] //20

  const cartItems = cart.map((item, index) => ({
    pk: `USER#${userIds[index % userIds.length]}`,
    sk: `PRODUCT#${item.productId}`,
    amount: item.amount,
  })) satisfies DbCart[] //10
  return [
    ...userItems,
    ...productItems,
    ...cartItems
  ]
}