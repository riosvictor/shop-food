import { BrowserRouter as Router, Routes, Route, matchPath, useLocation } from 'react-router-dom'
import { Tables } from './features/tables/pages/Tables'
import { Login } from './features/auth/pages/Login'
import { Order } from './features/orders/pages/Order'
import { Kitchen } from './features/kitchen/pages/Kitchen'
import { PrivateRoute } from './shared/hocs/PrivateRoute'
import { Sidebar } from './shared/components/Sidebar'
import { useEffect } from 'react'

const appName = 'Meu App'
const routeTitles: Record<string, string> = {
  '/': `🔑 Login - ${appName}`,
  '/tables': `🍽️ Mesas - ${appName}`,
  '/tables/:tableId/orders/:orderId': `🛒 Pedido - ${appName}`,
  '/kitchen': `👨‍🍳 Cozinha - ${appName}`
}

const AppContent = () => {
  const location = useLocation() // Agora isso está dentro do contexto do <Router>

  useEffect(() => {
    let title = routeTitles[location.pathname]

    // Verificar se estamos em uma rota dinâmica
    if (!title) {
      // Percorrer as chaves para buscar a rota dinâmica correspondente (como /tables/:tableId/orders/:orderId)
      for (const route in routeTitles) {
        const match = matchPath(route, location.pathname) // Lógica de match fornecida pelo react-router
        if (match) {
          title = routeTitles[route]
          break
        }
      }
    }

    // Se nenhuma rota for encontrada, definir um título padrão
    document.title = title || `🏠 ${appName}`
  }, [location])

  return (
    <>
      <Sidebar />
      <div className="container mx-auto pt-8">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/tables/:tableId/orders/:orderId" element={<Order />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/kitchen" element={<Kitchen />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}

const App = () => (
  <Router>
    <AppContent />
  </Router>
)

export default App
