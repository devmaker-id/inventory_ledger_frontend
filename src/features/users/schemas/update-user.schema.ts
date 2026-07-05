import { z } from 'zod'

import { userSchema } from './user.schema'

export const updateUserSchema = z.object({
  ...userSchema,
})

export type UpdateUserSchema = z.infer<
  typeof updateUserSchema
>