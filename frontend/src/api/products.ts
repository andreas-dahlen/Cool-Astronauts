import { productsWithIdArraySchema, type ProductWithId } from '@project/shared'



export async function getProducts(basePath: string): Promise<ProductWithId[]> {

    try {
        const response = await fetch(`${basePath}products`)
        const rawData = await response.json()

        return productsWithIdArraySchema.parse(rawData)

    } catch (error) {
        throw new Error('Could not fetch products')
    }
}