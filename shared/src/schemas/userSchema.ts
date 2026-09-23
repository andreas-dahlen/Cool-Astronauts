import * as z from "zod"

export const userSchema = z.object({
  name: z.string()
}).strict()

export const userIdSchema = z.object({
  userId: z.number().int().min(0)
}).strict()

export const combinedUserSchema = userSchema.extend(userIdSchema.shape)