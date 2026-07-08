'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthStore } from '@/store/auth.store'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Textarea } from '@/components/ui/textarea'

import { useSaleStock } from '../hooks/use-sale-stock'
import { useRetails } from '../hooks/use-retails'

import {
  saleStockSchema,
  type SaleStockSchema,
} from '../schemas/sale-stock.schema'
import { useUserStocks } from '../hooks/use-user-stocks'

type SaleFormProps = {
  onSuccess?: () => void
}

export function SaleForm({
  onSuccess,
}: SaleFormProps) {
  const currentUser = useAuthStore(
    (state) => state.user,
  )
  const {
    data: retailsData
  } = useRetails(currentUser?.id)
  const retails = retailsData ?? []

  const form = useForm<SaleStockSchema>({
    resolver: zodResolver(
      saleStockSchema,
    ),

    defaultValues: {
      retailId: undefined,
      productId: undefined,
      qty: 1,
      salePrice: 0,
      note: '',
    },
  })

  const retailId = form.watch('retailId')

  const {
    data: stocksData,
  } = useUserStocks(retailId)

  const stocks = stocksData ?? []
  const hasStocks = stocks.length > 0

  const sale = useSaleStock()

  const productId = form.watch(
    'productId',
  )

  const selectedStock = stocks.find(
    (stock) =>
      stock.product.id ===
      productId,
  )

  useEffect(() => {
    form.resetField('productId')
    form.setValue('salePrice', 0)
  }, [retailId, form])
  useEffect(() => {
    if(!selectedStock) return
    form.setValue('salePrice', selectedStock.product.basePrice)
  }, [selectedStock, form])

  async function onSubmit(
    values: SaleStockSchema,
  ) {
    if (
      selectedStock &&
      values.qty > selectedStock.qty
    ) {
      form.setError('qty', {
        message: 'Jumlah melebihi stok.',
      })
      return
    }

    try {
      await sale.mutateAsync(values)
      form.reset()
      onSuccess?.()
    } catch {
      // handled by interceptor
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          onSubmit,
        )}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="retailId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Retail
              </FormLabel>

              <Select
                value={field.value?.toString() ?? ''}
                onValueChange={(value) => field.onChange(Number(value))}
              >
                <FormControl>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder="Pilih RETAIL" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent position="popper">
                  {retails.map((retail) => (
                    <SelectItem
                      key={retail.id}
                      value={String(retail.id)}
                    >
                      {retail.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="productId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Produk
              </FormLabel>

              <Select
                disabled={!retailId || !hasStocks}
                value={field.value?.toString() ?? ''}
                onValueChange={(value) => field.onChange(Number(value))}
              >
                <FormControl>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder={
                      !retailId
                      ? 'Pilih Retail terlebih dahulu'
                      : !hasStocks
                        ? 'Retail belum memiliki stok'
                        : 'Pilih Produk'
                    } />
                  </SelectTrigger>
                </FormControl>

                <SelectContent position="popper">
                  {hasStocks ? (
                    stocks.map((stock) => (
                      <SelectItem
                        key={stock.id}
                        value={String(stock.product.id)}
                      >
                        {stock.product.name} • Stok: {stock.qty}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="px-2 py-3 text-sm text-muted-foreground">
                      Retail belum memiliki produk.
                    </div>
                  )}
                </SelectContent>
              </Select>
              {retailId && !hasStocks && (
                <p className="text-sm text-muted-foreground">
                  <span className="text-red-500">
                    Retail ini belum memiliki stok sehingga belum dapat mencatat penjualan.
                  </span>
                </p>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="qty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Jumlah
              </FormLabel>

              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={selectedStock?.qty}
                  value={field.value}
                  onChange={(e) =>
                    field.onChange(Number(e.target.value))
                  }
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="salePrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Harga Jual
              </FormLabel>

              <FormControl>
                <Input
                  type="number"
                  min={0}
                  value={field.value}
                  onChange={(e) =>
                    field.onChange(Number(e.target.value))
                  }
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Catatan
              </FormLabel>

              <FormControl>
                <Textarea
                  {...field}
                  value={
                    field.value ??
                    ''
                  }
                  rows={3}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={
            sale.isPending ||
            !retailId ||
            !selectedStock
          }
        >
          {sale.isPending
            ? 'Menyimpan...'
            : 'Simpan Penjualan'}
        </Button>
      </form>
    </Form>
  )
}