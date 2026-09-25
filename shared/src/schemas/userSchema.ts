import * as z from "zod"

export const idSchema = z.uuid()

export const userSchema = z.object({
  name: z.string(),
}).strict()

export const combinedUserSchema = userSchema.extend({
  userId: idSchema
})

