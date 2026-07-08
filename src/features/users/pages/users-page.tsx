'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { UsersTable } from '../components/users-table'
import { CreateUserDialog } from '../components/create-user-dialog'
import { UpdateUserDialog } from '../components/update-user-dialog'
import { UserDetailDialog } from '../components/user-detail-dialog'
import { DeleteUserDialog } from '../components/delete-user-dialog'

import { useDebounce } from '../hooks/use-debounce'

export function UsersPage() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)
  
  const [createOpen, setCreateOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [updateOpen, setUpdateOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  const handleEdit = (id: number) => {
    setSelectedUserId(id)
    setUpdateOpen(true)
  }
  const handleDetail = (id: number) => {
    setSelectedUserId(id)
    setDetailOpen(true)
  }
  const handleDelete = (id: number) => {
    setSelectedUserId(id)
    setDeleteOpen(true)
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

      <div className="flex items-center justify-between">
        <Input
          className="max-w-sm"
          placeholder="Cari nama atau email..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      <UsersTable
        search={debouncedSearch}
        onDetail={handleDetail}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CreateUserDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
      />

      {selectedUserId && (
        <UserDetailDialog
          id={selectedUserId}
          open={detailOpen}
          onOpenChange={(open) => {
            setDetailOpen(open)
            if(!open){
              setSelectedUserId(null)
            }
          }}
        />
      )}

      {selectedUserId && (
        <UpdateUserDialog
          id={selectedUserId}
          open={updateOpen}
          onOpenChange={(open) => {
            setUpdateOpen(open)
            if (!open) {
              setSelectedUserId(null)
            }
          }}
        />
      )}

      {selectedUserId && (
        <DeleteUserDialog
          id={selectedUserId}
          open={deleteOpen}
          onOpenChange={(open) => {
            setDeleteOpen(true)
            if(!open){
              setSelectedUserId(null)
            }
          }}
        />
      )}
    </div>
  )
}