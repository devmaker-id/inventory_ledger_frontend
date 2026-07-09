'use client'

import { useState } from 'react'

import { Card } from '@/components/ui/card'

import { useSettlementReport } from '../hooks/use-settlement-report'

import { SettlementTable } from '../components/settlement-table'
import { SettlementDetailDialog } from '../components/settlement-detail-dialog'

export function SettlementPage() {
  const {
    data,
    isLoading,
  } = useSettlementReport()

  const [
    selectedDistributorId,
    setSelectedDistributorId,
  ] = useState<number | null>(null)

  const [
    detailOpen,
    setDetailOpen,
  ] = useState(false)

  function handleDetail(
    distributorId: number,
  ) {
    setSelectedDistributorId(
      distributorId,
    )
    setDetailOpen(true)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        Loading...
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">
            Settlement Report
          </h1>

          <p className="text-muted-foreground">
            Laporan pembagian hasil
            distributor.
          </p>
        </div>

        <Card className="p-6">
          <SettlementTable
            data={data ?? []}
            onDetail={handleDetail}
          />
        </Card>
      </div>

      {selectedDistributorId && (
        <SettlementDetailDialog
          distributorId={
            selectedDistributorId
          }
          open={detailOpen}
          onOpenChange={(open) => {
            setDetailOpen(open)

            if (!open) {
              setSelectedDistributorId(
                null,
              )
            }
          }}
        />
      )}
    </>
  )
}