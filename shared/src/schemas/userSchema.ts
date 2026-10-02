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

export const UserWithIdSchema = userSchema.extend({
  userId: idSchema
})

export const UserWithIdArraySchema = z.array(UserWithIdSchema)

export const dbUserArraySchema = z.array(dbUserSchema)

