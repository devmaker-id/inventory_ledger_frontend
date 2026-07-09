'use client'

import { Eye } from 'lucide-react'

import { Button } from '@/components/ui/button'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import type {
  SettlementReport,
} from '../api/get-settlement-report'

type SettlementTableProps = {
  data: SettlementReport[]
  onDetail: (
    distributorId: number,
  ) => void
}

export function SettlementTable({
  data,
  onDetail,
}: SettlementTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              Distributor
            </TableHead>

            <TableHead className="text-right">
              Transaksi
            </TableHead>

            <TableHead className="text-right">
              Qty
            </TableHead>

            <TableHead className="text-right">
              Omzet
            </TableHead>

            <TableHead className="text-right">
              Bagian Owner
            </TableHead>

            <TableHead className="text-right">
              Bagian Distributor
            </TableHead>

            <TableHead className="w-16 text-center">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="h-24 text-center"
              >
                Belum ada data.
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow
                key={item.distributorId}
              >
                <TableCell className="font-medium">
                  {item.distributorName}
                </TableCell>

                <TableCell className="text-right">
                  {item.totalTransactions}
                </TableCell>

                <TableCell className="text-right">
                  {item.totalQty}
                </TableCell>

                <TableCell className="text-right">
                  Rp{' '}
                  {item.totalRevenue.toLocaleString(
                    'id-ID',
                  )}
                </TableCell>

                <TableCell className="text-right font-medium">
                  Rp{' '}
                  {item.ownerShare.toLocaleString(
                    'id-ID',
                  )}
                </TableCell>

                <TableCell className="text-right font-medium">
                  Rp{' '}
                  {item.distributorShare.toLocaleString(
                    'id-ID',
                  )}
                </TableCell>

                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      onDetail(
                        item.distributorId,
                      )
                    }
                  >
                    <Eye className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}