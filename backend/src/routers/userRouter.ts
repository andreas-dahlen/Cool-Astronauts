import express, { type Router } from 'express'
import { randomUUID } from 'node:crypto'

import { type User, type UserIdParam, type UserWithId, type Id, type DbUser, dbUserSchema, dbUserArraySchema } from '@project/shared'

import { GetCommand, QueryCommand, PutCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb'
import { ConditionalCheckFailedException } from '@aws-sdk/client-dynamodb'

import { userIdParser } from '../middleware/idParsers.ts'
import { jsonParser, userParser } from '../middleware/bodyParser.ts'
import db, { tableName } from '../aws/aws.ts'

const router: Router = express.Router()


//   ALLA USERS
router.get<{}, UserWithId[] | void>(
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

            const dbUsers = dbUserArraySchema.parse(result.Items)

            const users: UserWithId[] = dbUsers.map(item => {
                const { pk, sk, ...user } = item

                return {
                    userId: sk.replace('USER#', ''),
                    ...user
                }
            })
            res.status(200).send(users)

        } catch (error) {
            res.sendStatus(500)
        }
    }
)


// EN SÄRKSILD USER
router.get<UserIdParam, User>(
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

            const dbUser = dbUserSchema.parse(result.Item)
            const { pk, sk, ...user } = dbUser

            res.status(200).send(user)

        } catch (error) {
            res.sendStatus(500)
        }
    }
)

router.post<{}, Id, User>(
    '/',
    jsonParser,
    userParser,
    async (req, res): Promise<void> => {
        const baseUser = req.body
        const userId = randomUUID()

        const item: DbUser = {
            pk: 'USER',
            sk: `USER#${userId}`,
            ...baseUser
        }

        try {
            await db.send(new PutCommand({
                TableName: tableName,
                Item: item,
                ConditionExpression: 'attribute_note_exists(pk)'
            }))
            res.status(201).send(userId)

        } catch (error) {
            res.sendStatus(500)
        }
    }
)


router.put<UserIdParam, void, User>(
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

            res.sendStatus(500)
        }
    }
)

export default router