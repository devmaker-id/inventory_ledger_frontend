'use client'

import {
  useEffect,
  useState,
} from 'react'

import { getProducts } from '@/services/inventory.service'
import { CreateProductDialog } from '@/components/inventory/create-product-dialog'

type Product = {
  id: number
  name: string
  description: string
  basePrice: number
  image: string | null

  category: {
    id: number
    name: string
  }

  creator: {
    id: number
    name: string
    email: string
  }
}

export default function InventoryPage() {
  const [products, setProducts] =
  useState<Product[]>([])

  const [loading, setLoading] =
    useState(true)

    const fetchProducts =
    async () => {
      try {
        const response =
          await getProducts()

        setProducts(
          response.data || [],
        )
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

  useEffect(() => {
    fetchProducts()
    const fetchInventories =
      async () => {
        try {
         const response = await getProducts()
          setProducts(response.data || [])
        } catch (error) {
          console.error(error)
        } finally {
          setLoading(false)
        }
      }

    fetchInventories()
  }, [])

  if (loading) {
    return (
      <div>
        Loading inventory...
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Inventory
        </h1>

        <p className="text-muted-foreground">
          Manage inventory products
        </p>
      </div>

      <CreateProductDialog
        onSuccess={fetchProducts}
      />

      <div className="overflow-hidden rounded-2xl border bg-white">
        <table className="w-full">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Product
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Category
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Price
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Creator
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b last:border-0"
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium">
                      {product.name}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {product.description}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-4">
                  {product.category.name}
                </td>

                <td className="px-6 py-4">
                  Rp{' '}
                  {product.basePrice.toLocaleString()}
                </td>

                <td className="px-6 py-4">
                  {product.creator.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="p-8 text-center text-sm text-muted-foreground">
            No inventory found
          </div>
        )}
      </div>
    </div>
  )
}