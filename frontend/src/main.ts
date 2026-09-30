import { getProducts } from './api/products.ts'

async function start(): Promise<void> {
    try {
        const products = await getProducts('http://localhost:3001/api/')
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

    } catch (error) {
        console.error(error)
    }
}

start()