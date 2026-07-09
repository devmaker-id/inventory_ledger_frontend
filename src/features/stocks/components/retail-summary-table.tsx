'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import type { RetailSummary } from '../api/get-retail-summary'

type RetailSummaryTableProps = {
  data: RetailSummary[]
}

export function RetailSummaryTable({
  data,
}: RetailSummaryTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Retail</TableHead>
            <TableHead>Distributor</TableHead>
            <TableHead className="text-right">
              Transaksi
            </TableHead>
            <TableHead className="text-right">
              Qty
            </TableHead>
            <TableHead className="text-right">
              Omzet
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center h-24"
              >
                Belum ada data.
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item.retailId}>
                <TableCell className="font-medium">
                  {item.retailName}
                </TableCell>

                <TableCell>
                  {item.distributorName}
                </TableCell>

                <TableCell className="text-right">
                  {item.totalTransactions}
                </TableCell>

                <TableCell className="text-right">
                  {item.totalQty}
                </TableCell>

                <TableCell className="text-right font-semibold">
                  Rp{' '}
                  {item.totalRevenue.toLocaleString(
                    'id-ID',
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}