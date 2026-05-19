
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
                        duration: 4200,
                        className: "",
                        style: {
                            background: '#171717',
                            color: '#e5e5e5',
                            border: '1px solid rgba(115,115,115,0.35)',
                            borderRadius: '12px',
                            boxShadow: '0 10px 28px rgba(0,0,0,0.42)',
                            padding: '12px 14px',
                            fontSize: '13px',
                            maxWidth: '440px',
                        },
                        success: {
                            style: {
                                border: '1px solid rgba(34,197,94,0.35)',
                                background: '#161c18',
                                color: '#dcfce7',
                            },
                            iconTheme: {
                                primary: '#22c55e',
                                secondary: '#0f1210',
                            },
                        },
                        error: {
                            style: {
                                border: '1px solid rgba(239,68,68,0.35)',
                                background: '#1d1515',
                                color: '#fee2e2',
                            },
                            iconTheme: {
                                primary: '#ef4444',
                                secondary: '#140f0f',
                            },
                        },
                    }}
                />
            </AuthProvider>
        </BrowserRouter>
)
