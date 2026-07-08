'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import { useDeleteUser } from '../hooks/use-delete-user'

type DeleteUserDialogProps = {
  id: number
  open: boolean
  onOpenChange: (
    open: boolean,
  ) => void
}

export function DeleteUserDialog({
  id,
  open,
  onOpenChange,
}: DeleteUserDialogProps) {
  const deleteUser =
    useDeleteUser()

  const handleDelete =
    async () => {
      await deleteUser.mutateAsync(id)

      onOpenChange(false)
    }

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Hapus User
          </AlertDialogTitle>

          <AlertDialogDescription>
            User yang dihapus tidak
            dapat dikembalikan.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Batal
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={
              deleteUser.isPending
            }
          >
            {deleteUser.isPending
              ? 'Menghapus...'
              : 'Hapus'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}