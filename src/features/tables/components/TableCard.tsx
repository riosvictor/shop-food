import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TOrderAdd, TTable } from '@/shared/types'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { AddOrderModal } from '@/features/orders/components/AddOrderModal'

type TableCardProps = {
  table: TTable
  onAddOrder: (order: TOrderAdd) => void
}

export const TableCard = ({ table, onAddOrder }: TableCardProps) => {
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <Card className="hover:shadow-lg transition">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{table.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          {table.orders && table.orders.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-md font-semibold">Pedidos</h3>
              {table.orders.map((order) => (
                <div key={order.id} className="bg-gray-100 p-3 rounded-lg">
                  <h4 className="font-semibold text-sm">Pedido de {order.owner}</h4>
                  <Button
                    variant="secondary"
                    className="mt-2 w-full"
                    onClick={() => navigate(`/tables/${table.id}/orders/${order.id}`)}
                  >
                    Gerenciar Pedido
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Nenhum pedido</p>
          )}
          <Button className="mt-4 w-full bg-green-500 hover:bg-green-600" onClick={() => setModalOpen(true)}>
            Novo Pedido
          </Button>
        </div>
      </CardContent>

      <AddOrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={(owner) =>
          onAddOrder({
            tableId: table.id,
            tableName: table.name,
            owner
          })
        }
      />
    </Card>
  )
}
