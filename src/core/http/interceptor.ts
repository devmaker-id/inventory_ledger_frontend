import type {
  AxiosError,
  AxiosInstance,
} from 'axios'

import { useAuthStore } from '@/store/auth.store'

import { ApiError } from './api-error'

export function setupInterceptors(
  instance: AxiosInstance,
) {
  instance.interceptors.request.use(
    (config) => {
      const token =
        useAuthStore.getState().token

      if (token) {
        config.headers.Authorization =
          `Bearer ${token}`
      }

      return config
    },
  )

  instance.interceptors.response.use(
    (response) => response,

    (error: AxiosError<any>) => {
      const status =
        error.response?.status ?? 500

      const message =
        error.response?.data?.message ??
        error.message ??
        'Internal Server Error'

      throw new ApiError(
        status,
        message,
        error.response?.data,
      )
    },
  )
}