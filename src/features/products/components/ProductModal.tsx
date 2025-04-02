'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { TProductForm } from '../../../shared/types/product'
import { ProductRepositoryFactory } from '../../../shared/repositories'

const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'O nome é obrigatório'),
  price: z.number().min(0, 'O preço deve ser positivo'),
  available: z.boolean()
})

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  editingProduct?: TProductForm | null
}

export const ProductModal = ({ isOpen, onClose, editingProduct }: ProductModalProps) => {
  const { register, handleSubmit, setValue, reset, watch } = useForm<TProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: { name: '', price: 0, available: true }
  })
  const productRepository = ProductRepositoryFactory.create()

  useEffect(() => {
    if (editingProduct) {
      setValue('id', editingProduct.id)
      setValue('name', editingProduct.name)
      setValue('price', editingProduct.price)
      setValue('available', editingProduct.available)
    } else {
      reset()
    }
  }, [editingProduct, setValue, reset])

  const onSubmit = async (data: TProductForm) => {
    await productRepository.upsertProduct(data)
    onClose()
    reset()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editingProduct ? 'Editar Produto' : 'Novo Produto'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input {...register('name')} placeholder="Nome do produto" autoComplete="off" />
          <Input {...register('price', { valueAsNumber: true })} type="number" step="0.01" placeholder="Preço" />
          <div className="flex items-center gap-2">
            <label>Disponível:</label>
            <Switch checked={watch('available')} onCheckedChange={(val) => setValue('available', val)} />
          </div>

          <DialogFooter>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">{editingProduct ? 'Salvar Alterações' : 'Adicionar'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
