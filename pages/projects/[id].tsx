import type { NextPage } from "next"
import { useRouter } from "next/router"
import Head from "next/head"
import useSWR, { useSWRConfig } from "swr"
import Link from "next/link"
import { ReactNode, useState } from "react"
import { ProjectsAPI } from "../api/projects/[id]"
import Overview from "../../lib/project/overview"
import Tasks from "../../lib/project/tasks"
import Payments from "../../lib/project/payments"
import styles from "../../styles/projects/id.module.css"

const ProjectView: NextPage = () => {
    const router = useRouter()
    const [tabId, setTabId] = useState<"overview"|"tasks"|"payments">("overview")
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
            <div className={styles.tabs}>
                <Tab isActive={tabId === "overview"} setActive={() => setTabId("overview")}>Overview</Tab>
                <Tab isActive={tabId === "tasks"} setActive={() => setTabId("tasks")}>Tasks</Tab>
                <Tab isActive={tabId === "payments"} setActive={() => setTabId("payments")}>Payments</Tab>
            </div>
            { tabId === "overview" && <Overview name={data.project.name} 
            description={data.project.description} createdAt={data.project.createdAt} approved={data.project.approved}/> }
            { tabId === "tasks" && <Tasks
                projectId={data.project.id}
                taskList={data.project.tasks}
                onUpdate={update}
            /> }
            { tabId === "payments" && <Payments /> }
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

const Tab = ({children, isActive, setActive}: {children: string, isActive: boolean, setActive: () => void}) => {
    if (isActive) return (
        <button className={styles.activeBtn}>{children}</button>
    )

    return (
        <button onClick={setActive} className={styles.inactiveBtn}>{children}</button>
    )
}

export default ProjectView
