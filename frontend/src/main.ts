import { header } from './components/header.ts'

const baseUrl = 'http://localhost:3001/api/'

import { getUser } from './api/users.ts'
import { getProducts } from './api/products.ts'
import { productView } from './components/productView.ts'
import { cartView } from './components/cartView.ts'
import { welcomeView } from './components/welcomeView.ts'

export type Views = "products" | "cart" | null
export async function start() {

    let views: Views = null

    const [products, user] = await Promise.all([
        getProducts(baseUrl),
        getUser(baseUrl)
    ])

    const changeView = async (view: Views) => {
        views = view

        if (views === 'products') {
            productView(products)
        }

        if (views === 'cart') {
            await cartView(user, products, baseUrl)
        }

        if (views === null) {
            welcomeView()
        }
    }

    header(user, changeView)
}

start()