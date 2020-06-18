import { createGlobalStyle } from 'styled-components'
import { Colors } from '@la-ferme/components'
import LaFermeStyle from '@la-ferme/components/styles/GlobalStyle'

import 'reset-css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <LaFermeStyle />
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${Colors.blue};
  }
`

export default MyApp
