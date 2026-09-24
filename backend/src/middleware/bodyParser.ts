import type { RequestHandler } from 'express'
import express from 'express'
import { cartSchema, productSchema, userSchema } from '@project/shared'


type ParserSchema<T> = {
  parse: (input: unknown) => T
}

function createBodyParser<T>(
  schema: ParserSchema<T>,
): RequestHandler<{}, any, unknown> {
  return (req, res, next): void => {
    try {
      req.body = schema.parse(req.body)
      next()
    } catch {
      res.sendStatus(400)
    }
  }
}

export const productParser = createBodyParser(productSchema)
export const userParser = createBodyParser(userSchema)
export const cartParser = createBodyParser(cartSchema)

export const jsonParser = express.json()