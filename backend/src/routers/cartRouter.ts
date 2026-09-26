import express, { type Router } from 'express'
import { QueryCommand } from '@aws-sdk/lib-dynamodb'
import db, { tableName } from '../aws/aws.ts'
import { userIdParser } from '../middleware/idParsers.ts'
import { dbCartArraySchema, combinedCartArraySchema } from '@project/shared'


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

      const parsedCart = dbCartArraySchema.parse(result.Items ?? [])

      const cart = parsedCart.map(item => ({
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

export default router