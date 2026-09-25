import express, { type Router } from 'express'
import { users } from '../data/users.ts'
import { userIdParser } from '../middleware/idParsers.ts'
import { jsonParser, userParser } from '../middleware/bodyParser.ts'
import type { UserSchema, UserIdParam, CombinedUserSchema, IdSchema } from '@project/shared'
import { randomUUID, type UUID } from 'node:crypto'

const router: Router = express.Router()

router.get<{}, CombinedUserSchema[]>('/', (_req, res) => {
    res.status(200).json(users)
})

// router.get<UserIdParam, UserSchema>('/:userId', userIdParser, (_req, res): void => {
//     const userId: number = res.locals.userId
//     // const user = users.find(user => user.userId === userId)

//     if (!user) {
//         res.sendStatus(404)
//         return
//     }

//     const { userId: _userId, ...userWithoutId } = user
//     res.status(200).send(userWithoutId)
// })

router.post<{}, IdSchema, UserSchema>('/', jsonParser, userParser, (req, res) => {
    const user = req.body
    const userId: UUID = randomUUID()
    const newUser: CombinedUserSchema = { ...user, userId }

    users.push(newUser)
    res.status(201).json(userId)
})

router.put<UserIdParam, void, UserSchema>('/:userId', jsonParser, userIdParser, userParser, (req, res): void => {
    const userId = res.locals.userId
    const body = req.body
    const user = users.find(user => user.userId === userId)

    if (!user) {
        res.sendStatus(404)
        return
    }
    user.name = body.name
    users[userId] = { ...body, userId }
    res.sendStatus(200)
})

router.delete<UserIdParam>('/:userId', userIdParser, (_req, res): void => {
    const userId = res.locals.userId
    const index = users.findIndex(user => user.userId === userId)

    if (index === -1) {
        res.sendStatus(404)
        return
    }
    users.splice(index, 1)
    res.sendStatus(204)
})

export default router