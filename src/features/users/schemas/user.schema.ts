import { z } from 'zod'

export const userSchema = {
  name: z
    .string()
    .trim()
    .min(1, 'Nama wajib diisi'),

  email: z
    .string()
    .trim()
    .email('Format email tidak valid'),

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
}