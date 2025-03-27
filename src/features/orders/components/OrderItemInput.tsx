import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TOrderItem } from '@/shared/types'

export const OrderItemInput = ({
  newItems,
  setNewItems,
  onOpenModal
}: {
  newItems: TOrderItem[]
  setNewItems: (items: TOrderItem[]) => void
  onOpenModal: () => void
}) => {
  const [itemName, setItemName] = useState('')

  const handleAddItemToList = () => {
    if (!itemName.trim()) return
    setNewItems([...newItems, { id: Date.now().toString(), name: itemName, status: 'pending' }])
    setItemName('')
  }

  return (
    <div className="flex flex-col gap-4 mb-4">
      <div className="flex gap-2">
        <Input value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder="Novo item" />
        <Button onClick={handleAddItemToList} disabled={!itemName.trim()}>
          Adicionar à Lista
        </Button>
      </div>

      {newItems.length > 0 && (
        <div className="mt-2 p-2 border rounded bg-gray-100">
          <p className="text-sm font-semibold mb-1">Itens pendentes:</p>
          <ul className="text-sm text-gray-700 list-disc ml-4">
            {newItems.map((item) => (
              <li key={item.id}>{item.name}</li>
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
