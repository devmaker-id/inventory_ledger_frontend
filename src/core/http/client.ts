import type {
  AxiosRequestConfig,
  Method,
} from 'axios'

import { axiosInstance } from './axios'
import { setupInterceptors } from './interceptor'
import type { ApiResponse } from './types'

setupInterceptors(axiosInstance)

class HttpClient {
  async request<T>(
    method: Method,
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response =
      await axiosInstance.request<
        ApiResponse<T>
      >({
        method,
        url,
        data,
        ...config,
      })

    return response.data.data
  }

  get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ) {
    return this.request<T>(
      'GET',
      url,
      undefined,
      config,
    )
  }

  post<T, B = unknown>(
    url: string,
    body: B,
    config?: AxiosRequestConfig,
  ) {
    return this.request<T>(
      'POST',
      url,
      body,
      config,
    )
  }

  patch<T, B = unknown>(
    url: string,
    body: B,
    config?: AxiosRequestConfig,
  ) {
    return this.request<T>(
      'PATCH',
      url,
      body,
      config,
    )
  }

  put<T, B = unknown>(
    url: string,
    body: B,
    config?: AxiosRequestConfig,
  ) {
    return this.request<T>(
      'PUT',
      url,
      body,
      config,
    )
  }

  delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ) {
    return this.request<T>(
      'DELETE',
      url,
      undefined,
      config,
    )
  }
}

export const http = new HttpClient()