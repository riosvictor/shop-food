import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TOrderItem } from '../../../shared/types'
import { useProducts } from '../../products/hooks/useProducts'

export const OrderItemInput = ({
  newItems,
  setNewItems,
  onOpenModal
}: {
  newItems: TOrderItem[]
  setNewItems: (items: TOrderItem[]) => void
  onOpenModal: () => void
}) => {
  const products = useProducts()
  const [selectedProductId, setSelectedProductId] = useState('')
  const [quantity, setQuantity] = useState(1)

  const handleAddItemToList = () => {
    if (!selectedProductId) return

    const product = products.find((p) => p.id === selectedProductId)
    if (!product) return

    setNewItems([
      ...newItems,
      { id: product.id, name: product.name, price: product.price, quantity, status: 'pending' }
    ])
    setSelectedProductId('')
    setQuantity(1)
  }

  return (
    <div className="flex flex-col gap-4 mb-4">
      <div className="flex gap-2">
        <Select onValueChange={setSelectedProductId} value={selectedProductId}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione um produto" />
          </SelectTrigger>
          <SelectContent>
            {products.map((product) => (
              <SelectItem key={product.id} value={product.id}>
                {product.name} - R$ {product.price.toFixed(2)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="number"
          value={quantity}
          min={1}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-20"
          placeholder="Qtd"
        />

        <Button onClick={handleAddItemToList} disabled={!selectedProductId}>
          Adicionar
        </Button>
      </div>

      {newItems.length > 0 && (
        <div className="mt-2 p-2 border rounded bg-gray-100">
          <p className="text-sm font-semibold mb-1">Itens pendentes:</p>
          <ul className="text-sm text-gray-700 list-disc ml-4">
            {newItems.map((item) => (
              <li key={item.id}>
                {item.quantity}x {item.name} - R$ {(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {newItems.length > 0 && (
        <Button onClick={onOpenModal} className="mt-2">
          Confirmar Itens ({newItems.length})
        </Button>
      )}
    </div>
  )
}
