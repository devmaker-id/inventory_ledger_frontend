'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { Card } from '@/components/ui/card'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { useSettlementDetail } from '../hooks/use-settlement-detail'

type SettlementDetailDialogProps = {
  distributorId: number
  open: boolean
  onOpenChange: (
    open: boolean,
  ) => void
}

export function SettlementDetailDialog({
  distributorId,
  open,
  onOpenChange,
}: SettlementDetailDialogProps) {
  const {
    data,
    isLoading,
  } = useSettlementDetail(
    distributorId,
  )

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="w-[95vw]
    max-w-5xl
    max-h-[90vh]
    overflow-y-auto
    p-4
    sm:p-6">
        <DialogHeader>
          <DialogTitle>
            Detail Settlement
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="py-10 text-center">
            Loading...
          </div>
        ) : data ? (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">
                {data.distributor.name}
              </h3>

              <p className="text-sm text-muted-foreground">
                Ringkasan settlement
                distributor
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
              <Card className="p-4">
                <p className="text-xs text-muted-foreground">
                  Transaksi
                </p>

                <p className="text-xl md:text-2xl font-bold">
                  {
                    data.summary
                      .totalTransactions
                  }
                </p>
              </Card>

              <Card className="p-4">
                <p className="text-xs text-muted-foreground">
                  Qty
                </p>

                <p className="text-xl md:text-2xl font-bold">
                  {
                    data.summary
                      .totalQty
                  }
                </p>
              </Card>

              <Card className="p-4">
                <p className="text-xs text-muted-foreground">
                  Omzet
                </p>

                <p className="text-lg font-bold">
                  Rp{' '}
                  {data.summary.totalRevenue.toLocaleString(
                    'id-ID',
                  )}
                </p>
              </Card>

              <Card className="p-4">
                <p className="text-xs text-muted-foreground">
                  Bagian Owner
                </p>

                <p className="text-lg font-bold">
                  Rp{' '}
                  {data.summary.ownerShare.toLocaleString(
                    'id-ID',
                  )}
                </p>
              </Card>

              <Card className="p-4">
                <p className="text-xs text-muted-foreground">
                  Bagian Distributor
                </p>

                <p className="text-lg font-bold">
                  Rp{' '}
                  {data.summary.distributorShare.toLocaleString(
                    'id-ID',
                  )}
                </p>
              </Card>
            </div>

            <div className="overflow-x-auto rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      Retail
                    </TableHead>

                    <TableHead>
                      Produk
                    </TableHead>

                    <TableHead className="text-right">
                      Qty
                    </TableHead>

                    <TableHead className="text-right">
                      Harga
                    </TableHead>

                    <TableHead className="text-right">
                      Total
                    </TableHead>

                    <TableHead>
                      Tanggal
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {data.transactions
                    .length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="h-24 text-center"
                      >
                        Tidak ada
                        transaksi.
                      </TableCell>
                    </TableRow>
                  ) : (
                    data.transactions.map(
                      (
                        transaction,
                      ) => (
                        <TableRow
                          key={
                            transaction.id
                          }
                        >
                          <TableCell>
                            {
                              transaction.retailName
                            }
                          </TableCell>

                          <TableCell>
                            {
                              transaction.productName
                            }
                          </TableCell>

                          <TableCell className="text-right">
                            {
                              transaction.qty
                            }
                          </TableCell>

                          <TableCell className="text-right">
                            Rp{' '}
                            {transaction.salePrice.toLocaleString(
                              'id-ID',
                            )}
                          </TableCell>

                          <TableCell className="text-right font-medium">
                            Rp{' '}
                            {transaction.totalPrice.toLocaleString(
                              'id-ID',
                            )}
                          </TableCell>

                          <TableCell>
                            {new Date(
                              transaction.createdAt,
                            ).toLocaleDateString(
                              'id-ID',
                            )}
                          </TableCell>
                        </TableRow>
                      ),
                    )
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        ) : (
          <div className="py-10 text-center">
            Data tidak ditemukan.
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}