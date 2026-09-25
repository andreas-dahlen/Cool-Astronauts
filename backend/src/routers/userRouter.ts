import express, { type Router } from 'express'
import { randomUUID } from 'node:crypto'

import type { UserSchema, UserIdParam, CombinedUserSchema, IdSchema } from '@project/shared'

import { GetCommand, QueryCommand, PutCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb'

import { ConditionalCheckFailedException } from '@aws-sdk/client-dynamodb'

import { userIdParser } from '../middleware/idParsers.ts'
import { jsonParser, userParser } from '../middleware/bodyParser.ts'
import db, { tableName } from '../aws/aws.ts'

const router: Router = express.Router()


//   ALLA UISERS
router.get<{}, CombinedUserSchema[]>(
    '/',
    async (_req, res): Promise<void> => {
        try {
            const result = await db.send(new QueryCommand({
                TableName: tableName,
                KeyConditionExpression: 'pk = :pk',
                ExpressionAttributeValues: {
                    ':pk': 'USER'
                }
            }))

            const users: CombinedUserSchema[] = (result.Items ?? []).map(item => ({
                userId: item.sk.replace('USER#', ''),
                name: item.name
            }))
            res.status(200).send(users)

        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }
)


// EN SÄRKSILD USER
router.get<UserIdParam, UserSchema>(
    '/:userId',
    userIdParser,
    async (_req, res): Promise<void> => {
        const userId = res.locals.userId
        
        try {
            const result = await db.send(new GetCommand({
                TableName: tableName,
                Key: {
                    pk: 'USER',
                    sk: `USER#${userId}`
                }
            }))

            if (!result.Item) {
                res.sendStatus(404)
                return
            }

            const user: UserSchema = {
                name: result.Item.name
            }
            res.status(200).send(user)

        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }
)


router.post<{}, IdSchema, UserSchema>(
    '/',
    jsonParser,
    userParser,
    async (req, res): Promise<void> => {
        const baseUser = req.body
        const userId = randomUUID()

        const item = {
            pk: 'USER',
            sk: `USER#${userId}`,
            ...baseUser
        }

        try {
            await db.send(new PutCommand({
                TableName: tableName,
                Item: item
            }))
            res.status(201).send(userId)

        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }
)


router.put<UserIdParam, void, UserSchema>(
    '/:userId',
    userIdParser,
    jsonParser,
    userParser,
    async (req, res): Promise<void> => {
        const userId = res.locals.userId
        const body = req.body

        try {
            await db.send(new UpdateCommand({
                TableName: tableName,

                Key: {
                    pk: 'USER',
                    sk: `USER#${userId}`
                },

                UpdateExpression: 'SET #name = :name',

                ExpressionAttributeNames: {
                    '#name': 'name'
                },

                ExpressionAttributeValues: {
                    ':name': body.name
                },

                ConditionExpression: 'attribute_exists(pk)'
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


router.delete<UserIdParam>(
    '/:userId',
    userIdParser,
    async (_req, res): Promise<void> => {
        const userId = res.locals.userId

        try {
            await db.send(new DeleteCommand({
                TableName: tableName,

                Key: {
                    pk: 'USER',
                    sk: `USER#${userId}`
                },

                ConditionExpression: 'attribute_exists(pk)'
            }))
            res.sendStatus(204)

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

export default router