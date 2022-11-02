import { EmailIcon, InfoOutlineIcon } from "@chakra-ui/icons"
import styles from "./footer.module.css"

const Footer = () => {
    return (
        <div className={styles.content}>
            <div>ALT WEB</div>
            <Email />
            <Github />
        </div>
    )
}

const Email = () => (
    <div>
        <EmailIcon /> <a href="mailto:dev@altweb.tech">dev@altweb.tech</a>
    </div>
)

const Github = () => (
    <div>
        <InfoOutlineIcon />{" "}
        <a href="https://github.com/alt-web" target="_blank" rel="noreferrer">
            Github
        </a>
    </div>
)

export default Footer
