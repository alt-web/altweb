import Link from "next/link"
import styles from "./header.module.css"

const Header = () => {
    return (
        <div className={styles.container}>
            <div>AW</div>
            <Space />
            <MyLink href="/projects">ПРОЕКТЫ</MyLink>
            <MyLink href="/philosophy">ФИЛОСОФИЯ</MyLink>
            <MyLink href="/pricing">ЦЕНЫ</MyLink>
            <Space />
            <Avatar />
        </div>
    )
}

const MyLink = ({href, children}: {href: string, children: string}) => {
    return (
        <div className={styles.linkContainer}>
            <Link href={href} passHref>
                <a className={styles.link}>
                    {children}
                </a>
            </Link>
            <div className={styles.underline}></div>
        </div>
    )
}

const Avatar = () => {
    return (
        <div className={styles.avatar}></div>
    )
}

const Space = () => (
    <div className={styles.space}></div>
) 

export default Header
