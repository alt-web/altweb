import Image from "next/image"
import { FiMail, FiSend, FiGithub } from "react-icons/fi"
import styles from "./footer.module.css"

const Footer = () => {
    return (
        <div className={styles.content}>
            <div className={styles.column}>
                <Author />
                <Email />
                <Telegram />
                <Github />
            </div>
        </div>
    )
}

const Author = () => (
    <div className={styles.author}>
        <Image src="/author.webp" width={32} height={32} alt="The author of altweb.tech - Ivan"/> Ivan R.
    </div>
)

const Email = () => (
    <div>
        <FiMail /> <a href="mailto:dev@altweb.tech">dev@altweb.tech</a>
    </div>
)

const Telegram = () => (
    <div>
        <FiSend />{" "}
        <a href="https://t.me/altwebchat" target="_blank" rel="noreferrer">
            Telegram
        </a>
    </div>
)

const Github = () => (
    <div>
        <FiGithub />{" "}
        <a href="https://github.com/alt-web" target="_blank" rel="noreferrer">
            Github
        </a>
    </div>
)

export default Footer
