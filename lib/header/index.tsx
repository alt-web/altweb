import Link from "next/link"
import Image from "next/image"
import { AtSignIcon, HamburgerIcon, SmallCloseIcon } from "@chakra-ui/icons"
import AWLogo from "../../public/android-chrome-512x512.png"
import { useRouter } from "next/router"
import { useState } from "react"
import styles from "./header.module.css"

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const linkStyle = isMenuOpen
        ? {
              height: "100vh",
          }
        : {}

    return (
        <div className={styles.container}>
            <Logo />
            <Space />
            <button
                className={styles.button}
                onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <SmallCloseIcon /> : <HamburgerIcon />}
            </button>
            <div className={styles.links} style={linkStyle}>
                <MyLink href="/projects">ПРОЕКТЫ</MyLink>
                <MyLink href="/philosophy">ФИЛОСОФИЯ</MyLink>
                <MyLink href="/pricing">ЦЕНЫ</MyLink>
            </div>
            <Avatar />
        </div>
    )
}

const Logo = () => {
    return (
        <Link href="/" className={styles.LogoWrapper}>
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
                    <div className={styles.avatar}>
                        <AtSignIcon />
                    </div>
                </div>
            </Link>
        </div>
    )
}

const Space = () => <div className={styles.space}></div>

export default Header
