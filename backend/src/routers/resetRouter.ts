import express, { type Router } from 'express'
import db, { tableName } from '../aws/aws.ts'
import { BatchWriteCommand } from '@aws-sdk/lib-dynamodb'
import { getDbData } from '../data/generateDbData.ts'

const router: Router = express.Router()

router.put('/', async (_req, res) => {
  const data = getDbData()

  try {
    await db.send(new BatchWriteCommand({
      RequestItems: {
        [tableName]: [data].map(Item => ({
          PutRequest: { Item }
        }))
      }, //check settings for batchWrite -> put request

    }))
    res.sendStatus(205)
  } catch {
    res.sendStatus(500)
  }
})

export default router