import type { NextPage } from "next"
import Title from "lib/title"
import Meta from "lib/meta"
import styles from "styles/index.module.css"

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Meta />
            <Title />
        </div>
    )
}

export default Home
