import { vi, expect, it, afterEach } from 'vitest'
import request from 'supertest'
import entry from '../../src/entry.ts'
import db from '../../src/aws/aws.ts'
import { randomUUID } from 'node:crypto'

afterEach(() => {
  vi.restoreAllMocks()
})

it('GET /api/products', async () => {

  const id = randomUUID()

  vi.spyOn(db, 'send').mockImplementation(async () => {
    console.log('🔥 MOCK DB SEND WAS CALLED')

    return {
      Items: [
        {
          pk: 'PRODUCT',
          sk: `PRODUCT#${id}`,
          productId: id,
          name: 'Thing',
          price: 10,
          image: 'http://thing.jpg',
          amountInStock: 5,
        },
      ],
    } as any
  })
  const response = await request(entry)
    .get('/api/products')

  console.log("body:", response.body)

  expect(response.status).toBe(200)
})