import { ThemeProvider, DefaultTheme } from 'styled-components'
import type { AppProps } from 'next/app'
import GlobalStyle from '../styled-components/GlobalStyles.styled'
import dynamic from 'next/dynamic';


const theme: DefaultTheme = {
  colors: {
    primary: '#FEFFFE',
    secondary: '#DDDDDD',
    offColor: '#c3c3c3',
    spheres: '#ECBF6A',
    accent: '#ECBF6A',
  },
  backgrounds:{
    primary: '#141414',
    secondary: '#161616',
    offColor: '#737373',
    accent: '#ECBF6A',
  }
}


function MyApp({ Component, pageProps }: AppProps) {
  //1664074800000
  const ONE_HOUR_IN_MS = 60 * 60 * 1000;
  const NOW_IN_MS = 1664121600000;
  const TARGET_DATE = ONE_HOUR_IN_MS + NOW_IN_MS;
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} TARGET_DATE={TARGET_DATE} />
      </ThemeProvider>
    </>
  )
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
