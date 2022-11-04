import type { NextPage } from "next"
import Image, { StaticImageData } from "next/image"
import { FiExternalLink, FiLink } from "react-icons/fi"
import Meta from "lib/meta"
import Paper from "lib/paper"
import styles from "styles/projects/index.module.css"

// Images
import memento from "public/projects/memento.webp"
import yy from "public/projects/yy.webp"
import stats from "public/projects/stats.webp"
import status from "public/projects/status.webp"
import tasks from "public/projects/tasks.webp"

const Projects: NextPage = () => {
    return (
        <div>
            <Meta title="Проекты" />

            <Paper>
                <ProjectName name="YY Studios" href="https://yy-studios.ru" />
                <ProjectImage src={yy} />
                <p>Сайт агенства и платформа для художников.</p>
                <ProjectLink href="https://github.com/alt-web/yy">
                    Github
                </ProjectLink>
            </Paper>

            <Paper>
                <ProjectName
                    name="Memento"
                    href="https://memento.comfycamp.space"
                />
                <ProjectImage src={memento} />
                Экспериментальная социальная сеть. Каждый пользователь может
                загрузить лишь 24 фотографии.
                <ProjectLink href="https://github.com/ordinary-dev/memento">
                    Github
                </ProjectLink>
            </Paper>

            <Paper>
                <ProjectName
                    name="Alt Web Stats"
                    href="https://stats.altweb.tech"
                />
                <ProjectImage src={stats} />
                Наш сервис для сбора статистики о посетителях сайтов. В основе
                находится Shynet - альтернатива Google Analytics с открытым
                исходным кодом.
            </Paper>

            <Paper>
                <ProjectName
                    name="Alt Web Status"
                    href="https://status.altweb.tech"
                />
                <ProjectImage src={status} />
                Круглосуточный мониторинг всех сервисов при помощи Gatus.
            </Paper>

            <Paper>
                <ProjectName
                    name="Alt Web Tasks"
                    href="https://tasks.altweb.tech"
                />
                <ProjectImage src={tasks} />
                Платформа для управления задачами. Вы можете легко создать
                список необходимых изменений и отслеживать прогресс.
            </Paper>
        </div>
    )
}

const ProjectName = (props: { name: string; href?: string }) => {
    if (props.href)
        return (
            <a href={props.href} target="_blank" rel="noreferrer">
                <h3 className={styles.projectName}>
                    {props.name}
                    <FiExternalLink />
                </h3>
            </a>
        )
    return <h3>{props.name}</h3>
}

const ProjectImage = (props: { src: StaticImageData }) => {
    return (
        <div className={styles.projectImage}>
            <Image src={props.src} alt="Project" placeholder="blur" fill />
        </div>
    )
}

const ProjectLink = (props: { children: string; href: string }) => {
    return (
        <p className={styles.link}>
            <FiLink />{" "}
            <a href={props.href} target="_blank" rel="noreferrer">
                {props.children}
            </a>
        </p>
    )
}

export default Projects
