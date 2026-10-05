import express, { type Router } from 'express'
import db, { tableName } from '../aws/aws.ts'
import { BatchWriteCommand } from '@aws-sdk/lib-dynamodb'
import { getDbData } from '../data/generateDbData.ts'

const router: Router = express.Router()

router.put('/', async (_req, res) => {      //återställer till ett bestämt startläge
  const data = getDbData()

  try {

    for (let i = 0; i < data.length; i += 25) {
      const batch = data.slice(i, i + 25)
      await db.send(new BatchWriteCommand({
        RequestItems: {
          [tableName]: batch.map(Item => ({
            PutRequest: { Item }
          }))
        }, //check settings for batchWrite -> put request
      }))
    }
    res.sendStatus(205)
  } catch {
    res.sendStatus(500)
  }
})

export default router