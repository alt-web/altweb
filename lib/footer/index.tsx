import Link from "next/link"
import { FiMail, FiSend, FiGithub, FiFileText } from "react-icons/fi"
import styles from "./footer.module.css"

const Footer = () => {
    return (
        <div className={styles.content}>
            <div className={styles.column}>
                <div>ALT WEB</div>
                <Email />
                <Telegram />
                <Github />
            </div>

            <div className={styles.column}>
                <div>ДОКУМЕНТЫ</div>
                <Offer />
            </div>
        </div>
    )
}

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

const Offer = () => (
    <div>
        <FiFileText />{" "}
        <Link href="/docs/offer">
            Оферта
        </Link>
    </div>
)

export default Footer
