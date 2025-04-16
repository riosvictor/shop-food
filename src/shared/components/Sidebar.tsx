'use client'

import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LogOut, Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { routesConfig } from '../config/routes'

export const Sidebar = () => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  if (!user) return null

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button id="btn_menu_bar" variant="outline" className="fixed top-4 left-4" onClick={() => setOpen(!open)}>
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-4 bg-white dark:bg-zinc-900">
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold mb-4">Menu</SheetTitle>
          <SheetDescription>Olá, {user.email}!</SheetDescription>
          <hr className="my-4" />
          <SheetDescription>Nível de acesso: {user.role}</SheetDescription>
        </SheetHeader>

        <nav className="space-y-2">
          {routesConfig
            .filter((route) => route.menuLabel) // Só exibir rotas que têm nome no menu
            .map(({ path, menuLabel }) => (
              <Link
                key={path}
                to={path}
                className={`block p-2 rounded ${
                  location.pathname === path ? 'bg-blue-500 text-white' : 'text-gray-700'
                }`}
                onClick={() => setOpen(false)}
              >
                {menuLabel}
              </Link>
            ))}
        </nav>
        <div className="absolute bottom-4 left-4">
          <Button id="btn_logout" variant="destructive" onClick={handleLogout}>
            <LogOut className="mr-2 w-4 h-4" /> Sair
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
