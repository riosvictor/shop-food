import { useEffect, useState } from 'react'
import { listenOrders } from '@/shared/libs/firestore'
import { TOrderListener } from '@/shared/types/entities'

export const useOrders = () => {
  const [orders, setOrders] = useState<TOrderListener[]>([])

  useEffect(() => {
    const unsubscribe = listenOrders(setOrders)
    return () => unsubscribe()
  }, [])

  return { orders, setOrders }
}
