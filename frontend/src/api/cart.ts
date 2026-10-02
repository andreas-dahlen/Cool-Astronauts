import { cartWithIdArraySchema, type CartWithId } from '@project/shared'

export async function getCart(basePath: string, userId: string): Promise<CartWithId[]> {

  try {
    const response = await fetch(`${basePath}cart/${userId}`)
    const rawData = await response.json()

    return cartWithIdArraySchema.parse(rawData)

  } catch (error) {
    throw new Error('Could not fetch cart')
  }
}