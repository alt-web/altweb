import { ReactNode } from "react"
import {
    FileZipOutlined,
    SyncOutlined,
    MessageOutlined,
    DeploymentUnitOutlined,
} from "@ant-design/icons"
import styles from "./features.module.css"

const Features = () => {
    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                <div className={styles.title}>Our features:</div>
                <Feature icon={<FileZipOutlined />} title="You own everything">
                    You have access to the project&apos;s source code,
                    containers, and databases. You are not tied to our
                    infrastructure and can change your development approach at
                    any time.
                </Feature>
                <Feature icon={<SyncOutlined />} title="Lifetime updates">
                    We will fix vulnerabilities or bugs for free even years
                    later. At the same time our subscription includes updates
                    and changes to the site.
                </Feature>
                <Feature icon={<MessageOutlined />} title="Easy communication">
                    Easily communicate with developers in a familiar messenger
                    or on our website. Create tasks and track the progress.
                </Feature>
                <Feature
                    icon={<DeploymentUnitOutlined />}
                    title="Servers managment">
                    You don&apos;t have to worry about buying a server. You can
                    host your project in our cloud.
                </Feature>
            </div>
        </div>
    )
}

const Feature = ({
    icon,
    title,
    children,
}: {
    children: ReactNode
    title: string
    icon: ReactNode
}) => {
    return (
        <div className={styles.feature}>
            <div className={styles.icon}>{icon}</div>
            <div className={styles.name}>{title}</div>
            <div className={styles.description}>{children}</div>
        </div>
    )
}

export default Features
