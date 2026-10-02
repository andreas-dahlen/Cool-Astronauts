import { header } from './components/header.ts'
import { getUser } from './api/users.ts'
import { getProducts } from './api/products.ts'
import { productView } from './components/productView.ts'
import { cartView } from './components/cartView.ts'
import { welcomeView } from './components/welcomeView.ts'

const baseUrl = 'http://localhost:3001/api/'
export type Views = "products" | "cart" | null
export async function start() {

    let views: Views = null

    const response = await fetch(`${baseUrl}RESET`, { method: "PUT" })
    console.log(response.status, response.url)

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