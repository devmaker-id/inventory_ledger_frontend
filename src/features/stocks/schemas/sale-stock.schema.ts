import { z } from 'zod'

export const saleStockSchema = z.object({
  retailId: z
    .number()
    .int()
    .min(1, 'Retail wajib dipilih'),

  productId: z
    .number()
    .int()
    .min(1, 'Produk wajib dipilih'),

  qty: z
    .number()
    .int()
    .min(1, 'Jumlah harus lebih dari 0'),

  salePrice: z
    .number()
    .int()
    .min(1, 'Harga jual harus lebih dari 0'),

  note: z
    .string()
    .trim()
    .optional(),
})

export type SaleStockSchema = z.infer<
  typeof saleStockSchema
>