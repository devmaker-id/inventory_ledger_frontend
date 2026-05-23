'use client'

import {
  useEffect,
  useState,
} from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { createProduct } from '@/services/inventory.service'
import { getCategories } from '@/services/category.service'
import Swal from 'sweetalert2'


type Props = {
  onSuccess: () => void
}

type Category = {
  id: number
  name: string
}

export function CreateProductDialog({
  onSuccess,
}: Props) {
  const [categories, setCategories] =
  useState<Category[]>([])
  useEffect(() => {
    const fetchCategories =
        async () => {
        try {
            const data =
            await getCategories()

            setCategories(data)
        } catch (error) {
            console.error(error)
        }
        }

    fetchCategories()
    }, [])

  const [open, setOpen] =
    useState(false)

  const [loading, setLoading] =
    useState(false)

  const [name, setName] =
    useState('')

  const [
    description,
    setDescription,
  ] = useState('')

  const [
    basePrice,
    setBasePrice,
  ] = useState('')

  const [
    categoryId,
    setCategoryId,
  ] = useState('1')

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault()

    try {
      setLoading(true)

      await createProduct({
        name,
        description,
        basePrice:
          Number(basePrice),
        categoryId:
          Number(categoryId),
      })

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Product created successfully',
        })

      onSuccess()

      setOpen(false)

      setName('')
      setDescription('')
      setBasePrice('')
    } catch (error: any) {
      console.error(error)
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text:
            error?.response?.data
    ?.errors?.join(', ') ||
  error?.response?.data
    ?.message ||
  'Failed to create product'
        })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <button className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white">
          Add Product
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create Product
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              Name
            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value,
                )
              }
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Base Price
            </label>

            <input
              type="number"
              value={basePrice}
              onChange={(e) =>
                setBasePrice(
                  e.target.value,
                )
              }
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Category Name
            </label>

            <select
            value={categoryId}
            onChange={(e) =>
                setCategoryId(
                e.target.value,
                )
            }
            className="w-full rounded-xl border px-4 py-3"
            >
            <option value="">
                Select category
            </option>

            {categories.map((category) => (
                <option
                key={category.id}
                value={category.id}
                >
                {category.name}
                </option>
            ))}
            </select>
          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-black py-3 font-medium text-white"
          >
            {loading
              ? 'Creating...'
              : 'Create Product'}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  )
}