import express, { type Router } from 'express'
import { products } from '../data/products.ts'

import { combinedProductsArraySchema, combinedProductSchema, type CombinedProductSchema, type IdSchema, type ProductIdParam, type ProductSchema } from '@project/shared'
import { productIdParser } from '../middleware/idParsers.ts'
import { jsonParser, productParser } from '../middleware/bodyParser.ts'
import { GetCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb'
import db, { tableName } from '../aws/aws.ts'
import { randomUUID, type UUID } from 'crypto'

const router: Router = express.Router()

router.get<{}, CombinedProductSchema[]>('/', async (_req, res): Promise<void> => {

  const result = await db.send(new QueryCommand({
    TableName: tableName,
    KeyConditionExpression: 'pk = :type',
    ExpressionAttributeValues: {
      ':type': 'PRODUCT',
    },
    ScanIndexForward: true
  }))
  const productData = combinedProductsArraySchema.safeParse(result.Items)

  if (productData.error) {
    res.sendStatus(500)
    return
  }

  res.status(200).send(productData.data)
})

router.get<ProductIdParam, ProductSchema | void>('/:productId', productIdParser, async (_req, res): Promise<void> => {
  const id: UUID = res.locals.productId

  const result = await db.send(new GetCommand({
    TableName: tableName,
    Key: {
      pk: "PRODUCT",
      sk: `PRODUCT#${id}`
    }
  }))

  if (!result.Item) {
    res.sendStatus(404)
    return
  }

  const validatedResult = combinedProductSchema.safeParse(result.Item)

  if (validatedResult.error) {
    res.sendStatus(500)
    return
  }

  const { productId, ...productWithoutId } = validatedResult.data
  res.status(200).send(productWithoutId)
})

router.post<{}, IdSchema, ProductSchema>('/', jsonParser, productParser, async (req, res): Promise<void> => {
  const baseProduct = req.body
  const productId: UUID = randomUUID()

  const item = {
    pk: 'PRODUCT',
    sk: `PRODUCT#${productId}`,
    ...baseProduct
  }

  try {
    await db.send(new PutCommand({
      TableName: tableName,
      Item: item,
      ConditionExpression: 'attribute_not_exists(pk)' //unique
    }));
    res.status(201).send(productId)
  } catch {
    res.sendStatus(500)
  }
})

router.put<ProductIdParam, void, ProductSchema>('/:productId', productIdParser, jsonParser, productParser, (req, res): void => {
  const productId: UUID = res.locals.productId



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