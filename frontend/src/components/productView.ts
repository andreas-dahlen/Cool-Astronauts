import type { ProductWithId } from '@project/shared'

export function productView(products: ProductWithId[]): void {
    const productContainer = document.querySelector('#products')

    if (!productContainer) {
        throw new Error('Product container not found')
    }

    products.forEach(product => {
        const productCard = document.createElement('content')
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
            console.log('product.productId')
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
}