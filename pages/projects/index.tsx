import type { NextPage } from "next"
import Link from "next/link"
import Head from "next/head"
import useSWR from "swr"
import { useRouter } from "next/router"
import { useEffect, ReactNode } from "react"
import { withIronSessionSsr } from "iron-session/next"
import { AddIcon } from "@chakra-ui/icons"
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

    if (error) return <Layout>Error</Layout>
    if (!data) return <Layout>Loading</Layout>
    if (!data.projects) return <Layout>Error</Layout>

    const listOfProjects = data.projects.map(project => (
        <Project id={project.id} key={project.id}>
            {project.name}
        </Project>
    ))

    return (
        <Layout>
            <h2>My projects</h2>
            <div className={styles.list}>
                {listOfProjects}
                <button onClick={newProject}>
                    <AddIcon />
                </button>
            </div>
        </Layout>
    )
}

const Layout = ({ children }: { children: ReactNode }) => (
    <div className={styles.container}>
        <Head>
            <title>Projects | Alt Web</title>
        </Head>
        {children}
    </div>
)

const Project = (props: { id: number; children: string }) => {
    return (
        <div className={styles.project}>
            <Link href={`/projects/${props.id}`} passHref>
                <a>{props.children}</a>
            </Link>
        </div>
    )
}

export default Projects
