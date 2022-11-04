import type { NextPage } from "next"
import { useRouter } from "next/router"
import useSWR from "swr"
import { ReactNode } from "react"
import { ProjectsAPI } from "pages/api/projects/[id]"
import Meta from "lib/meta"
import Overview from "lib/project/overview"
import Links from "lib/project/links"
import styles from "styles/overview/id.module.css"
import Payments from "./[id]/payments"

const ProjectView: NextPage = () => {
    const router = useRouter()
    const { data, error } = useSWR<ProjectsAPI>(
        router.query.id ? `/api/projects/${router.query.id}` : null
    )

    if (!router.query.id || error) return <Layout>Error</Layout>
    if (!data) return <Layout>Loading</Layout>
    if (!data.project) return <Layout>Project is undefined</Layout>

    return (
        <Layout>
            <Overview
                name={data.project.name}
                description={data.project.description}
                approved={data.project.approved}
                id={data.project.id}
                isAdmin={data.isAdmin}
            />
            <Links />
            <Payments />
        </Layout>
    )
}

const Layout = ({ children }: { children: ReactNode }) => (
    <div className={styles.container}>
        <Meta title="Проект" />
        {children}
    </div>
)

export default ProjectView
