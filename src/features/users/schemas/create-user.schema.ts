import { z } from 'zod'

import { userSchema } from './user.schema'

export const createUserSchema = z.object({
  ...userSchema,

  password: z
    .string()
    .min(
      8,
      'Password minimal 8 karakter',
    ),
})

export type CreateUserSchema = z.infer<
  typeof createUserSchema
>