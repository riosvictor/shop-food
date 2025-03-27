import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import { TProduct } from '../../../shared/types/product'

interface ProductActionsProps {
  product: TProduct
  onEdit: (product: TProduct) => void
  onDelete: (id: string) => void
}

export const ProductActions = ({ product, onEdit, onDelete }: ProductActionsProps) => {
  return (
    <div className="flex gap-2">
      <Button size="sm" variant="outline" onClick={() => onEdit(product)}>
        <Pencil size={16} />
      </Button>
      <Button size="sm" variant="destructive" onClick={() => onDelete(product.id)}>
        <Trash2 size={16} />
      </Button>
    </div>
  )
}
