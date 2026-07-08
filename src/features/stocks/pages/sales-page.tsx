'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'

import { SaleDialog } from '../components/sale-dialog'
import { SalesSummary } from '../components/sales-summary'
import { SalesTable } from '../components/sales-table'

export function SalesPage() {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Penjualan
          </h1>

          <p className="text-muted-foreground">
            Kelola transaksi penjualan produk.
          </p>
        </div>

        <Button onClick={() => setOpen(true)}>
          Tambah Penjualan
        </Button>
      </div>

      <SalesSummary />

      <SalesTable />

      <SaleDialog
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  )
}