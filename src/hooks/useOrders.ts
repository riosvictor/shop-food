import { useEffect, useState } from 'react'
import { listenOrders } from '../libs/firestore'
import { TOrderListener } from '../types/entities'

export const useOrders = () => {
  const [orders, setOrders] = useState<TOrderListener[]>([])

  useEffect(() => {
    const unsubscribe = listenOrders(setOrders)
    return () => unsubscribe()
  }, [])

  return { orders, setOrders }
}
