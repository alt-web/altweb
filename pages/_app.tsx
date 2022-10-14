import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/700.css"
import "@fontsource/roboto/900.css"
import { ChakraProvider } from "@chakra-ui/react"
import type { AppProps } from "next/app"
import "../styles/globals.css"

function AltWeb({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider resetCSS={true}>
            <Component {...pageProps} />
        </ChakraProvider>
    )
}

export default AltWeb
