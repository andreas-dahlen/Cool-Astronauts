import type { RequestHandler } from 'express'
import { type ZodNumber, userIdSchema, productIdSchema } from '@project/shared'

const createIdParser = <Name extends string>(
  name: Name,
  schema: ZodNumber,
): RequestHandler<Record<Name, string>> =>
  (req, res, next): void => {
    try {
      res.locals[name] = schema.parse(
        Number(req.params[name]),
      )
      next()
    } catch {
      res.sendStatus(400)
    }
  }

export const userIdParser = createIdParser("userId", userIdSchema)
export const productIdParser = createIdParser("productId", productIdSchema)


