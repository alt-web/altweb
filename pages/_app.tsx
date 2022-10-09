import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/700.css"
import "@fontsource/roboto/900.css"
import type { AppProps } from 'next/app'
import '../styles/globals.css'

function AltWeb({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default AltWeb
