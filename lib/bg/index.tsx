import Image from "next/image"
import useSWRImmutable from "swr/immutable"
import { BackgroundApi } from "../../pages/api/background"
import styles from "./background.module.css"

const Background = () => {
    const { data, error } = useSWRImmutable<BackgroundApi, Error>(
        "/api/background"
    )

    if (error) return <></>
    if (!data) return <></>

    document.body.style.backgroundColor = darken(data.color)

    const gradient = {
        backgroundImage: `linear-gradient(to bottom, transparent, ${data.color})`,
    }

    return (
        <div className={styles.background}>
            <div className={styles.image}>
                <Image
                    src={data.url}
                    unoptimized={true}
                    blurDataURL={data.blurHash}
                    placeholder="blur"
                    alt="Background"
                    fill
                />
            </div>
            <div style={gradient} className={styles.gradient}></div>
            <div className={styles.tint}></div>
        </div>
    )
}

// I placed a translucent black element above the photo.
// This function takes the main color of the photo
// and darkens it so that the transition from the photo to the body of the page is smooth.
const darken = (hex: string) => {
    if (hex.length != 7) return hex
    const getColor = (pos: number) =>
        parseInt(hex.slice(1 + 2 * pos, 3 + 2 * pos), 16)
    const opacity = 0.3
    const r = Math.floor(getColor(0) * opacity)
    const g = Math.floor(getColor(1) * opacity)
    const b = Math.floor(getColor(2) * opacity)
    return `rgb(${r}, ${g}, ${b})`
}

export default Background
