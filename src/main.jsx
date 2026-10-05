import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/great-vibes/400.css'
import '@fontsource/eb-garamond/400.css'
import '@fontsource/eb-garamond/400-italic.css'
import '@fontsource/eb-garamond/500.css'
import '@fontsource/eb-garamond/600.css'
import './styles.css'
import App from './App.jsx'
import { grainUrl, mottleUrl } from './lib/paper.js'

document.documentElement.style.setProperty('--grain', grainUrl)
document.documentElement.style.setProperty('--mottle', mottleUrl)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
