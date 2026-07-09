'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

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

import { useMyStocks } from '../hooks/use-my-stocks'
import { useReturnStock } from '../hooks/use-return-stock'

import {
  returnStockSchema,
  type ReturnStockSchema,
} from '../schemas/return-stock.schema'

type ReturnFormProps = {
  onSuccess?: () => void
}

export function ReturnForm({
  onSuccess,
}: ReturnFormProps) {
  const form =
    useForm<ReturnStockSchema>({
      resolver: zodResolver(
        returnStockSchema,
      ),

      defaultValues: {
        productId: undefined,
        qty: 1,
        note: '',
      },
    })

  const {
    data: stocksData,
  } = useMyStocks()

  const stocks = stocksData ?? []

  const productId = form.watch(
    'productId',
  )

  const selectedStock =
    stocks.find(
      (stock) =>
        stock.product.id ===
        productId,
    )

  const mutation =
    useReturnStock()

  async function onSubmit(
    values: ReturnStockSchema,
  ) {
    if (
      selectedStock &&
      values.qty >
        selectedStock.qty
    ) {
      form.setError('qty', {
        message:
          'Jumlah melebihi stok.',
      })

      return
    }

    try {
      await mutation.mutateAsync(
        values,
      )

      form.reset()

      onSuccess?.()
    } catch {
      // handled globally
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
          name="productId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Produk
              </FormLabel>

              <Select
                value={
                  field.value
                    ? String(
                        field.value,
                      )
                    : ''
                }
                onValueChange={(
                  value,
                ) =>
                  field.onChange(
                    Number(value),
                  )
                }
              >
                <FormControl>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder="Pilih produk" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent position="popper">
                  {stocks.map(
                    (stock) => (
                      <SelectItem
                        key={
                          stock.product.id
                        }
                        value={String(
                          stock.product
                            .id,
                        )}
                      >
                        {stock.product.name}
                        {' '}
                        (
                        {stock.qty})
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>

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
                  max={
                    selectedStock?.qty
                  }
                  value={
                    field.value
                  }
                  onChange={(
                    e,
                  ) =>
                    field.onChange(
                      Number(
                        e.target
                          .value,
                      ),
                    )
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
            mutation.isPending
          }
        >
          {mutation.isPending
            ? 'Memproses...'
            : 'Return Stok'}
        </Button>
      </form>
    </Form>
  )
}