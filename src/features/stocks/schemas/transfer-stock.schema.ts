import { z } from 'zod'

export const transferStockSchema = z.object({
  toUserId: z
    .number()
    .int()
    .positive('Tujuan wajib dipilih'),

  productId: z
    .number()
    .int()
    .positive('Produk wajib dipilih'),

  qty: z
    .number()
    .int()
    .positive('Jumlah harus lebih dari 0'),

  note: z
    .string()
    .trim()
    .optional(),
})

export type TransferStockSchema = z.infer<
  typeof transferStockSchema
>