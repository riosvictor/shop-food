import { TOrder } from '@/shared/types/entities'

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
          {confirmedItems.map((item) => (
            <li key={item.id} className="flex justify-between border-b pb-1">
              <span>{item.name}</span>
              <span className="text-sm text-gray-500 capitalize">({item.status})</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">Nenhum item confirmado.</p>
      )}
    </div>
  )
}
