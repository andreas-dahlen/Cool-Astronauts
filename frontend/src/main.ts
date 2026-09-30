import { getProducts } from './api/products.ts'

const basePath = "http://localhost:3001/api/"

async function start(): Promise<void> {
  const products = await getProducts(basePath)
  console.log(products)
}

start()