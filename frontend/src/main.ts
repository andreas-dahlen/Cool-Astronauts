import { header } from './components/header.ts'

const baseUrl = 'http://localhost:3001/api/'

import { getUser } from './api/users.ts'
import { getProducts } from './api/products.ts'

type Views = "products" | "cart" | null
export async function start() {

    let views: Views = null

    const [products, user] = await Promise.all([
        getProducts(baseUrl),
        getUser(baseUrl)
    ])

    header()

    if (views === "products") {
        // productView(products)
        views = "products"
    }

    if (views === "cart") {
        // await cartView(user, products, baseUrl)
        views = "cart"
    }

    if (views === null) {
        //welcomeView()
        views = null
    }
}

start()