import { z } from 'zod'

export const createUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Nama wajib diisi'),

  email: z
    .string()
    .trim()
    .email('Format email tidak valid'),

  password: z
    .string()
    .min(8, 'Password minimal 8 karakter'),

  phone: z
    .string()
    .trim()
    .optional(),

  address: z
    .string()
    .trim()
    .optional(),

  roleId: z
    .number()
    .int()
    .positive('Role wajib dipilih'),

  parentId: z
    .number()
    .int()
    .positive()
    .nullable()
    .optional(),
})

export type CreateUserSchema = z.infer<
  typeof createUserSchema
>