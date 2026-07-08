'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { useMyStocks } from '../hooks/use-my-stocks'

export function StocksTable() {
  const {
    data,
    isLoading,
  } = useMyStocks()

  const stocks = data ?? []

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Produk</TableHead>

          <TableHead>Kategori</TableHead>

          <TableHead>
            Harga Dasar
          </TableHead>

          <TableHead className="text-right">
            Stok
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {stocks.map((stock) => (
          <TableRow key={stock.id}>
            <TableCell>
              {stock.product.name}
            </TableCell>

            <TableCell>
              {stock.product.category.name}
            </TableCell>

            <TableCell>
              Rp{' '}
              {stock.product.basePrice.toLocaleString(
                'id-ID',
              )}
            </TableCell>

            <TableCell className="text-right">
              {stock.qty}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}