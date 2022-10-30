import { CheckCircleIcon } from "@chakra-ui/icons"
import styles from "./changelog.module.css"

const Changelog = () => {
    return (
        <div className={styles.canvas}>
            <div>История изменений</div>
            <Commit>Слить ветку od/fix-slideshow</Commit>
            <Commit>Обновить библиотеку слайдшоу</Commit>
            <Commit>Вынести слайдшоу в отдельную библиотеку</Commit>
        </div>
    )
}

const Commit = ({ children }: { children: string }) => (
    <div className={styles.commit}>
        <CheckCircleIcon />
        {children}
    </div>
)

export default Changelog
