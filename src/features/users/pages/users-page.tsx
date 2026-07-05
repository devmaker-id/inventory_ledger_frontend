'use client'

import { Button } from '@/components/ui/button'
import { UsersTable } from '../components/users-table'
import { useState } from 'react'
import { CreateUserDialog } from '../components/create-user-dialog'

export function UsersPage() {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Users
          </h1>

          <p className="text-muted-foreground">
            Kelola pengguna sistem.
          </p>
        </div>

        <Button onClick={() => setOpen(true)}>
          Tambah User
        </Button>
        <CreateUserDialog open={open} onOpenChange={setOpen} />
      </div>

      <UsersTable />
    </div>
  )
}