import { getUser } from '../api/users.ts'

export function header(): void {

  const headerContainer = document.querySelector('#header')

  if (!headerContainer) {
    throw new Error('Header container not found')
  }

  const h1 = document.createElement('h1')
  h1.textContent = "Cool Astronauts"
  h1.className = 'h1'


  headerContainer.append(h1)
}