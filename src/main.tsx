import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/montserrat/200.css'
import '@fontsource/montserrat/300.css'
import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/600.css'
import '@fontsource/montserrat/700.css'
import '@fontsource/great-vibes/400.css'
import './styles/index.scss'
import App from './App.tsx'

const FONT_SAMPLE = 'Талгат Айжана Сентябрь'

async function waitForFonts() {
  if (!('fonts' in document)) return

  await Promise.race([
    Promise.all([
      document.fonts.load(`400 52px Monplesir`, FONT_SAMPLE),
      document.fonts.load(`400 16px Montserrat`, FONT_SAMPLE),
      document.fonts.load(`500 16px Montserrat`, FONT_SAMPLE),
      document.fonts.load(`600 16px Montserrat`, FONT_SAMPLE),
      document.fonts.load(`700 12px Montserrat`, FONT_SAMPLE),
      document.fonts.load(`400 48px "Great Vibes"`, FONT_SAMPLE),
    ]),
    new Promise<void>((resolve) => {
      window.setTimeout(resolve, 3000)
    }),
  ])
}

async function boot() {
  try {
    await waitForFonts()
  } finally {
    document.documentElement.classList.add('fonts-ready')
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  }
}

void boot()
