import type { NextPage } from "next"
import Head from "next/head"
import Title from "../lib/title"
import { NavButton } from "../lib/ui/button"
import styles from "../styles/index.module.css"

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Alt Web</title>
            </Head>
            <Title />
            <NavButton href="/overview">Открыть проект</NavButton>
        </div>
    )
}

export default Home
