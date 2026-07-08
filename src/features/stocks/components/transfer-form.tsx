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

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Textarea } from '@/components/ui/textarea'

import { useUsers } from '@/features/users/hooks/use-users'

import { useMyStocks } from '../hooks/use-my-stocks'
import { useTransferStock } from '../hooks/use-transfer-stock'

import {
  transferStockSchema,
  type TransferStockSchema,
} from '../schemas/transfer-stock.schema'
import { getTransferTargets } from '../utils/transfer-targets'
import { useAuthStore } from '@/store/auth.store'

type TransferFormProps = {
  onSuccess?: () => void
}

export function TransferForm({
  onSuccess,
}: TransferFormProps) {
  const form =
    useForm<TransferStockSchema>({
      resolver: zodResolver(
        transferStockSchema,
      ),

      defaultValues: {
        toUserId: undefined,
        productId: undefined,
        qty: 1,
        note: '',
      }
    })

  const {
    data: usersData,
  } = useUsers({})

  const {
    data: stocksData,
  } = useMyStocks()

  const transfer =
    useTransferStock()

  const currentUser = useAuthStore(
    (state) => state.user,
  )
  const users = usersData?.data ?? []
  const targets = currentUser
    ? getTransferTargets(
        users,
        currentUser,
    )
    : []

  const stocks = stocksData ?? []

  async function onSubmit(
    values: TransferStockSchema,
  ) {
    await transfer.mutateAsync(values)
    form.reset()
    onSuccess?.()
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
          name="toUserId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Tujuan
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
                    <SelectValue placeholder="Pilih tujuan" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {targets.map(
                    (user) => (
                      <SelectItem
                        key={
                          user.id
                        }
                        value={String(
                          user.id,
                        )}
                      >
                        {user.name}
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
                        {stock.product.name}{' '}
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
            transfer.isPending
          }
        >
          {transfer.isPending
            ? 'Mengirim...'
            : 'Transfer Stok'}
        </Button>
      </form>
    </Form>
  )
}