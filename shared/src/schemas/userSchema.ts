import * as z from "zod"

export const idSchema = z.uuid()


export const userSchema = z.object({
  name: z.string(),
}).strict()
export const dbUserSchema = userSchema.extend({
  pk: z.literal('USER'),
  sk: z.templateLiteral([
    z.literal('USER#'),
    idSchema,
  ]),
}).strict()

export const combinedUserSchema = userSchema.extend({
  userId: idSchema
})

