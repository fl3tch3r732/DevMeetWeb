import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // <-- Add this line
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { ToastContainer } from 'react-toastify'


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
            <App />
            </AuthProvider>
            <ToastContainer />
        </BrowserRouter>
    </StrictMode>
)
