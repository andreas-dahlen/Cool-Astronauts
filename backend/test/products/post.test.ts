import { vi, expect, it, afterEach, describe } from 'vitest'
import request from 'supertest'
import entry from '../../src/entry.ts'
import db from '../../src/aws/aws.ts'
import { randomUUID } from 'node:crypto'

afterEach(() => {
  vi.restoreAllMocks()
})
const id = randomUUID()
const testProduct = {
  name: 'Thing',
  price: 10,
  image: 'http://thing.jpg',
  amountInStock: 5
}

describe('POST /api/products', () => {
  it('posts an item', async () => {

    vi.spyOn(db, 'send').mockImplementation(async () => {
      return {} as any
    })

    const response = await request(entry)
      .post('/api/products').send(testProduct)

    expect(response.status).toBe(201)
    expect(response.text).toBeTruthy()
  })
})