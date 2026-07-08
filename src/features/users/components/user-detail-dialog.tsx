'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { useUser } from '../hooks/use-user'

type UserDetailDialogProps = {
  id: number
  open: boolean
  onOpenChange: (
    open: boolean,
  ) => void
}

export function UserDetailDialog({
  id,
  open,
  onOpenChange,
}: UserDetailDialogProps) {
  const {
    data: user,
    isLoading,
  } = useUser(id)

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Detail User
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-4">
            <DetailRow
              label="Nama"
              value={user?.name}
            />

            <DetailRow
              label="Email"
              value={user?.email}
            />

            <DetailRow
              label="Role"
              value={user?.role?.name}
            />

            <DetailRow
              label="No. HP"
              value={user?.phone}
            />

            <DetailRow
              label="Alamat"
              value={user?.address}
            />

            <DetailRow
              label="Status"
              value={
                user?.isActive
                  ? 'Aktif'
                  : 'Nonaktif'
              }
            />

            <DetailRow
              label="Parent"
              value={
                user?.parentId
                  ? String(user.parentId)
                  : '-'
              }
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

type DetailRowProps = {
  label: string
  value?: string | null
}

function DetailRow({
  label,
  value,
}: DetailRowProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="font-medium">
        {label}
      </div>

      <div className="col-span-2">
        {value || '-'}
      </div>
    </div>
  )
}