'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { SaleForm } from './sale-form'

type SaleDialogProps = {
  open: boolean
  onOpenChange: (
    open: boolean,
  ) => void
}

export function SaleDialog({
  open,
  onOpenChange,
}: SaleDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center">
            Poin Of Sales (POS)
          </DialogTitle>
        </DialogHeader>

        <SaleForm
          onSuccess={() =>
            onOpenChange(false)
          }
        />
      </DialogContent>
    </Dialog>
  )
}