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
  updateUserSchema,
  type UpdateUserSchema,
} from '../schemas/update-user.schema'

import { useUser } from '../hooks/use-user'
import { useUpdateUser } from '../hooks/use-update-user'

type UpdateUserDialogProps = {
  id: number
  open: boolean
  onOpenChange: (
    open: boolean,
  ) => void
}

export function UpdateUserDialog({
  id,
  open,
  onOpenChange,
}: UpdateUserDialogProps) {
  const { data: user } = useUser(id)

  const updateUser =
    useUpdateUser()

  const form =
    useForm<UpdateUserSchema>({
      resolver: zodResolver(
        updateUserSchema,
      ),
    })

  useEffect(() => {
    if (!user) return

    form.reset({
      name: user.name,
      email: user.email,
      phone: user.phone ?? '',
      address: user.address ?? '',
      roleId: user.roleId,
      parentId:
        user.parentId ?? null,
    })
  }, [user, form])

  const handleSubmit = async (
    values: UpdateUserSchema,
  ) => {
    await updateUser.mutateAsync({
      id,
      data: values,
    })

    form.reset()

    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            Update User
          </DialogTitle>
        </DialogHeader>

        <UserForm
          form={form}
          loading={
            updateUser.isPending
          }
          showPassword={false}
          submitLabel="Update"
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  )
}