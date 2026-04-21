import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './context/auth_context.jsx'
import { SearchProvider } from './context/search_context.jsx'
import { CartProvider } from './context/cart_context.jsx'
import { ToastContainer } from 'react-toastify';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <SearchProvider>
        <CartProvider>
          <BrowserRouter>
            <App />
            <ToastContainer />
          </BrowserRouter>
        </CartProvider>
      </SearchProvider>
    </AuthProvider>
  </StrictMode>
)
