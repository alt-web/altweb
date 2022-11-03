import { FiServer } from "react-icons/fi"
import styles from "./pod.module.css"

const Pod = () => {
    return (
        <div className={styles.canvas}>
            <div>Контейнеры</div>
            <Container>Прокси</Container>
            <Container>Сайт</Container>
            <Container>Данные</Container>
        </div>
    )
}

const Container = ({ children }: { children: string }) => (
    <div className={styles.container}>
        {children}
        <FiServer />
    </div>
)

export default Pod
