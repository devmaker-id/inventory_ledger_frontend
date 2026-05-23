'use client'

import {
  useEffect,
  useState,
} from 'react'

import { StatCard } from '@/components/dashboard/stat-card'

import {
  getSummary,
  getLowStock,
  getRecentTransactions,
} from '@/services/analytics.service'

type Summary = {
  totalInventory: number
  totalRetail: number
  totalDistributor: number
  totalTransactions: number
}

type LowStock = {
  id: number
  name: string
  stock: number
}

type Transaction = {
  id: number
  type: string
  quantity: number
  createdAt: string
}

export default function DashboardPage() {
  const [summary, setSummary] =
    useState<Summary | null>(null)

  const [lowStock, setLowStock] =
    useState<LowStock[]>([])

  const [
    transactions,
    setTransactions,
  ] = useState<Transaction[]>([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    const fetchDashboard =
      async () => {
        try {
          const [
            summaryData,
            lowStockData,
            transactionData,
          ] = await Promise.all([
            getSummary(),
            getLowStock(),
            getRecentTransactions(),
          ])

          setSummary(summaryData)

          setLowStock(lowStockData)

          setTransactions(
            transactionData,
          )
        } catch (error) {
          console.error(error)
        } finally {
          setLoading(false)
        }
      }

    fetchDashboard()
  }, [])

  if (loading) {
    return (
      <div>
        Loading dashboard...
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-muted-foreground">
          Overview inventory ledger
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Inventory"
          value={
            summary?.totalInventory ||
            0
          }
        />

        <StatCard
          title="Retail"
          value={
            summary?.totalRetail || 0
          }
        />

        <StatCard
          title="Distributor"
          value={
            summary?.totalDistributor ||
            0
          }
        />

        <StatCard
          title="Transactions"
          value={
            summary?.totalTransactions ||
            0
          }
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold">
            Low Stock
          </h2>

          <div className="space-y-4">
            {lowStock.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No low stock items
              </p>
            )}

            {lowStock.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl border p-4"
              >
                <div>
                  <p className="font-medium">
                    {item.name}
                  </p>
                </div>

                <div className="text-sm font-semibold text-red-500">
                  {item.stock}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold">
            Recent Transactions
          </h2>

          <div className="space-y-4">
            {transactions.length ===
              0 && (
              <p className="text-sm text-muted-foreground">
                No transactions
              </p>
            )}

            {transactions.map((trx) => (
              <div
                key={trx.id}
                className="flex items-center justify-between rounded-xl border p-4"
              >
                <div>
                  <p className="font-medium">
                    {trx.type}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {new Date(
                      trx.createdAt,
                    ).toLocaleString()}
                  </p>
                </div>

                <div className="font-semibold">
                  {trx.quantity}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}