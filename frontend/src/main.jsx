import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles.css'
import { setAuthToken } from './services/api'

// load token from localStorage
const token = localStorage.getItem('token')
if (token) setAuthToken(token)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

// register SW (basic)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  })
}
