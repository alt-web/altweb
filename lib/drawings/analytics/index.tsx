import styles from "./analytics.module.css"

const Analytics = () => {
    // Generate graph
    const height: number[] = []
    const minHeight = 10
    const scale = 1 / 70
    for (let i = 3; i < 24; i++) {
        height.push(Math.floor(i ** 3 * scale + minHeight))
    }

    return (
        <div className={styles.canvas}>
            <div>Количество посещений</div>
            <div className={styles.graph}>
                {height.map(i => (
                    <Bar key={i} height={i} />
                ))}
            </div>
        </div>
    )
}

const Bar = ({ height }: { height: number }) => (
    <div style={{ height }} className={styles.bar}></div>
)

export default Analytics
