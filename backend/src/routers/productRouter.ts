import express, { type Router } from 'express'
import { combinedProductsArraySchema, combinedProductSchema, type CombinedProductSchema, type IdSchema, type ProductIdParam, type ProductSchema } from '@project/shared'
import { productIdParser } from '../middleware/idParsers.ts'
import { jsonParser, productParser } from '../middleware/bodyParser.ts'
import { DeleteCommand, GetCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb'
import db, { tableName } from '../aws/aws.ts'
import { randomUUID, type UUID } from 'crypto'
import { ConditionalCheckFailedException } from '@aws-sdk/client-dynamodb'

const router: Router = express.Router()

router.get<{}, CombinedProductSchema[]>('/',
  async (_, res): Promise<void> => {

    try {
      const result = await db.send(new QueryCommand({
        TableName: tableName,
        KeyConditionExpression: 'pk = :type',
        ExpressionAttributeValues: {
          ':type': 'PRODUCT',
        },
        ScanIndexForward: true,
      }))

      const productData = combinedProductsArraySchema.safeParse(result.Items)

      if (productData.error) {
        console.log(productData.error)
        res.sendStatus(500)
        return
      }

      res.status(200).send(productData.data)
    } catch {
      res.sendStatus(500)
    }
  })

router.get<ProductIdParam, ProductSchema | void>('/:productId',
  productIdParser,
  async (_, res): Promise<void> => {
    const id: UUID = res.locals.productId

    try {
      const result = await db.send(new GetCommand({
        TableName: tableName,
        Key: {
          pk: 'PRODUCT',
          sk: `PRODUCT#${id}`,
        },
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
    } catch {
      res.sendStatus(500)
    }
  })

router.post<{}, IdSchema, ProductSchema>('/',
  jsonParser, productParser,
  async (req, res): Promise<void> => {
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
        ConditionExpression: 'attribute_not_exists(pk)' //database overwrite protection
      }));
      res.status(201).send(productId)
    } catch {
      res.sendStatus(500)
    }
  })

router.put<ProductIdParam, void, ProductSchema>('/:productId',
  productIdParser, jsonParser, productParser,
  async (req, res): Promise<void> => {
    const productId: UUID = res.locals.productId

    const baseProduct = req.body

    const item = {
      pk: 'PRODUCT',
      sk: `PRODUCT#${productId}`,
      ...baseProduct
    }

    try {
      await db.send(new PutCommand({
        TableName: tableName,
        Item: item,
        ConditionExpression: 'attribute_exists(pk)', //database don't create protection
      }))
      res.sendStatus(200)
    } catch (error) {
      if (error instanceof ConditionalCheckFailedException) {
        res.sendStatus(404)
        return
      }
      res.sendStatus(500)
    }
  })

router.delete<ProductIdParam>('/:productId',
  productIdParser,
  async (_, res): Promise<void> => {
    const productId: UUID = res.locals.productId

    try {
      const result = await db.send(new DeleteCommand({
        TableName: tableName,
        Key: {
          pk: 'PRODUCT',
          sk: `PRODUCT#${productId}`,
        },
        ReturnValues: 'ALL_OLD',
      }))

      if (!result.Attributes) {
        res.sendStatus(404)
        return
      }

      res.sendStatus(204)
    } catch {
      res.sendStatus(500)
    }
  },
)

export default router