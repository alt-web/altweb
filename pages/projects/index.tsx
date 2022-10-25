import type { NextPage } from "next"
import Link from "next/link"
import Image, { StaticImageData } from "next/image"
import Head from "next/head"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import Paper from "../../lib/paper"
import memento from "../../public/projects/memento.webp"
import yy from "../../public/projects/yy.webp"
import styles from "../../styles/projects/index.module.css"

const Projects: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Проекты - Alt Web</title>
            </Head>

            <Paper>
                <ProjectName name="YY Studios" href="https://yy-studios.ru" />
                <ProjectImage src={yy} />
                Сайт агенства и платформа для художников
            </Paper>

            <Paper>
                <ProjectName
                    name="Memento"
                    href="https://memento.comfycamp.space"
                />
                <ProjectImage src={memento} />
                Экспериментальная социальная сеть
            </Paper>

            <Paper>
                <ProjectName name="Nullchan" />
                Новый форум (в разработке)
            </Paper>
        </div>
    )
}

const ProjectName = (props: { name: string; href?: string }) => {
    if (props.href)
        return (
            <Link href={props.href} passHref>
                <a target="_blank" rel="noreferer">
                    <h3 className={styles.projectName}>
                        {props.name}
                        <ExternalLinkIcon />
                    </h3>
                </a>
            </Link>
        )
    return <h3>{props.name}</h3>
}

const ProjectImage = (props: { src: StaticImageData }) => {
    return (
        <div className={styles.projectImage}>
            <Image
                src={props.src}
                alt="Project"
                layout="fill"
                objectFit="cover"
                placeholder="blur"
            />
        </div>
    )
}

export default Projects
