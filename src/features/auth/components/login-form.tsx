'use client'

import { useLogin } from '../hooks/use-login'

export function LoginForm() {
  const {
    email,
    password,
    loading,
    error,
    setEmail,
    setPassword,
    handleSubmit,
  } = useLogin()

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Inventory Ledger
          </h1>

          <p className="mt-2 text-muted-foreground">
            Login to continue
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2"
            />
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 p-3 text-sm text-red-500">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-black py-3 font-medium text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}