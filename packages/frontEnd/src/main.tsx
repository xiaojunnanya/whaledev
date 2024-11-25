import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import Loading from './components/Loading/index.tsx'
import { ThemeProvider } from 'styled-components'
import theme from './assets/theme'
import './assets/css/index.css'
import AuthRouter from './components/AuthRouter/index.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthRouter>
      <Suspense fallback={<Loading />}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Suspense>
    </AuthRouter>
  </BrowserRouter>,
)

console.log(`
          _____                                     _____                    _____                    _____
          /\\    \\                 ______            |\\    \\                  /\\    \\                  /\\    \\
        /::\\    \\               |::|   |           |:\\____\\                /::\\    \\                /::\\____\\
        /::::\\    \\              |::|   |           |::|   |                \\:::\\    \\              /:::/    /
      /::::::\\    \\             |::|   |           |::|   |                 \\:::\\    \\            /:::/    /
      /:::/\\:::\\    \\            |::|   |           |::|   |                  \\:::\\    \\          /:::/    /
    /:::/  \\:::\\    \\           |::|   |           |::|   |                   \\:::\\    \\        /:::/    /
    /:::/    \\:::\\    \\          |::|   |           |::|   |                   /::::\\    \\      /:::/    /
  /:::/    / \\:::\\    \\         |::|   |           |::|___|______    _____   /::::::\\    \\    /:::/    /
  /:::/    /   \\:::\\    \\  ______|::|___|___ ____   /::::::::\\    \\  /\\    \\ /:::/\\:::\\    \\  /:::/    /
/:::/____/     \\:::\\____\\|:::::::::::::::::|    | /::::::::::\\____\\/::\\    /:::/  \\:::\\____\\/:::/____/
\\:::\\    \\      \\::/    /|:::::::::::::::::|____|/:::/~~~~/~~      \\:::\\  /:::/    \\::/    /\\:::\\    \\
  \\:::\\    \\      \\/____/  ~~~~~~|::|~~~|~~~     /:::/    /          \\:::\\/:::/    / \\/____/  \\:::\\    \\
  \\:::\\    \\                    |::|   |       /:::/    /            \\::::::/    /            \\:::\\    \\
    \\:::\\    \\                   |::|   |      /:::/    /              \\::::/    /              \\:::\\    \\
    \\:::\\    \\                  |::|   |      \\::/    /                \\::/    /                \\:::\\    \\
      \\:::\\    \\                 |::|   |       \\/____/                  \\/____/                  \\:::\\    \\
      \\:::\\    \\                |::|   |                                                          \\:::\\    \\
        \\:::\\____\\               |::|   |                                                           \\:::\\____\\
        \\::/    /               |::|___|                                                            \\::/    /
          \\/____/                 ~~                                                                  \\/____/

个人博客：www.xiaojunnan.cn
`)
