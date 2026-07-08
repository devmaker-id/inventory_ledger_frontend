export function stockTypeLabel(
  type: string,
) {
  switch (type) {
    case 'DISTRIBUTION':
      return 'Transfer'

    case 'SALE':
      return 'Penjualan'

    case 'RETURN':
      return 'Retur'

    case 'ADJUSTMENT':
      return 'Penyesuaian'

    default:
      return type
  }
}