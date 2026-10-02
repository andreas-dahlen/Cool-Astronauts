import type { UserWithId } from '@project/shared'
import type { Views } from '../main.ts'
export function header(user: UserWithId, changeView: (view: Views) => void): void {

  const headerContainer = document.querySelector('#header')

  if (!headerContainer) {
    throw new Error('Header container not found')
  }

  const h1 = document.createElement('h1')
  h1.textContent = "Cool Astronauts"
  h1.className = 'h1'

  const name = document.createElement('h2')
  name.textContent = `${user.name}`


  const nav = document.createElement('nav')

  const productButton = document.createElement('button')
  productButton.textContent = 'Products'
  const cartButton = document.createElement('button')
  cartButton.textContent = 'Cart'
  const homeButton = document.createElement('button')
  homeButton.textContent = 'Home'

  productButton.addEventListener('click', () => {
    changeView('products')
  })

  cartButton.addEventListener('click', () => {
    changeView('cart')
  })

  homeButton.addEventListener('click', () => {
    changeView(null)
  })

  nav.append(
    productButton,
    cartButton,
    homeButton
  )

  headerContainer.append(h1)
  headerContainer.append(name)
  headerContainer.append(nav)
}