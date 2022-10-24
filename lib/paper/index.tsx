import { ReactNode } from "react"
import styles from "./paper.module.css"

const Paper = (props: {children: ReactNode}) => {
    return (
        <div className={styles.container}>
            <div className={styles.paper}>
                {props.children}
            </div>
        </div>
    )
}

export default Paper
