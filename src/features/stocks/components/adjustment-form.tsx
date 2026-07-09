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

import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group'

import { Label } from '@/components/ui/label'

import { Textarea } from '@/components/ui/textarea'

import { useMyStocks } from '../hooks/use-my-stocks'
import { useAdjustmentStock } from '../hooks/use-adjustment-stock'

import {
  adjustmentStockSchema,
  type AdjustmentStockSchema,
} from '../schemas/adjustment-stock.schema'

type AdjustmentFormProps = {
  onSuccess?: () => void
}

export function AdjustmentForm({
  onSuccess,
}: AdjustmentFormProps) {
  const form =
    useForm<AdjustmentStockSchema>({
      resolver: zodResolver(
        adjustmentStockSchema,
      ),

      defaultValues: {
        productId: undefined,
        qty: 1,
        type: 'IN',
        note: '',
      },
    })

  const {
    data: stocksData,
  } = useMyStocks()

  const stocks = stocksData ?? []

  const productId =
    form.watch('productId')

  const type =
    form.watch('type')

  const selectedStock =
    stocks.find(
      (stock) =>
        stock.product.id ===
        productId,
    )

  const adjustment =
    useAdjustmentStock()

  async function onSubmit(
    values: AdjustmentStockSchema,
  ) {
    if (
      type === 'OUT' &&
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
      await adjustment.mutateAsync(
        values,
      )

      form.reset({
        productId: undefined,
        qty: 1,
        type: 'IN',
        note: '',
      })

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
        className="space-y-5"
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
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih produk" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
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
                        • Stok:{' '}
                        {stock.qty}
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
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Jenis Adjustment
              </FormLabel>

              <FormControl>
                <RadioGroup
                  value={
                    field.value
                  }
                  onValueChange={
                    field.onChange
                  }
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="IN"
                      id="in"
                    />

                    <Label htmlFor="in">
                      Tambah
                      Stok
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="OUT"
                      id="out"
                    />

                    <Label htmlFor="out">
                      Kurangi
                      Stok
                    </Label>
                  </div>
                </RadioGroup>
              </FormControl>

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
                    type ===
                    'OUT'
                      ? selectedStock?.qty
                      : undefined
                  }
                  {...field}
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
                  rows={3}
                  {...field}
                  value={
                    field.value ??
                    ''
                  }
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
            adjustment.isPending
          }
        >
          {adjustment.isPending
            ? 'Menyimpan...'
            : 'Simpan Adjustment'}
        </Button>
      </form>
    </Form>
  )
}