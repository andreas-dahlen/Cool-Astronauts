import { getProducts } from '../src/api/products.ts'

const baseUrl = 'http://localhost:3001/api/'

async function start(): Promise<void> {
    try {
        const products = await getProducts(baseUrl)
        const productContainer = document.querySelector('#products')

        if (!productContainer) {
            throw new Error('Product container not found')
        }

        products.forEach(product => {
            const productCard = document.createElement('article')
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

            productCard.append(
                image,
                name,
                price,
                stock,
                button
            )
            productContainer.append(productCard)
        })

    } catch (error) {
        console.error(error)
    }
}
