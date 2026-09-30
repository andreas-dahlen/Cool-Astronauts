import { getProducts } from './api/products.ts'

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

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.price} kr</p>
                <p>I lager: ${product.amountInStock}</p>
                <button>Köp</button>
            `
            productContainer.append(productCard)
        })

        //TODO show all information from database

    } catch (error) {
        console.error(error)
    }
}

start()