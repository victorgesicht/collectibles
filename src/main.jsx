import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import AuthProvider from './state/AuthProvider'
import BinderProvider from './state/BinderProvider'
import ToastProvider from './state/ToastProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <AuthProvider>
        <BinderProvider>
          <App />
        </BinderProvider>
      </AuthProvider>
    </ToastProvider>
  </StrictMode>,
)
