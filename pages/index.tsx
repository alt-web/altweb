import type { NextPage } from "next"
import Head from "next/head"
import Title from "../lib/title"
import Auth from "../lib/auth"

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Alt Web</title>
            </Head>
            <Title />
            <Auth />
        </div>
    )
}

export default Home
