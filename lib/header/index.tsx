import Link from "next/link"
import Image from "next/image"
import AWLogo from "../../public/android-chrome-512x512.png"
import { useRouter } from "next/router"
import styles from "./header.module.css"

const Header = () => {
    return (
        <div className={styles.container}>
            <Logo />
            <Space />
            <MyLink href="/projects">ПРОЕКТЫ</MyLink>
            <MyLink href="/philosophy">ФИЛОСОФИЯ</MyLink>
            <MyLink href="/pricing">ЦЕНЫ</MyLink>
            <Space />
            <Avatar />
        </div>
    )
}

const Logo = () => {
    return (
        <Link href="/">
            <Image
                className={styles.Logo}
                src={AWLogo}
                placeholder="blur"
                width={40}
                height={40}
                alt="Alt Web Logo"
            />
        </Link>
    )
}

const MyLink = ({ href, children }: { href: string; children: string }) => {
    const router = useRouter()

    return (
        <div className={styles.linkContainer}>
            <Link href={href} passHref className={styles.link}>
                {children}
            </Link>
            <div
                className={
                    router.asPath === href
                        ? styles.permanentUnderline
                        : styles.underline
                }></div>
        </div>
    )
}

const Avatar = () => {
    const router = useRouter()

    const style = router.asPath.startsWith("/overview")
        ? {
              width: "40px",
              height: "40px",
          }
        : {}

    return (
        <div className={styles.avatarContainer}>
            <Link href="/overview" passHref>
                <div style={style} className={styles.avatarStroke}>
                    <div className={styles.avatar}></div>
                </div>
            </Link>
        </div>
    )
}

const Space = () => <div className={styles.space}></div>

export default Header
