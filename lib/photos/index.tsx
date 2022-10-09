import Image, { StaticImageData } from 'next/image'
import Memento from "../../public/examples/memento.webp"
import YY from "../../public/examples/yy.webp"
import YMag from "../../public/examples/ymag.webp"
import Lofi from "../../public/examples/lofi.webp"
import styles from "./photos.module.css"

const Photos = () => {
    return (
        <div className={styles.container}>
            <Photo src={Memento} alt="Memento"/>
            <Photo src={YY} alt="YY Studios" />
            <Photo src={YMag} alt="Y-Mag"/>
            <Photo src={Lofi} alt="Lofi music station"/>
            <div className={styles.foreground}></div>
        </div>
    )
}

const Photo = (props: {src: StaticImageData, alt: string}) => (
    <div className={styles.photo}>
        <Image src={props.src} layout="fill" objectFit="cover" alt={props.alt}/>
    </div>
)

export default Photos
