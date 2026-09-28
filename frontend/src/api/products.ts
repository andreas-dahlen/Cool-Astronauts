import type { ProductWithId } from '@project/shared'

export async function getProducts(): Promise<ProductWithId[]> {
    const response = await fetch('http://localhost:3001/api/products')

    if (!response.ok) {
        throw new Error('Could not fetch products')
    }

    return await response.json()
}