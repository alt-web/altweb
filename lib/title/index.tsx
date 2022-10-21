import styles from "./title.module.css"

const Title = () => {
    return (
        <div className={styles.container}>
            <h1>Alt Web</h1>
            <div className={styles.description}>
                Мы поможем вам оказаться в интернете
            </div>
        </div>
    )
}

export default Title
