'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { useSales } from '../hooks/use-sales'
import { useAuthStore } from '@/store/auth.store'

export function SalesTable() {
  const currentUser = useAuthStore(
    (state) => state.user
  )
  const {
    data,
    isLoading,
  } = useSales(currentUser?.id)

  const sales = data ?? []

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (sales.length === 0) {
    return (
      <p className="text-muted-foreground text-center py-8">
        Belum ada data penjualan.
      </p>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tanggal</TableHead>

          <TableHead>Produk</TableHead>

          <TableHead>Retail</TableHead>

          <TableHead className="text-right">
            Qty
          </TableHead>

          <TableHead className="text-right">
            Harga
          </TableHead>

          <TableHead className="text-right">
            Total
          </TableHead>

          <TableHead>Catatan</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {sales.map((sale) => (
          <TableRow key={sale.id}>
            <TableCell>
              {new Date(
                sale.createdAt,
              ).toLocaleString('id-ID')}
            </TableCell>

            <TableCell>
              {sale.product.name}
            </TableCell>

            <TableCell>
              {sale.fromUser.name}
            </TableCell>

            <TableCell className="text-right">
              {sale.qty}
            </TableCell>

            <TableCell className="text-right">
              Rp{' '}
              {sale.salePrice?.toLocaleString(
                'id-ID',
              ) ?? '-'}
            </TableCell>

            <TableCell className="text-right font-medium">
              Rp{' '}
              {sale.totalPrice?.toLocaleString(
                'id-ID',
              ) ?? '-'}
            </TableCell>

            <TableCell>
              {sale.note ?? '-'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}