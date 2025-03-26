import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TOrder } from '@/shared/types/entities'

type OrderCardProps = {
  order: TOrder
  onRemoveItem: (orderId: string, itemId: string) => void
  showRemoveButton?: boolean
}

export const OrderCard = ({ order, onRemoveItem, showRemoveButton = true }: OrderCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pedido #{order.id}</CardTitle>
      </CardHeader>
      <CardContent>
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between p-2 border-b last:border-b-0">
            <span>{item.name}</span>
            {showRemoveButton && (
              <Button variant="destructive" size="sm" onClick={() => onRemoveItem(order.id, item.id)}>
                Remover
              </Button>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
