import express, { type Router } from 'express'
import { GetCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb'
import db, { tableName } from '../aws/aws.ts'
import { productIdParser, userIdParser } from '../middleware/idParsers.ts'
import {
  dbCartArraySchema,
  combinedCartArraySchema,
  dbCartSchema
} from '@project/shared'

const router: Router = express.Router()

router.get('/:userId',
  userIdParser,
  async (_req, res): Promise<void> => {
    const userId = res.locals.userId

    try {
      const result = await db.send(new QueryCommand({
        TableName: tableName,
        KeyConditionExpression: 'pk = :pk',
        ExpressionAttributeValues: {
          ':pk': `USER#${userId}`
        }
      }))

      const cartData = dbCartArraySchema.safeParse(result.Items)

      if (cartData.error) {
        console.log(cartData.error)
        res.sendStatus(500)
        return
      }

      const cart = cartData.data.map(item => ({
        productId: item.sk.replace('PRODUCT#', ''),
        amount: item.amount
      }))

      const parsedResponse = combinedCartArraySchema.parse(cart)

      res.status(200).json(parsedResponse)

    } catch (error) {
      console.error(error)
      res.sendStatus(500)
    }
  }
)

router.get('/:userId/product/:productId',
  userIdParser,
  productIdParser,
  async (_req, res): Promise<void> => {
    const userId = res.locals.userId
    const productId = res.locals.productId

    try {
      const result = await db.send(new GetCommand({
        TableName: tableName,
        Key: {
          pk: `USER#${userId}`,
          sk: `PRODUCT#${productId}`
        }
      }))

      if (!result.Item) {
        res.sendStatus(404)
        return
      }

      const cartData = dbCartSchema.safeParse(result.Item)

      if (cartData.error) {
        console.log(cartData.error)
        res.sendStatus(500)
        return
      }

      const cartItem = {
        productId: cartData.data.sk.replace('PRODUCT#', ''),
        amount: cartData.data.amount
      }

      res.status(200).json(cartItem)

    } catch (error) {
      console.error(error)
      res.sendStatus(500)
    }
  }
)

export default router