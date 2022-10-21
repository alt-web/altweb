import type { NextPage } from "next"
import Head from "next/head"
import Header from "../lib/header"
import Title from "../lib/title"
import EmailForm from "../lib/email"

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Alt Web</title>
            </Head>
            <Header />
            <Title />
            <EmailForm />
        </div>
    )
}

export default Home
