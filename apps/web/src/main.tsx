import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import '@/styles/global.css'
import { setupApp } from '@/setups'
import { App } from './App.tsx'
import { ThemeProvider } from '@/components/theme-provider.tsx'

setupApp()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.VITE_BASE_URL}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
