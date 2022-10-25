import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/700.css"
import "@fontsource/roboto/900.css"
import { SWRConfig } from "swr"
import type { AppProps } from "next/app"
import Background from "../lib/bg"
import Header from "../lib/header"
import "../styles/globals.css"

function AltWeb({ Component, pageProps }: AppProps) {
    return (
        <SWRConfig
            value={{
                refreshInterval: 10000000,
                fetcher: (resource, init) =>
                    fetch(resource, init).then(res => res.json()),
            }}>
            <Background />
            <Header />
            <Component {...pageProps} />
        </SWRConfig>
    )
}

export default AltWeb
