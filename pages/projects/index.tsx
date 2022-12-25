import type { NextPage } from "next"
import Image, { StaticImageData } from "next/image"
import { ReactNode } from "react"
import {
    FiLink,
    FiImage,
    FiCamera,
    FiBarChart2,
    FiActivity,
} from "react-icons/fi"
import Meta from "lib/meta"
import Paper from "lib/paper"
import styles from "styles/projects/index.module.css"

// Images
import memento from "public/projects/memento.webp"
import yy from "public/projects/yy.webp"
import stats from "public/projects/stats.webp"
import status from "public/projects/status.webp"

const Projects: NextPage = () => {
    return (
        <div>
            <Meta title="Проекты" />

            <Paper>
                <ProjectName icon={<FiImage />} name="YY Studios" />
                <ProjectImage src={yy} />
                <p>Сайт агенства и платформа для художников.</p>
                <ProjectLink href="https://github.com/alt-web/yy">
                    Github
                </ProjectLink>
            </Paper>

            <Paper>
                <ProjectName icon={<FiCamera />} name="Memento" />
                <ProjectImage src={memento} />
                <p>
                    Экспериментальная социальная сеть. Каждый пользователь может
                    загрузить лишь 24 фотографии.
                </p>
                <ProjectLink href="https://github.com/ordinary-dev/memento">
                    Github
                </ProjectLink>
            </Paper>

            <Paper>
                <ProjectName icon={<FiBarChart2 />} name="Alt Web Stats" />
                <ProjectImage src={stats} />
                <p>
                    Наш сервис для сбора статистики о посетителях сайтов. В
                    основе находится Shynet - альтернатива Google Analytics с
                    открытым исходным кодом.
                </p>
            </Paper>

            <Paper>
                <ProjectName icon={<FiActivity />} name="Alt Web Status" />
                <ProjectImage src={status} />
                <p>Круглосуточный мониторинг всех сервисов.</p>
            </Paper>
        </div>
    )
}

const ProjectName = (props: {
    icon: ReactNode
    name: string
    href?: string
}) => {
    return (
        <h3 className={styles.projectName}>
            {props.icon}
            <span>{props.name}</span>
        </h3>
    )
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
