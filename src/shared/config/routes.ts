export const appName = 'Meu App'

export type RouteConfig = {
  path: string
  title: string
  menuLabel?: string // Opcional, só aparece no menu
  private: boolean // Define se a rota precisa estar autenticada
}

export const routesConfig: RouteConfig[] = [
  { path: '/', title: `🔑 Login - ${appName}`, private: false },
  { path: '/tables', title: `🍽️ Mesas - ${appName}`, menuLabel: 'Mesas', private: true },
  { path: '/tables/:tableId/orders/:orderId', title: `🛒 Pedido - ${appName}`, private: true },
  { path: '/kitchen', title: `👨‍🍳 Cozinha - ${appName}`, menuLabel: 'Cozinha', private: true },
  { path: '/products', title: `📦 Produtos - ${appName}`, menuLabel: 'Produtos', private: true }
]
