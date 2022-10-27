import type { NextPage } from "next"
import { useRouter } from "next/router"
import Head from "next/head"
import useSWR, { useSWRConfig } from "swr"
import Link from "next/link"
import { ReactNode, useState } from "react"
import { ProjectsAPI } from "../api/projects/[id]"
import Overview from "../../lib/project/overview"
import Payments from "../../lib/project/payments"
import styles from "../../styles/overview/id.module.css"

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
            <div className={styles.tabs}>
                <Tab name="К СПИСКУ ПРОЕКТОВ" href="/overview" />
                <Tab name="ИНФОРМАЦИЯ" href="" />
                <Tab name="ПЛАТЕЖИ" href="payments" />
            </div>
            <Overview
                name={data.project.name}
                description={data.project.description}
                createdAt={data.project.createdAt}
                approved={data.project.approved}
                id={data.project.id}
            />
            <Payments />
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

const Tab = (props: { name: string; href: string }) => {
    const router = useRouter()

    const href = props.href.startsWith("/")
        ? props.href
        : `/overview/${router.query.id}/${props.href}`

    return (
        <Link href={href} passHref>
            {props.name}
        </Link>
    )
}

export default ProjectView
