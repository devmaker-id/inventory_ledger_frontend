'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import type { TopProduct } from '../api/get-top-products'

type Props = {
  data: TopProduct[]
}

export function TopProductsTable({
  data,
}: Props) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produk</TableHead>

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
                colSpan={4}
                className="h-24 text-center"
              >
                Belum ada data.
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item.productId}>
                <TableCell className="font-medium">
                  {item.productName}
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