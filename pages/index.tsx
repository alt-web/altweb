import type { NextPage } from "next"
import Head from "next/head"
import styles from "../styles/index.module.css"
import ConsoleScreen from "../lib/frontpage/console"
import Team from "../lib/frontpage/team"
import Features from "../lib/frontpage/features"
import LoginForm from "../lib/auth"

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Alt | Web</title>
            </Head>
            <ConsoleScreen />
            <Features />
            <LoginForm />
        </div>
    )
}

export default Home
