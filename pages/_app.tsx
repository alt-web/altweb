import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/700.css"
import "@fontsource/roboto/900.css"
import { SWRConfig } from "swr"
import Head from "next/head"
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
            <Favicons />
            <Background />
            <Header />
            <Component {...pageProps} />
        </SWRConfig>
    )
}

const Favicons = () => (
    <Head>
        <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
        />
        <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
        />
        <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
    </Head>
)

export default AltWeb
