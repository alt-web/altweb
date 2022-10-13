import type { NextPage } from "next"
import Head from "next/head"
import styles from "../styles/index.module.css"
import ConsoleScreen from "../lib/frontpage/console"
import Team from "../lib/frontpage/team"
import Features from "../lib/frontpage/features"

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Alt | Web</title>
            </Head>
            <ConsoleScreen />
            <Team />
            <Features />
        </div>
    )
}

export default Home
