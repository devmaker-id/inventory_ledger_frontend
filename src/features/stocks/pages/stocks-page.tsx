'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'

import { StocksTable } from '../components/stocks-table'
import { TransferDialog } from '../components/transfer-dialog'
import { StockHistoryTable } from '../components/stock-history-table'

export function StocksPage() {
  const [transferOpen, setTransferOpen] =
    useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            My Stocks
          </h1>

          <p className="text-muted-foreground">
            Daftar stok yang Anda miliki.
          </p>
        </div>

        <Button
          onClick={() =>
            setTransferOpen(true)
          }
        >
          Transfer Stok
        </Button>
      </div>

      {/* Stock Saat Ini */}
      <StocksTable />

      {/* Riwayat Transaksi */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">
          Riwayat Stok
        </h2>

        <StockHistoryTable />
      </div>

      <TransferDialog
        open={transferOpen}
        onOpenChange={
          setTransferOpen
        }
      />
    </div>
  )
}