import { FC } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { TOrderItem } from '@/shared/types'

interface ConfirmOrderModalProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  newItems: TOrderItem[]
  onConfirm: () => void
}

export const ConfirmOrderModal: FC<ConfirmOrderModalProps> = ({ isOpen, setIsOpen, newItems, onConfirm }) => (
  <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Confirmar Novos Itens</DialogTitle>
      </DialogHeader>

      <div className="space-y-2">
        {newItems.length === 0 ? (
          <p className="text-gray-500">Nenhum item pendente.</p>
        ) : (
          <ul className="space-y-1">
            {newItems.map((item) => (
              <li key={item.id} className="flex justify-between border-b pb-1">
                <span>{item.name}</span>
                <span className="text-sm text-gray-500 capitalize">({item.status})</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="secondary">Cancelar</Button>
        </DialogClose>
        <Button onClick={onConfirm} disabled={newItems.length === 0}>
          Confirmar
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)
