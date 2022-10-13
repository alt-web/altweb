import Image from "next/image"
import styles from "./team.module.css"
import officeImage from "../../../public/office.webp"

const Team = () => {
    return (
        <div className={styles.container}>
            <Image src={officeImage} layout="fill" objectFit="cover" alt="Boring office"/>
            <div className={styles.text}>
                <div className={styles.title}>
                    You don&apos;t need to hire an IT department
                </div>
                <div className={styles.description}>
                    We will do everything for you
                </div>
            </div>
        </div>
    )
}

export default Team
