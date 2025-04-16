import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from '@/features/auth/contexts/AuthContext.tsx'
import { Toaster } from '@/components/ui/sonner.tsx'
import { ThemeProvider } from './shared/components/ThemeProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <App />
        <Toaster richColors />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
)
