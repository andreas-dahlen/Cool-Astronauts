import express, { type Router } from 'express'
import { randomUUID } from 'node:crypto'

import type { User, UserIdParam, UserWithId, Id } from '@project/shared'

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

            const users: UserWithId[] = (result.Items ?? []).map(item => ({
                userId: item.sk.replace('USER#', ''),
                name: item.name
                //returnera resten så om man lägger till mer..
            }))
            res.status(200).send(users)

        } catch (error) {
            console.error(error)
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

            const user: User = {
                name: result.Item.name
            }

            //andreas förslag.. 
            // const {pk, sk, ...rest} = result.item
            //
            // res.status(200).send(rest)

            res.status(200).send(user)

        } catch (error) {
            console.error(error)
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

        const item = { //lägg till type
            pk: 'USER',
            sk: `USER#${userId}`,
            ...baseUser
        }

        try {
            await db.send(new PutCommand({
                TableName: tableName,
                Item: item
                // andreas förslag. ConditionExpression: 'attribute_not_exists(pk)' // prevent overwriting an existing item

            }))
            res.status(201).send(userId)

        } catch (error) {
            console.error(error)
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