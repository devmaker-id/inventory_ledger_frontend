'use client'

import { Card } from '@/components/ui/card'

import { useSalesSummary } from '../hooks/use-sales-summary'
import { useRetailSummary } from '../hooks/use-retail-summary'
import { useTopProducts } from '../hooks/use-top-products'

import { RetailSummaryTable } from '../components/retail-summary-table'
import { TopProductsTable } from '../components/top-products-table'

export function SummaryPage() {
  const { data: sales } =
    useSalesSummary()

  const { data: retails } =
    useRetailSummary()

  const { data: products } =
    useTopProducts()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Dashboard Penjualan
        </h1>

        <p className="text-muted-foreground">
          Ringkasan penjualan distributor dan retail.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">
            Total Transaksi
          </p>

          <p className="mt-2 text-3xl font-bold">
            {sales?.totalTransactions ?? 0}
          </p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-muted-foreground">
            Total Qty
          </p>

          <p className="mt-2 text-3xl font-bold">
            {sales?.totalQty ?? 0}
          </p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-muted-foreground">
            Total Omzet
          </p>

          <p className="mt-2 text-3xl font-bold">
            Rp{' '}
            {(sales?.totalRevenue ?? 0).toLocaleString(
              'id-ID',
            )}
          </p>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="mb-4 text-lg font-semibold">
          Ringkasan Retail
        </h2>

        <RetailSummaryTable
          data={retails ?? []}
        />
      </Card>

      <Card className="p-6">
        <h2 className="mb-4 text-lg font-semibold">
          Produk Terlaris
        </h2>

        <TopProductsTable
          data={products ?? []}
        />
      </Card>
    </div>
  )
}