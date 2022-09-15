import { ThemeProvider, DefaultTheme } from 'styled-components'
import type { AppProps } from 'next/app'
import GlobalStyle from '../styled-components/GlobalStyles.styled'


const theme: DefaultTheme = {
  colors: {
    primary: '#FEFFFE',
    secondary: '#DDDDDD',
    offColor: '#c3c3c3',
    spheres: '#ECBF6A',
    accent: '#ECBF6A',
  },
  backgrounds:{
    primary: '#1d1d1d',
    secondary: '#161616',
    offColor: '#737373',
    accent: '#ECBF6A',
  }
}


function MyApp({ Component, pageProps }: AppProps) {
  const TEN_MINS_IN_MS = 10 * 60 * 1000;
  const NOW_IN_MS = 1664532030000;
  const TARGET_DATE = TEN_MINS_IN_MS + NOW_IN_MS;
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} TARGET_DATE={TARGET_DATE} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
