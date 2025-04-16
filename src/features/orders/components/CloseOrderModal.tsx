import { FC, useMemo } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { TOrderItem } from '@/shared/types'

interface CloseOrderModalProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  items: TOrderItem[]
  onConfirm: () => void
}

export const CloseOrderModal: FC<CloseOrderModalProps> = ({ isOpen, setIsOpen, items, onConfirm }) => {
  const total = useMemo(() => {
    return items.reduce((sum, item) => {
      const unit = item.price ?? 0
      const qty = item.quantity ?? 1
      return sum + unit * qty
    }, 0)
  }, [items])

  const getStatusColor = (status: TOrderItem['status']) => {
    switch (status) {
      case 'pending':
        return 'text-gray-500'
      case 'delivered':
        return 'text-green-600'
      default:
        return 'text-red-600'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Encerrar Pedido</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-gray-500">Nenhum item no pedido.</p>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => {
                const unit = item.price ?? 0
                const qty = item.quantity ?? 1
                const subtotal = unit * qty

                return (
                  <li key={item.id} className="border-b pb-2 text-sm flex justify-between items-start">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs">
                        Qtde: <span className="font-semibold">{qty}</span> • Status:{' '}
                        <span className={`capitalize font-medium ${getStatusColor(item.status)}`}>{item.status}</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        Valor unitário:{' '}
                        <span className="font-semibold">
                          {unit.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          })}
                        </span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {subtotal.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        <div className="mt-4 text-right font-semibold text-lg">
          Total:{' '}
          <span className="text-green-600">
            {total.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })}
          </span>
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <Button onClick={onConfirm} variant="destructive">
            Confirmar Encerramento
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
