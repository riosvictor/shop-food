'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TOrderItem } from '../../../shared/types'
import { useProducts } from '../../products/hooks/useProducts'
import { Combobox } from '../../../shared/components/Combobox'
import { X } from 'lucide-react'

export const OrderItemInput = ({
  newItems,
  setNewItems,
  onOpenModal
}: {
  newItems: TOrderItem[]
  setNewItems: (items: TOrderItem[]) => void
  onOpenModal: () => void
}) => {
  const { availableProducts } = useProducts()
  const [selectedProductId, setSelectedProductId] = useState('')
  const [quantity, setQuantity] = useState(1)

  const handleAddItemToList = () => {
    if (!selectedProductId) return

    const product = availableProducts.find((p) => p.id === selectedProductId)
    if (!product) return
    const addItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      status: 'pending'
    } as TOrderItem

    setNewItems([...newItems, addItem])
    setSelectedProductId('')
    setQuantity(1)
  }

  return (
    <div className="flex flex-col gap-4 mb-4">
      <div className="flex gap-2">
        {/* Usando o componente Combobox */}
        <Combobox
          searchPlaceholder="Pesquisar produto"
          selectPlaceholder="Selecione um produto"
          items={availableProducts.map((product) => ({
            value: product.id,
            label: `${product.name} - R$ ${product.price.toFixed(2)}`
          }))}
          selectedValue={selectedProductId}
          onSelectValue={setSelectedProductId}
        />

        {/* Input de quantidade */}
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

      {/* Exibição de itens pendentes */}
      {newItems.length > 0 && (
        <div className="mt-2 p-2 border rounded bg-gray-100">
          <p className="text-sm font-semibold mb-1">Itens pendentes:</p>
          <ul className="text-sm text-gray-700 list-disc ml-4">
            {newItems.map((item, index) => (
              <li key={item.id} className="flex justify-between items-center">
                <span>
                  {item.quantity}x {item.name} - R$ {(item.price * item.quantity).toFixed(2)}
                </span>
                <button
                  onClick={() => setNewItems(newItems.filter((_, i) => i !== index))}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </button>
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

export default OrderItemInput
