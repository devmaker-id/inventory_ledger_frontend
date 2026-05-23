import { api } from '@/lib/api/axios'

export async function getProducts() {
  const response = await api.get(
    '/products',
  )
  return response.data
}

export async function createProduct(
  body: {
    name: string
    description: string
    basePrice: number
    categoryId: number
  },
) {
  const response = await api.post(
    '/products',
    body,
  )

  return response.data
}