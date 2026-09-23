import type { RequestHandler } from 'express'
import { idSchema } from '@project/shared'

function createIdParser<Name extends string>(
  name: Name,
  schema: typeof idSchema,
): RequestHandler<Record<Name, string>> {
  return (req, res, next): void => {
    try {
      res.locals[name] = schema.parse(
        Number(req.params[name]),
      )
      next()
    } catch {
      res.sendStatus(400)
    }
  }
}

export const userIdParser = createIdParser("userId", idSchema)
export const productIdParser = createIdParser("productId", idSchema)


