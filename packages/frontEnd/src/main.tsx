import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import Loading from './components/Loading/index.tsx'
import { ThemeProvider } from 'styled-components'
import theme from './assets/theme'
import './assets/css/index.css'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <Suspense fallback={<Loading />}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Suspense>
    </StrictMode>
    ,
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
