import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Tables } from './pages/Tables'
import { Order } from './pages/Order'
import { Kitchen } from './pages/Kitchen'
import { Login } from './pages/Login'
import { PrivateRoute } from './hocs/PrivateRoute'
import { Sidebar } from './components/Sidebar'

const App = () => (
  <Router>
    <Sidebar />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="/tables" element={<Tables />} />
        <Route path="/order/:tableId" element={<Order />} />
        <Route path="/kitchen" element={<Kitchen />} />
      </Route>
    </Routes>
  </Router>
)

export default App
