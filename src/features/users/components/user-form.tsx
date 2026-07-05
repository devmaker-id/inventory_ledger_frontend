'use client'

import { UseFormReturn } from 'react-hook-form'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Button } from '@/components/ui/button'

import { ROLES } from '@/lib/roles'

import type { CreateUserSchema } from '../schemas/create-user.schema'

type UserFormProps = {
  form: UseFormReturn<CreateUserSchema>
  loading?: boolean
  submitLabel?: string
  onSubmit: (values: CreateUserSchema) => void
}

const roleOptions = [
  {
    id: 1,
    label: ROLES.OWNER,
  },
  {
    id: 2,
    label: ROLES.DISTRIBUTOR,
  },
  {
    id: 3,
    label: ROLES.RETAIL,
  },
]

export function UserForm({
  form,
  loading = false,
  submitLabel = 'Simpan',
  onSubmit,
}: UserFormProps) {
  const roleId = form.watch('roleId')

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama</FormLabel>

              <FormControl>
                <Input
                  placeholder="Nama lengkap"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>

              <FormControl>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>

              <FormControl>
                <Input
                  type="password"
                  placeholder="Minimal 8 karakter"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>No. HP</FormLabel>

              <FormControl>
                <Input
                  placeholder="08123456789"
                  value={field.value ?? ''}
                  onChange={field.onChange}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alamat</FormLabel>

              <FormControl>
                <Input
                  placeholder="Alamat"
                  value={field.value ?? ''}
                  onChange={field.onChange}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="roleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>

              <Select
                value={
                  field.value
                    ? String(field.value)
                    : ''
                }
                onValueChange={(value) =>
                  field.onChange(Number(value))
                }
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Role" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {roleOptions.map((role) => (
                    <SelectItem
                      key={role.id}
                      value={String(role.id)}
                    >
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        {roleId === 3 && (
          <FormField
            control={form.control}
            name="parentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Distributor
                </FormLabel>

                <FormControl>
                  <Input
                    type="number"
                    placeholder="ID Distributor"
                    value={field.value ?? ''}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value
                          ? Number(
                              e.target.value,
                            )
                          : null,
                      )
                    }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex justify-end gap-2 border-t pt-4">
          <Button
            type="submit"
            disabled={loading}
          >
            {loading
              ? 'Menyimpan...'
              : submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  )
}