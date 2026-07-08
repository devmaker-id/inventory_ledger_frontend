'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { useStockHistory } from '../hooks/use-stock-history'
import { stockTypeLabel } from '../utils/stock-type'
import { StockHistoryBadge } from '../utils/stock-history-badge'
import { useAuthStore } from '@/store/auth.store'

export function StockHistoryTable() {
  const currentUser = useAuthStore(
    (state) => state.user
  )
  const {
    data,
    isLoading,
  } = useStockHistory(currentUser?.id)

  const histories =
    data ?? []

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tanggal</TableHead>

          <TableHead>Tipe</TableHead>

          <TableHead>Produk</TableHead>

          <TableHead>Qty</TableHead>

          <TableHead>Dari</TableHead>

          <TableHead>Ke</TableHead>

          <TableHead>Catatan</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {histories.map(
          (history) => (
            <TableRow
              key={history.id}
            >
              <TableCell>
                {new Date(
                  history.createdAt,
                ).toLocaleString(
                  'id-ID',
                )}
              </TableCell>

              <TableCell>
                <StockHistoryBadge
                  type={stockTypeLabel(
                      history.type
                  )}
                />
              </TableCell>

              <TableCell>
                {
                  history.product
                    .name
                }
              </TableCell>

              <TableCell>
                {history.qty}
              </TableCell>

              <TableCell>
                {
                  history
                    .fromUser
                    .name
                }
              </TableCell>

              <TableCell>
                {history.toUser
                  ?.name ?? '-'}
              </TableCell>

              <TableCell>
                {history.note ??
                  '-'}
              </TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  )
}