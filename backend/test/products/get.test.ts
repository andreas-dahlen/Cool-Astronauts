import { vi, expect, it, afterEach, describe } from 'vitest'
import request from 'supertest'
import entry from '../../src/entry.ts'
import db from '../../src/aws/aws.ts'
import { randomUUID } from 'node:crypto'

afterEach(() => {
  vi.restoreAllMocks()
})
const id = randomUUID()
const testItem = {
  pk: 'PRODUCT',
  sk: `PRODUCT#${id}`,
  name: 'Thing',
  price: 10,
  image: 'http://thing.jpg',
  amountInStock: 5
}

describe('GET /api/products', () => {
  it('gets all products', async () => {

    vi.spyOn(db, 'send').mockImplementation(async () => {

      return {
        Items: [
          testItem
        ]
      } as any
    })
    const response = await request(entry)
      .get('/api/products')

    expect(response.status).toBe(200)
    expect(response.body).toEqual([
      {
        productId: id,
        name: 'Thing',
        price: 10,
        image: 'http://thing.jpg',
        amountInStock: 5
      }
    ])
  })
  it('gets a single product', async () => {

    vi.spyOn(db, 'send').mockImplementation(async () => {

      return {
        Item: testItem
      } as any
    })
    const response = await request(entry)
      .get(`/api/products/${id}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      {
        name: 'Thing',
        price: 10,
        image: 'http://thing.jpg',
        amountInStock: 5
      }
    )
  })
})