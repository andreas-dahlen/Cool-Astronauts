import express, { type Router } from 'express'
import { users } from '../data/users.ts'
import db, { tableName } from '../aws/aws.ts'
import { BatchWriteCommand, ScanCommand } from '@aws-sdk/lib-dynamodb'
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
      }
    }))
    res.sendStatus(205)
  } catch {
    res.sendStatus(500)
  }
})

export default router