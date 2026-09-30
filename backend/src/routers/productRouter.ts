import express, { type Router } from 'express'
import { productIdParser } from '../middleware/idParsers.ts'
import { jsonParser, productParser } from '../middleware/bodyParser.ts'
import { DeleteCommand, GetCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb'
import db, { tableName } from '../aws/aws.ts'
import { randomUUID } from 'crypto'
import { ConditionalCheckFailedException } from '@aws-sdk/client-dynamodb'
import { dbProductArraySchema, dbProductSchema, type Id, type Product, type ProductIdParam, type ProductWithId } from '@project/shared'

const router: Router = express.Router()

router.get<{}, ProductWithId[]>('/',
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

      const productData = dbProductArraySchema.safeParse(result.Items)

      if (productData.error) {
        res.sendStatus(500)
        return
      }

      const data = productData.data.map(entry => {
        const { pk, sk, ...rest } = entry
        return {
          productId: sk.replace("PRODUCT#", ""),
          ...rest
        }
      })

      res.status(200).send(data)
    } catch {
      res.sendStatus(500)
    }
  })

router.get<ProductIdParam, Product | void>('/:productId',
  productIdParser,
  async (_, res): Promise<void> => {
    const id: Id = res.locals.productId

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

      const product = dbProductSchema.safeParse(result.Item)

      if (product.error) {
        res.sendStatus(500)
        return
      }
      const { pk, sk, ...rest } = product.data


      res.status(200).send(rest)
    } catch {
      res.sendStatus(500)
    }
  })

router.post<{}, Id, Product>('/',
  jsonParser, productParser,
  async (req, res): Promise<void> => {
    const baseProduct = req.body
    const productId: Id = randomUUID()

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
    } catch (error) {
      res.sendStatus(500)
    }
  })

router.put<ProductIdParam, void, Product>('/:productId',
  productIdParser, jsonParser, productParser,
  async (req, res): Promise<void> => {
    const productId: Id = res.locals.productId

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
        ConditionExpression: 'attribute_exists(pk)', // prevent creating a missing item
      }))
      res.status(200).send()
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
    const productId: Id = res.locals.productId

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