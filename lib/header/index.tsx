import Link from "next/link"
import styles from "./header.module.css"

const Header = () => {
    return (
        <div className={styles.container}>
            <div>AW</div>
            <MyLink href="/projects">ПРОЕКТЫ</MyLink>
            <MyLink href="/philosophy">ФИЛОСОФИЯ</MyLink>
            <MyLink href="/pricing">ЦЕНЫ</MyLink>
            <Avatar />
        </div>
    )
}

const MyLink = ({href, children}: {href: string, children: string}) => {
    return (
        <Link href={href} passHref>
            <a className={styles.link}>
                {children}
            </a>
        </Link>
    )
}

const Avatar = () => {
    return (
        <div className={styles.avatar}>
        </div>
    )
}

export default Header
