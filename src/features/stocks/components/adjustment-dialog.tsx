'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { AdjustmentForm } from './adjustment-form'

export function AdjustmentDialog() {
  const [open, setOpen] =
    useState(false)

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button>
          Adjustment Stok
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Adjustment Stok
          </DialogTitle>
        </DialogHeader>

        <AdjustmentForm
          onSuccess={() =>
            setOpen(false)
          }
        />
      </DialogContent>
    </Dialog>
  )
}