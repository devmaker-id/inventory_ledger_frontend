'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'

import { UsersTable } from '../components/users-table'
import { CreateUserDialog } from '../components/create-user-dialog'
import { UpdateUserDialog } from '../components/update-user-dialog'

export function UsersPage() {
  const [createOpen, setCreateOpen] =
    useState(false)

  const [updateOpen, setUpdateOpen] =
    useState(false)

  const [selectedUserId, setSelectedUserId] =
    useState<number | null>(null)

  const handleEdit = (id: number) => {
    setSelectedUserId(id)
    setUpdateOpen(true)
  }

  const handleUpdateOpenChange = (
    open: boolean,
  ) => {
    setUpdateOpen(open)

    if (!open) {
      setSelectedUserId(null)
    }
  }

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

        <Button
          onClick={() =>
            setCreateOpen(true)
          }
        >
          Tambah User
        </Button>
      </div>

      <UsersTable
        onEdit={handleEdit}
      />

      <CreateUserDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
      />

      {selectedUserId !== null && (
        <UpdateUserDialog
          id={selectedUserId}
          open={updateOpen}
          onOpenChange={
            handleUpdateOpenChange
          }
        />
      )}
    </div>
  )
}