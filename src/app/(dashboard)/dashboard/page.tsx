'use client'

import {
  useEffect,
  useState,
} from 'react'

import { StatCard } from '@/components/dashboard/stat-card'

import { getDashboardStats } from '@/services/dashboard.service'

type DashboardStats = {
  totalInventory: number
  totalRetail: number
  totalDistributor: number
  totalTransactions: number
}

export default function DashboardPage() {
  const [stats, setStats] =
    useState<DashboardStats | null>(
      null,
    )

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data =
          await getDashboardStats()

        setStats(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
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
          title="Total Inventory"
          value={
            stats?.totalInventory || 0
          }
          description="Registered products"
        />

        <StatCard
          title="Total Retail"
          value={
            stats?.totalRetail || 0
          }
          description="Active retail stores"
        />

        <StatCard
          title="Total Distributor"
          value={
            stats?.totalDistributor || 0
          }
          description="Registered distributors"
        />

        <StatCard
          title="Transactions"
          value={
            stats?.totalTransactions ||
            0
          }
          description="This month"
        />
      </div>
    </div>
  )
}