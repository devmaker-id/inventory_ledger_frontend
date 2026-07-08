import type { User } from '@/types/user'
import type { AuthUser } from '@/types/auth'

export function getTransferTargets(
  users: User[],
  currentUser: AuthUser,
) {
  switch (currentUser.role) {
    case 'OWNER':
      return users.filter(
        (user) =>
          user.role.name === 'DISTRIBUTOR',
      )

    case 'DISTRIBUTOR':
      return users.filter(
        (user) =>
          user.role.name === 'RETAIL' &&
          user.parentId === currentUser.id,
      )

    default:
      return []
  }
}