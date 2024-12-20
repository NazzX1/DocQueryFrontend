import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {dark} from '@clerk/themes'
import { ClerkProvider, } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')!).render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/"
    appearance={{
      baseTheme : dark,
    }}
    >
      <App />
    </ClerkProvider>
)