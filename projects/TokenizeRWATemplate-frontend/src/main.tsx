import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import './styles/main.css'

console.log('main.tsx: Starting app initialization...')

try {
  console.log('main.tsx: Creating ReactDOM root...')
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
  console.log('main.tsx: Root created, rendering app...')
  
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>,
  )
  console.log('main.tsx: App rendered successfully')
} catch (error) {
  console.error('main.tsx: Failed to initialize app', error)
  document.body.innerHTML = `<div style="color:red;padding:20px"><h1>Error initializing app</h1><pre>${error}</pre></div>`
}
