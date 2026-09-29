import { getProducts } from './api/products.ts'

async function start(): Promise<void> {
  try {
    const products = await getProducts()
    console.log(products)
  } catch (error) {
    console.error(error)
  }
}

start()