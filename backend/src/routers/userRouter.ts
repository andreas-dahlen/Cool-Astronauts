import express, { type Router } from 'express'
import { users } from '../data/users.ts'
import { userIdParser } from '../middleware/idParsers.ts'
import { userParser } from '../middleware/bodyParser.ts'
import type { UserSchema } from '@project/shared'

const router: Router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json(users)
})

router.get('/:userId', userIdParser, (req, res) => {
    const userId = res.locals.userId
    const user = users.find(user => user.userId === userId)

    if (!user) {
        res.sendStatus(404)
        return
    }
    res.status(200).json(user)
})

router.post('/', userParser, (req, res) => {
    const body = req.body as UserSchema
    const newUser = {
        userId: users.length + 1,
        name: body.name
    }

    users.push(newUser)
    res.status(201).json(newUser)
})

router.put('/:userId', userIdParser, userParser, (req, res) => {
    const userId = res.locals.userId
    const body = req.body as UserSchema
    const user = users.find(user => user.userId === userId)

    if (!user) {
        res.sendStatus(404)
        return
    }
    user.name = body.name
    res.status(200).json(user)
})

router.delete('/:userId', userIdParser, (req, res) => {
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