'use client'

import { FC, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type AddOrderModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: (owner: string) => void
}

export const AddOrderModal: FC<AddOrderModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [owner, setOwner] = useState('')

  const handleConfirm = () => {
    if (!owner.trim()) return
    onConfirm(owner.trim())
    setOwner('')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Pedido</DialogTitle>
        </DialogHeader>
        <Input type="text" placeholder="Nome do cliente" value={owner} onChange={(e) => setOwner(e.target.value)} />
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm}>Criar Pedido</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
