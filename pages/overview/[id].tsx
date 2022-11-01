import type { NextPage } from "next"
import { useRouter } from "next/router"
import Head from "next/head"
import useSWR from "swr"
import { ReactNode } from "react"
import { ProjectsAPI } from "pages/api/projects/[id]"
import Overview from "lib/project/overview"
import Links from "lib/project/links"
import styles from "styles/overview/id.module.css"
import { Navigation } from "lib/ui/navigation"
import Payments from "./[id]/payments"

const P = () => {
    return (
        <Navigation
            tabs={["Информация", "Ссылки", "Платежи"]}
            panels={[
                <ProjectView key={0} />,
                <Links key={1} />,
                <Payments key={2} />,
            ]}
        />
    )
}

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
                createdAt={data.project.createdAt}
                approved={data.project.approved}
                id={data.project.id}
                isAdmin={data.isAdmin}
            />
        </Layout>
    )
}

const Layout = ({ children }: { children: ReactNode }) => (
    <div className={styles.container}>
        <Head>
            <title>Проект - Alt Web</title>
        </Head>
        {children}
    </div>
)

export default P
