import type { ProductWithId, UserWithId } from '@project/shared';
import { getCart } from '../api/cart.ts';


export async function cartView(
  user: UserWithId,
  products: ProductWithId[],
  baseUrl: string
): Promise<void> {

  const cart = await getCart(baseUrl, user.userId)
  const cartContainer = document.querySelector('#content')

  if (!cartContainer) {
    throw new Error('Cart container not found')
  }

  for (const cartItem of cart) {
    const product = products.find(prod => prod.productId === cartItem.productId)

    if (!product) {
      throw new Error("no product found")
    }
    const cartCard = document.createElement('article')
    const image = document.createElement('img')
    image.src = product.image
    image.alt = product.name

    const name = document.createElement('h2')
    name.textContent = product.name

    const price = document.createElement('p')
    price.textContent = `${product.price} kr`

    const stock = document.createElement('p')
    stock.textContent = `I lager: ${product.amountInStock}`

    const button = document.createElement('button')
    button.textContent = 'Köp'

    button.addEventListener('click', () => {
      console.log('Product ID:', product.productId)
    })

    cartCard.append(
      image,
      name,
      price,
      stock,
      button
    )
    cartContainer.append(cartCard)
  }
}