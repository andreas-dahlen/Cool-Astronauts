import type { RequestHandler } from 'express'
import { idSchema } from '@project/shared'

function createIdParser<IdName extends string>(
  idName: IdName): RequestHandler<Record<IdName, string>> {
  return (req, res, next): void => {
    try {
      res.locals[idName] = idSchema.parse(
        req.params[idName]
      )
      next()
    } catch {
      res.sendStatus(400)
    }
  }
}

export const userIdParser = createIdParser("userId")
export const productIdParser = createIdParser("productId")


