'use client'

import { Card } from '@/components/ui/card'

import { ReturnDialog } from '../components/return-dialog'
import { StockHistoryTable } from '../components/stock-history-table'

export function ReturnPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Return Stok
          </h1>

          <p className="text-muted-foreground">
            Kembalikan stok ke atasan sesuai
            role pengguna.
          </p>
        </div>

        <ReturnDialog />
      </div>

      <Card className="p-6">
        <h2 className="mb-4 text-lg font-semibold">
          Riwayat Stok
        </h2>

        <StockHistoryTable />
      </Card>
    </div>
  )
}