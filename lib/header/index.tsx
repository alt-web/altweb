import Link from "next/link"
import Image from "next/image"
import { FiMenu, FiX, FiAtSign } from "react-icons/fi"
import AWLogo from "../../public/android-chrome-512x512.png"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import styles from "./header.module.css"

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setIsOpen(false)
    }, [router.isReady, router.asPath])

    const style = isOpen
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
                onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FiX /> : <FiMenu />}
            </button>
            <div className={styles.links} style={style}>
                <MyLink href="/projects">ПРОЕКТЫ</MyLink>
                <MyLink href="/about">О НАС</MyLink>
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
                        <FiAtSign />
                    </div>
                </div>
            </Link>
        </div>
    )
}

const Space = () => <div className={styles.space}></div>

export default Header
