import { z } from 'zod'

export const adjustmentStockSchema =
  z.object({
    productId: z
      .number()
      .positive('Produk wajib dipilih'),

    qty: z
      .number()
      .min(1, 'Jumlah minimal 1'),

    type: z.enum([
      'IN',
      'OUT',
    ]),

    note: z
      .string()
      .max(
        255,
        'Catatan maksimal 255 karakter',
      )
      .optional(),
  })

export type AdjustmentStockSchema =
  z.infer<
    typeof adjustmentStockSchema
  >