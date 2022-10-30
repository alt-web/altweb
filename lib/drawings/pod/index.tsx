import { DragHandleIcon } from "@chakra-ui/icons"
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
        <DragHandleIcon />
    </div>
)

export default Pod
