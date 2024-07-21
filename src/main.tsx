import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/ibm-plex-mono';
import App from './App.tsx'
import './main.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
