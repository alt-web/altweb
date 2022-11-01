import { ReactNode } from "react"
import Link from "next/link"
import { ArrowForwardIcon } from "@chakra-ui/icons"
import styles from "./button.module.css"

function Button({
    children,
    onClick,
}: {
    children: ReactNode
    onClick?: () => void
}) {
    return (
        <button onClick={onClick} className={styles.button}>
            {children}
        </button>
    )
}

export function NavButton({
    children,
    href,
}: {
    children: ReactNode
    href: string
}) {
    return (
        <Link href={href}>
            <Button>
                {children} <ArrowForwardIcon />
            </Button>
        </Link>
    )
}

export default Button
