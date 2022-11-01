import { useState, ReactNode } from "react"
import styles from "./navigation.module.css"

export function Navigation({
    panels,
    tabs,
}: {
    panels: ReactNode[]
    tabs: string[]
}) {
    const [currentTab, setCurrentTab] = useState(0)
    const activeTab = panels[currentTab]
    return (
        <div className={styles.navigation}>
            <div className={styles.links}>
                {tabs.map((tab, index) => (
                    <div key={tab} onClick={() => setCurrentTab(index)}>
                        {tab.toUpperCase()}
                    </div>
                ))}
            </div>
            <div className={styles.content}>{activeTab}</div>
            <div className={styles.counterweight}></div>
        </div>
    )
}
