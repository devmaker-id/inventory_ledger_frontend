'use client'

import {
  Eye,
  Pencil,
  Trash2,
} from 'lucide-react'

import { Button } from '@/components/ui/button'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { useUsers } from '../hooks/use-users'

type UsersTableProps = {
  onEdit: (id: number) => void
}

export function UsersTable({
  onEdit,
}: UsersTableProps) {
  const {
    data,
    isLoading,
  } = useUsers()

  const users = data?.data ?? []

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nama</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-[140px]">
            Aksi
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              {user.name}
            </TableCell>

            <TableCell>
              {user.email}
            </TableCell>

            <TableCell>
              {user.role.name}
            </TableCell>

            <TableCell>
              {user.isActive
                ? 'Aktif'
                : 'Nonaktif'}
            </TableCell>

            <TableCell>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  title="Detail"
                >
                  <Eye className="size-4" />
                </Button>

                <Button
                  size="icon"
                  variant="outline"
                  title="Edit"
                  onClick={() =>
                    onEdit(user.id)
                  }
                >
                  <Pencil className="size-4" />
                </Button>

                <Button
                  size="icon"
                  variant="destructive"
                  title="Hapus"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}