import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TTable } from '../types/entities'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

type TableCardProps = {
  table: TTable
}

export const TableCard = ({ table }: TableCardProps) => {
  const navigate = useNavigate()

  return (
    <Card className="hover:shadow-lg transition">
      <CardHeader>
        <CardTitle>{table.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* <Button className="w-full" onClick={() => navigate(`/order/${table.id}`)}>
          Ver Pedido
        </Button> */}
        {table.orders.length === 0 ? (
          <>
            <p className="text-center text-gray-500">Nenhum pedido</p>

            <Button
              className="mt-4 w-full bg-green-500 hover:bg-green-600"
              onClick={() => navigate(`/order/${table.id}`)}
            >
              Novo Pedido
            </Button>
          </>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {table.orders.map((order) => (
              <div key={order.id} className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-lg font-bold mb-2">Pedido {order.id}</h2>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{item.name}</span>
                      <span className="font-bold">x</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
