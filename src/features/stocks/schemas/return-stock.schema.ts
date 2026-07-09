import { z } from 'zod'

export const returnStockSchema = z.object({
  productId: z
    .number()
    .min(1, 'Produk wajib di isi'),

  qty: z
    .number()
    .min(
      1,
      'Jumlah minimal 1',
    ),

  note: z
    .string()
    .max(
      255,
      'Catatan maksimal 255 karakter',
    )
    .optional(),
})

export type ReturnStockSchema =
  z.infer<
    typeof returnStockSchema
  >