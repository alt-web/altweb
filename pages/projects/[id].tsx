import type { NextPage } from "next"
import { useRouter } from "next/router"
import Head from "next/head"
import useSWR, { useSWRConfig } from "swr"
import Link from "next/link"
import { ReactNode } from "react"
import { ProjectsAPI } from "../api/projects/[id]"
import Tasks from "../../lib/project/tasks"
import styles from "../../styles/projects/id.module.css"

const ProjectView: NextPage = () => {
    const router = useRouter()
    const { data, error } = useSWR<ProjectsAPI>(
        router.query.id ? `/api/projects/${router.query.id}` : null
    )
    const { mutate } = useSWRConfig()
    const update = () => {
        if (router.query.id) mutate(`/api/projects/${router.query.id}`)
    }

    if (!router.query.id || error) return <Layout>Error</Layout>
    if (!data) return <Layout>Loading</Layout>
    if (!data.project) return <Layout>Project is undefined</Layout>

    return (
        <Layout>
            <h2>
                <Link href="/projects" passHref>
                    <a>My projects</a>
                </Link>{" "}
                / {data.project.name}
            </h2>
            <Tasks
                projectId={data.project.id}
                taskList={data.project.tasks}
                onUpdate={update}
            />
        </Layout>
    )
}

const Layout = ({ children }: { children: ReactNode }) => (
    <div className={styles.container}>
        <Head>
            <title>Project | Alt Web</title>
        </Head>
        {children}
    </div>
)

export default ProjectView
