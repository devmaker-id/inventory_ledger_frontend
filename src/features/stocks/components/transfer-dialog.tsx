'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { TransferForm } from './transfer-form'

type TransferDialogProps = {
  open: boolean
  onOpenChange: (
    open: boolean,
  ) => void
}

export function TransferDialog({
  open,
  onOpenChange,
}: TransferDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Transfer Stok
          </DialogTitle>
        </DialogHeader>

        <TransferForm
          onSuccess={() =>
            onOpenChange(false)
          }
        />
      </DialogContent>
    </Dialog>
  )
}