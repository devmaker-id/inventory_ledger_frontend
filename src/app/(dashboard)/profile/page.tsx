'use client'

import {
  useEffect,
  useState,
} from 'react'

import { getProfile } from '@/services/auth.service'

export default function ProfilePage() {
  const [profile, setProfile] =
    useState<any>(null)

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data =
          await getProfile()

        setProfile(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (loading) {
    return (
      <div className="p-6">
        Loading profile...
      </div>
    )
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Profile
        </h1>

        <p className="text-muted-foreground">
          Your account information
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-6">
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground">
              Name
            </p>

            <h2 className="text-lg font-semibold">
              {profile.name}
            </h2>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Email
            </p>

            <h2 className="text-lg font-semibold">
              {profile.email}
            </h2>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Role
            </p>

            <h2 className="text-lg font-semibold">
              {profile.role}
            </h2>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Parent ID
            </p>

            <h2 className="text-lg font-semibold">
              {profile.parentId || '-'}
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}