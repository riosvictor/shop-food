import { useOrders } from '../hooks/useOrders'
import { updateOrderStatus } from '../libs/firestore' // Função para atualizar status no banco
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const Kitchen = () => {
  const { orders, setOrders } = useOrders() // Hook de pedidos em tempo real

  // Filtra apenas pedidos com status "pendente"
  const pendingOrders = orders.filter((order) => order.status === 'pending')

  // Marcar pedido como pronto e atualizar banco de dados
  const handleCompleteOrder = async (orderId: string) => {
    await updateOrderStatus(orderId, 'ready') // Atualiza no Firestore
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId)) // Remove da tela
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Preparo</h1>

      {pendingOrders.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum pedido pendente</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pendingOrders.map((order) => (
            <Card key={order.id} className="bg-yellow-50 border-yellow-300">
              <CardHeader>
                <CardTitle>Mesa {order.tableId}</CardTitle>
              </CardHeader>
              <CardContent>
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between p-2 border-b last:border-b-0">
                    <span>{item.name}</span>
                    <span className="font-bold">x</span>
                  </div>
                ))}
                <Button
                  className="mt-4 w-full bg-green-500 hover:bg-green-600"
                  onClick={() => handleCompleteOrder(order.id)}
                >
                  Marcar como Pronto
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
