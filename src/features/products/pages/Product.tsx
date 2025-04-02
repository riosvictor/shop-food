'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { TProduct, TProductForm } from '../../../shared/types/product'
import { useProducts } from '../hooks/useProducts'
import { ProductTable } from '../components/ProductTable'
import { ProductModal } from '../components/ProductModal'
import { ProductRepositoryFactory } from '../../../shared/repositories'

export const ProductsPage = () => {
  const { products, fetchProducts } = useProducts()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<TProductForm | null>(null)
  const productRepository = ProductRepositoryFactory.create()

  const openModal = (product?: TProductForm) => {
    setEditingProduct(product || null)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setEditingProduct(null)
    setIsModalOpen(false)
    fetchProducts()
  }

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm('Tem certeza que deseja excluir este produto?')
    if (!confirmDelete) return

    await productRepository.deleteProduct(id)
    fetchProducts()
  }

  const handleAvailability = async (product: TProduct) => {
    await productRepository.toggleProductAvailability(product)
    fetchProducts()
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Gerenciamento de Produtos</h1>

      <Button onClick={() => openModal()} className="mb-4">
        + Adicionar Produto
      </Button>

      <ProductTable
        products={products}
        onEdit={openModal}
        onDelete={handleDelete}
        onToggleAvailability={handleAvailability}
      />

      <ProductModal isOpen={isModalOpen} onClose={closeModal} editingProduct={editingProduct} />
    </div>
  )
}
