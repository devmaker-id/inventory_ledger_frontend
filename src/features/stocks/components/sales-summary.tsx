'use client'

import { StatCard } from '@/components/dashboard/stat-card'

import { useSalesSummary } from '../hooks/use-sales-summary'
import { useAuthStore } from '@/store/auth.store'

export function SalesSummary() {
  const currentUser = useAuthStore(
    (state) => state.user
  )
  const {
    data,
    isLoading,
  } = useSalesSummary()

  const summary = data

  if (isLoading || !summary) {
    return null
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        title="Total Transaksi"
        value={summary.totalTransactions}
      />

      <StatCard
        title="Qty Terjual"
        value={summary.totalQty}
      />

      <StatCard
        title="Revenue"
        value={new Intl.NumberFormat(
          'id-ID',
          {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
          },
        ).format(summary.totalRevenue)}
      />
    </div>
  )
}