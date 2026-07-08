import { Badge } from '@/components/ui/badge'

type StockHistoryBadgeProps = {
  type: string
}

export function StockHistoryBadge({
  type,
}: StockHistoryBadgeProps) {
  switch (type) {
    case 'DISTRIBUTION':
      return (
        <Badge variant="default">
          Transfer
        </Badge>
      )

    case 'SALE':
      return (
        <Badge variant="secondary">
          Penjualan
        </Badge>
      )

    case 'RETURN':
      return (
        <Badge
          variant="outline"
        >
          Retur
        </Badge>
      )

    case 'ADJUSTMENT':
      return (
        <Badge
          variant="destructive"
        >
          Penyesuaian
        </Badge>
      )

    default:
      return (
        <Badge
          variant="outline"
        >
          {type}
        </Badge>
      )
  }
}