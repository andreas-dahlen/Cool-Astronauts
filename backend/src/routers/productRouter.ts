import express, { type Router } from 'express'
import { products } from '../data/products.ts'

import type { CombinedProductSchema, IdSchema, ProductIdParam, ProductSchema } from '@project/shared'
import { productIdParser } from '../middleware/idParsers.ts'
import { jsonParser, productParser } from '../middleware/bodyParser.ts'
import { generateId } from '../helpers/idGenerator.ts'
import { QueryCommand } from '@aws-sdk/lib-dynamodb'
import db, { tableName } from '../aws/aws.ts'

const router: Router = express.Router()

router.get<{}, CombinedProductSchema[]>('/', async (_req, res): Promise<void> => {

  // const result = await db.send(new QueryCommand({
  //   TableName: tableName,
  // }))


  res.status(200).send(products)
})

router.get<ProductIdParam, ProductSchema>('/:productId', productIdParser, (_req, res): void => {
  const id = res.locals.productId
  const product = products.find(prod => prod.productId === id)

  if (!product) {
    res.sendStatus(404)
    return
  }
  const { productId, ...productWithoutId } = product
  res.status(200).send(productWithoutId)
})

router.post<{}, IdSchema, ProductSchema>('/', jsonParser, productParser, (req, res): void => {
  const baseProduct = req.body
  const productId: number = generateId(products, "productId")

  const newEntry: CombinedProductSchema = {
    ...baseProduct,
    productId
  }

  products.push(newEntry)
  res.status(201).send(productId)
})

router.put<ProductIdParam, void, ProductSchema>('/:productId', productIdParser, jsonParser, productParser, (req, res): void => {
  const productId: number = res.locals.productId
  const oldProduct = products.find(prod => prod.productId === productId)

  if (!oldProduct) {
    res.sendStatus(404)
    return
  }
  const baseProduct = req.body

  products[productId] = { ...baseProduct, productId }

  res.sendStatus(200)
})

router.delete<ProductIdParam>('/:productId', productIdParser, (_req, res): void => {
  const productId: number = res.locals.productId
  const index = products.findIndex(prod => prod.productId === productId)

  if (index === -1) {
    res.sendStatus(404)
    return
  }
  products.splice(index, 1)
  res.sendStatus(204)
})

export default router