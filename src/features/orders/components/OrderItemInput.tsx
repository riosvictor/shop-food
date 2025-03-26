import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const OrderItemInput = ({
  newItem,
  setNewItem,
  onAddItem
}: {
  newItem: string
  setNewItem: (value: string) => void
  onAddItem: () => void
}) => {
  return (
    <div className="flex gap-2 mb-4">
      <Input value={newItem} onChange={(e) => setNewItem(e.target.value)} placeholder="Novo item" />
      <Button onClick={onAddItem} disabled={!newItem.trim()}>
        Adicionar
      </Button>
    </div>
  )
}
