import type { NextPage } from "next"
import Link from "next/link"
import Head from "next/head"
import useSWR from "swr"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { withIronSessionSsr } from "iron-session/next"
import { sessionOptions } from "../../lib/session"
import { ProjectsAPI } from "../api/projects"
import styles from "../../styles/projects/index.module.css"

type PageProps = {
    isAuthorized: boolean
}

export const getServerSideProps = withIronSessionSsr(async context => {
    const user = context.req.session.user

    const props: PageProps = {
        isAuthorized: user !== undefined,
    }
    return { props }
}, sessionOptions)

const Projects: NextPage<PageProps> = props => {
    const { data, error } = useSWR<ProjectsAPI, Error>("/api/projects")
    const router = useRouter()

    useEffect(() => {
        if (!props.isAuthorized) {
            setTimeout(() => router.push("/login"), 1000)
        }
    }, [props.isAuthorized])

    const newProject = () => {
        router.push("/projects/new")
    }

    if (error) return <div>Error</div>
    if (!data) return <div>Loading</div>

    const listOfProjects = data.projects ? (
        data.projects.map(project => (
            <Project id={project.id} key={project.id}>
                {project.name}
            </Project>
        ))
    ) : (
        <div>Error</div>
    )

    return (
        <div className={styles.container}>
            <Head>
                <title>Projects | Alt Web</title>
            </Head>
            <h2>Your projects</h2>
            {listOfProjects}
            {data.projects && data.projects.length === 0 && (
                <div>You have no projects</div>
            )}
            <button onClick={newProject}>
                Create project
            </button>
        </div>
    )
}

const Project = (props: { id: number; children: string }) => {
    return (
        <Link href={`/projects/${props.id}`} passHref>
            <a>
                <div>{props.children}</div>
            </a>
        </Link>
    )
}

export default Projects
