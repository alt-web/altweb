import type { NextPage } from "next"
import Head from "next/head"
import styles from "../styles/index.module.css"
import ConsoleScreen from "../lib/console"

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Alt | Web</title>
            </Head>
            <ConsoleScreen />
        </div>
    )
}

export default Home
