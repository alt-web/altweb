import { useState, useEffect } from "react"
import { CaretDownOutlined } from "@ant-design/icons"
import styles from "./console.module.css"

const ConsoleScreen = () => {
    const [stage, setStage] = useState(1)
    return (
        <div className={styles.container}>
            <Line onAnimationEnd={() => setStage(2)} isVisible={stage >= 1}>
                Hi!
            </Line>
            <Line onAnimationEnd={() => setStage(3)} isVisible={stage >= 2}>
                Do you want a site?
            </Line>
            <Line onAnimationEnd={() => setStage(4)} isVisible={stage >= 3}>
                We have something for you
            </Line>
            <SecretButton isVisible={stage >= 4} />
        </div>
    )
}

const Line = ({
    onAnimationEnd,
    isVisible,
    children,
}: {
    onAnimationEnd: () => void
    isVisible: boolean
    children: string
}) => {
    const [sliceEnd, setSliceEnd] = useState(0)

    const baseDelay = 20

    useEffect(() => {
        if (isVisible) {
            if (sliceEnd < children.length) {
                const currentDelay = sliceEnd > 0 ? baseDelay : baseDelay + 1000
                const timeout = setTimeout(() => {
                    setSliceEnd(sliceEnd + 1)
                }, currentDelay)
                return () => clearTimeout(timeout)
            }
            onAnimationEnd()
        }
    }, [isVisible, sliceEnd])

    return <div className={styles.line}>{children.slice(0, sliceEnd)}</div>
}

const SecretButton = ({ isVisible }: { isVisible: boolean }) => {
    const [bgColor, setBgColor] = useState("black")
    const [size, setSize] = useState("50px")

    useEffect(() => {
        if (isVisible) {
            const timeout = setTimeout(() => {
                setBgColor("white")
                setSize("60px")
            }, 1000)
            return () => clearTimeout(timeout)
        }
    }, [isVisible])

    const scroll = () => {
        window.scroll({ left: 0, top: window.innerHeight, behavior: "smooth" })
    }

    return (
        <div className={styles.buttonContainer}>
            <button
                style={{ backgroundColor: bgColor, height: size, width: size }}
                className={styles.button}
                onClick={scroll}>
                <CaretDownOutlined />
            </button>
        </div>
    )
}

export default ConsoleScreen
