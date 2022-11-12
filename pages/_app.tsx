import "@fontsource/montserrat/300.css"
import "@fontsource/montserrat/400.css"
import "@fontsource/montserrat/700.css"
import "@fontsource/montserrat/900.css"
import Head from "next/head"
import type { AppProps } from "next/app"
import Tracking from "../lib/tracking"
import Background from "../lib/bg"
import Header from "../lib/header"
import Footer from "lib/footer"
import "../styles/globals.css"

function AltWeb({ Component, pageProps }: AppProps) {
    return (
        <div>
            <Tracking />
            <Favicons />
            <Background>
                <Header />
                <Component {...pageProps} />
            </Background>
            <Footer />
        </div>
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
