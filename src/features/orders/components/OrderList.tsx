import { TOrder } from '@/shared/types'
import { CheckCircle, Clock, XCircle } from 'lucide-react'

const statusIcons = {
  pending: { icon: <Clock size={16} className="text-yellow-500" />, label: 'Pendente' },
  confirmed: { icon: <CheckCircle size={16} className="text-blue-500" />, label: 'Confirmado' },
  delivered: { icon: <CheckCircle size={16} className="text-green-500" />, label: 'Entregue' },
  canceled: { icon: <XCircle size={16} className="text-red-500" />, label: 'Cancelado' }
}

export const OrderList = ({ order }: { order: TOrder | null }) => {
  if (!order) {
    return <p className="text-gray-500 text-center">Nenhum pedido encontrado.</p>
  }

  const confirmedItems = order.items || []

  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-bold mb-2">Itens do Pedido</h2>

      {confirmedItems.length > 0 ? (
        <ul className="space-y-2 mb-4">
          {confirmedItems.map((item) => {
            const statusInfo = statusIcons[item.status] || { icon: '❓', label: item.status }
            return (
              <li key={item.id} className="flex justify-between items-center border-b pb-1">
                <span>
                  {item.quantity}x {item.name} - R$ {(item.price * item.quantity).toFixed(2)}
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-500 capitalize">
                  {statusInfo.icon} {statusInfo.label}
                </span>
              </li>
            )
          })}
        </ul>
      ) : (
        <p className="text-gray-500 italic">Nenhum item confirmado.</p>
      )}
    </div>
  )
}
