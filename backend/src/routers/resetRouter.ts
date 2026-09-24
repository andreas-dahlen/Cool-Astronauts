import express, { type Router } from 'express'
import { users } from '../data/users.ts'

const router: Router = express.Router()

router.delete('/', (_req, res) => {
  //

  res.status(205)
})

export default router