import { ReactNode } from "react"
import styles from "./background.module.css"

const Background = ({ children }: { children: ReactNode }) => (
    <div className={styles.background}>{children}</div>
)

export default Background
