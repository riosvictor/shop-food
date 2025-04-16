'use client'

import { BrowserRouter as Router } from 'react-router-dom'
import { Header } from './shared/components/Header'
import { Sidebar } from './shared/components/Sidebar'
import { MainContent } from './shared/components/MainContent'

const App = () => {
  const useInMemory = import.meta.env.VITE_USE_IN_MEMORY_REPOSITORY === 'true'
  console.log(`App running with database on ${useInMemory ? 'Memory' : 'Firebase'}`)

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <MainContent />
        </div>
      </div>
    </Router>
  )
}

export default App
