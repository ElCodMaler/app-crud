import { createRoot } from 'react-dom/client'
import {ThemeInit} from '../.flowbite-react/init.tsx'
import { StrictMode } from 'react'
import './index.css'
import { App } from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeInit/>
    <App />
  </StrictMode>,
)
