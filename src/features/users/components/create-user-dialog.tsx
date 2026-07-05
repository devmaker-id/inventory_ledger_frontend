'use client'

import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { UserForm } from './user-form'

import {
  createUserSchema,
  type CreateUserSchema,
} from '../schemas/create-user.schema'

import { useCreateUser } from '../hooks/use-create-user'

type CreateUserDialogProps = {
  open: boolean
  onOpenChange: (
    open: boolean,
  ) => void
}

export function CreateUserDialog({
  open,
  onOpenChange,
}: CreateUserDialogProps) {
  const createUser =
    useCreateUser()

  const form =
    useForm<CreateUserSchema>({
      resolver: zodResolver(
        createUserSchema,
      ),
      defaultValues: {
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        roleId: 0,
        parentId: null,
      },
    })

  const handleSubmit = async (
    values: CreateUserSchema,
  ) => {
    await createUser.mutateAsync(values)
  }

  useEffect(() => {
    if (!createUser.isSuccess) {
      return
    }

    form.reset()

    onOpenChange(false)
  }, [
    createUser.isSuccess,
    form,
    onOpenChange,
  ])

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            Tambah User
          </DialogTitle>
        </DialogHeader>

        <UserForm
          form={form}
          loading={
            createUser.isPending
          }
          submitLabel="Simpan"
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  )
}