'use client'

import { useQuery } from '@tanstack/react-query'

import { getMyStocks } from '../../stocks/api/get-my-stocks'

export function useMyStocks() {
  const response =  useQuery({
    queryKey: ['my-stocks'],
    queryFn: getMyStocks,
  })
  // console.log('stock', response.data)
  return response
}