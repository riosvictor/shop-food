import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import { ProductActions } from './ProductActions'
import { TProduct } from '../../../shared/types/product'

interface ProductTableProps {
  products: TProduct[]
  onEdit: (product: TProduct) => void
  onDelete: (id: string) => void
  onToggleAvailability: (product: TProduct) => void
}

export const ProductTable = ({ products, onEdit, onDelete, onToggleAvailability }: ProductTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Preço</TableHead>
          <TableHead>Disponível</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>R$ {product.price.toFixed(2)}</TableCell>
            <TableCell>
              <Switch checked={product.available} onCheckedChange={() => onToggleAvailability(product)} />
            </TableCell>
            <TableCell>
              <ProductActions product={product} onEdit={onEdit} onDelete={onDelete} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
