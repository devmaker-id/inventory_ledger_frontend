'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { useUsers } from '../hooks/use-users'

export function UsersTable() {
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
        </TableRow>
      </TableHeader>

      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>

            <TableCell>{user.email}</TableCell>

            <TableCell>
              {user.roleId}
            </TableCell>

            <TableCell>
              {user.isActive
                ? 'Aktif'
                : 'Nonaktif'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}