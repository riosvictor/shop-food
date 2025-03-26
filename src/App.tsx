import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Tables } from './features/tables/pages/Tables'
import { Login } from './features/auth/pages/Login'
import { Order } from './features/orders/pages/Order'
import { Kitchen } from './pages/Kitchen'
import { PrivateRoute } from './shared/hocs/PrivateRoute'
import { Sidebar } from './shared/components/Sidebar'

const App = () => (
  <Router>
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
  </Router>
)

export default App
