import Image from "next/image"
import BG from "../../public/bg.webp"
import styles from "./background.module.css"

const Background = () => {
    return (
        <div className={styles.background}>
            <Image src={BG} layout="fill" objectFit="cover" placeholder="blur" />
        </div>
    )
}

export default Background
