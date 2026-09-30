import express, { type Router } from 'express'
import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  QueryCommand,
  UpdateCommand
} from '@aws-sdk/lib-dynamodb'
import { ConditionalCheckFailedException } from '@aws-sdk/client-dynamodb'
import db, { tableName } from '../aws/aws.ts'
import { productIdParser, userIdParser } from '../middleware/idParsers.ts'
import { cartParser, jsonParser } from '../middleware/bodyParser.ts'
import {
  dbCartArraySchema,
  dbCartSchema,
  type Cart,
  type CartWithId,
  type DoubleIdParam,
  type UserIdParam,
  type Id,
  type DbCart
} from '@project/shared'

const router: Router = express.Router()

router.get<UserIdParam, CartWithId[]>('/:userId',
  userIdParser,
  async (_req, res): Promise<void> => {
    const userId: Id = res.locals.userId

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

      const cart: CartWithId[] = cartData.data.map(item => ({
        productId: item.sk.replace('PRODUCT#', ''),
        amount: item.amount
      }))

      res.status(200).send(cart)

    } catch (error) {
      console.error(error)
      res.sendStatus(500)
    }
  }
)


router.get<DoubleIdParam, CartWithId | void>(
  '/:userId/product/:productId',
  userIdParser,
  productIdParser,
  async (_req, res): Promise<void> => {
    const userId: Id = res.locals.userId
    const productId: Id = res.locals.productId

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

      res.status(200).send(cartItem)

    } catch (error) {
      console.error(error)
      res.sendStatus(500)
    }
  }
)


router.post<DoubleIdParam, Id, Cart>(
  '/:userId/product/:productId',
  userIdParser,
  productIdParser,
  jsonParser,
  cartParser,
  async (req, res): Promise<void> => {
    const userId: Id = res.locals.userId
    const productId: Id = res.locals.productId
    const cart: Cart = req.body

    const item: DbCart = {
      pk: `USER#${userId}`,
      sk: `PRODUCT#${productId}`,
      ...cart
    }

    try {

      await db.send(new PutCommand({
        TableName: tableName,
        Item: item,
        ConditionExpression: 'attribute_not_exists(pk)'
      }))

      res.status(201).send(productId)

    } catch (error) {

      if (error instanceof ConditionalCheckFailedException) {
        res.sendStatus(400)
        return
      }

      console.error(error)
      res.sendStatus(500)
    }
  }
)


router.put<DoubleIdParam, void, Cart>(
  '/:userId/product/:productId',
  userIdParser,
  productIdParser,
  jsonParser,
  cartParser,
  async (req, res): Promise<void> => {
    const userId: Id = res.locals.userId
    const productId: Id = res.locals.productId
    const cart: Cart = req.body

    try {

      await db.send(new UpdateCommand({
        TableName: tableName,
        Key: {
          pk: `USER#${userId}`,
          sk: `PRODUCT#${productId}`
        },
        UpdateExpression: 'SET amount = :amount',
        ConditionExpression: 'attribute_exists(pk)',
        ExpressionAttributeValues: {
          ':amount': cart.amount
        }
      }))

      res.sendStatus(200)

    } catch (error) {

      if (error instanceof ConditionalCheckFailedException) {
        res.sendStatus(404)
        return
      }

      console.error(error)
      res.sendStatus(500)
    }
  }
)


router.delete<DoubleIdParam>('/:userId/product/:productId',
  userIdParser,
  productIdParser,
  async (_, res): Promise<void> => {
    const userId: Id = res.locals.userId
    const productId: Id = res.locals.productId

    try {

      const result = await db.send(new DeleteCommand({
        TableName: tableName,
        Key: {
          pk: `USER#${userId}`,
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