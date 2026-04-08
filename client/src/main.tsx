
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
        <BrowserRouter>
            <AuthProvider>
                <App />
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 4500,
                        style: {
                            background: '#0f172a',
                            color: '#e2e8f0',
                            border: '1px solid #334155',
                        },
                        success: {
                            iconTheme: {
                                primary: '#10b981',
                                secondary: '#0f172a',
                            },
                        },
                        error: {
                            iconTheme: {
                                primary: '#f43f5e',
                                secondary: '#0f172a',
                            },
                        },
                    }}
                />
            </AuthProvider>
        </BrowserRouter>
)
