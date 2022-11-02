import type { NextPage } from "next"
import Link from "next/link"
import Image, { StaticImageData } from "next/image"
import Head from "next/head"
import { ExternalLinkIcon, LinkIcon } from "@chakra-ui/icons"
import Paper from "lib/paper"
import memento from "public/projects/memento.webp"
import yy from "public/projects/yy.webp"
import styles from "styles/projects/index.module.css"

const Projects: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Проекты - Alt Web</title>
            </Head>

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
                Экспериментальная социальная сеть
                <ProjectLink href="https://github.com/ordinary-dev/memento">
                    Github
                </ProjectLink>
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
                <h3 className={styles.projectName}>
                    {props.name}
                    <ExternalLinkIcon />
                </h3>
            </Link>
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
            <LinkIcon />{" "}
            <a href={props.href} target="_blank" rel="noreferrer">
                {props.children}
            </a>
        </p>
    )
}

export default Projects
