export type Stock = {
  id: number
  userId: number
  productId: number
  qty: number
  createdAt: string
  updatedAt: string

  product: {
    id: number
    name: string
    description: string | null
    basePrice: number
    image: string | null
    categoryId: number

    category: {
      id: number
      name: string
    }
  }
}

export type StockHistory = {
  id: number
  fromUserId: number
  toUserId: number | null

  productId: number

  qty: number

  salePrice: number | null
  totalPrice: number | null

  type: string

  note: string | null

  createdAt: string

  fromUser: {
    id: number
    name: string
    email: string
  }

  toUser: {
    id: number
    name: string
    email: string
  } | null

  product: {
    id: number
    name: string
    basePrice: number
  }
}

export type SaleHistory = {
  id: number
  fromUserId: number
  toUserId: number | null
  productId: number

  qty: number

  salePrice: number | null
  totalPrice: number | null

  type: string

  note: string | null

  createdAt: string

  fromUser: {
    id: number
    name: string
    email: string
  }

  product: {
    id: number
    name: string
    basePrice: number
  }
}
export interface Retail {
  id: number
  name: string
  email: string
  phone: string | null
  isActive: boolean
  parentId: number | null
}