'use client'

import { BrowserRouter as Router, Routes, Route, matchPath, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { PrivateRoute } from './shared/hocs/PrivateRoute'
import { Sidebar } from './shared/components/Sidebar'

import { TablesPage } from './features/tables/pages/Tables'
import { LoginPage } from './features/auth/pages/Login'
import { OrderPage } from './features/orders/pages/Order'
import { KitchenPage } from './features/kitchen/pages/Kitchen'
import { ProductsPage } from './features/products/pages/Product'
import { appName, routesConfig } from './shared/config/routes'

const AppContent = () => {
  const location = useLocation()

  useEffect(() => {
    let title = routesConfig.find((route) => route.path === location.pathname)?.title

    if (!title) {
      for (const route of routesConfig) {
        if (matchPath(route.path, location.pathname)) {
          title = route.title
          break
        }
      }
    }

    document.title = title || `🏠 ${appName}`
  }, [location])

  return (
    <>
      <Sidebar />
      <div className="container mx-auto pt-8">
        <Routes>
          {routesConfig.map(({ path, private: isPrivate }) =>
            isPrivate ? (
              <Route key={path} element={<PrivateRoute />}>
                <Route path={path} element={getComponent(path)} />
              </Route>
            ) : (
              <Route key={path} path={path} element={getComponent(path)} />
            )
          )}
        </Routes>
      </div>
    </>
  )
}

// Função auxiliar para mapear rotas para componentes
const getComponent = (path: string) => {
  switch (path) {
    case '/':
      return <LoginPage />
    case '/tables':
      return <TablesPage />
    case '/tables/:tableId/orders/:orderId':
      return <OrderPage />
    case '/kitchen':
      return <KitchenPage />
    case '/products':
      return <ProductsPage />
    default:
      return <h1>404 - Página não encontrada</h1>
  }
}

const App = () => (
  <Router>
    <AppContent />
  </Router>
)

export default App
