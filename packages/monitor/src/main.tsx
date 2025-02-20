import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'
import Loading from './components/Loading/index.tsx'
import { ThemeProvider } from 'styled-components'
import theme from './assets/theme'
import './assets/css/index.css'
import AuthRouter from './components/AuthRouter/index.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthRouter>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<Loading isBigLoading={true} />}>
          <App />
        </Suspense>
      </ThemeProvider>
    </AuthRouter>
  </BrowserRouter>,
)
