'use client'

import { useQuery } from '@tanstack/react-query'

import { getSalesSummary } from '../api/get-sales-summary'

export function useSalesSummary() {
  return useQuery({
    queryKey: ['sales-summary'],
    queryFn: getSalesSummary,
  })
}