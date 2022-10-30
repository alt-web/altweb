import Image from "next/image"
import useSWRImmutable from "swr/immutable"
import BackgroundImage from "../../public/bg.webp"
import styles from "./background.module.css"

const Background = () => {
    return (
        <div className={styles.background}>
            <Image
                src={BackgroundImage}
                placeholder="blur"
                alt="Background"
                fill
            />
        </div>
    )
}

export default Background
