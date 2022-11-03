import type { NextPage } from "next"
import Title from "lib/title"
import { NavButton } from "lib/ui/button"
import Meta from "lib/meta"
import styles from "styles/index.module.css"

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Meta />
            <Title />
            <NavButton href="/auth">Открыть проект</NavButton>
        </div>
    )
}

export default Home
