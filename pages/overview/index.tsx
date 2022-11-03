import { useSWRConfig } from "swr"
import useSWRImmutable from "swr/immutable"
import Link from "next/link"
import { GetServerSideProps } from "next"
import { useState, ReactNode, FormEvent } from "react"
import { withIronSessionSsr } from "iron-session/next"
import Meta from "lib/meta"
import Paper from "lib/paper"
import { sessionOptions } from "lib/session"
import { ProjectsAPI } from "pages/api/projects"
import styles from "styles/overview/index.module.css"

const getSession: GetServerSideProps = async context => {
    const isAuthorized = !!context.req.session.user
    if (!isAuthorized)
        return {
            redirect: {
                destination: "/auth",
                permanent: false,
            },
        }
    return { props: {} }
}

export const getServerSideProps = withIronSessionSsr(getSession, sessionOptions)

const Overview = () => {
    const { data, error } = useSWRImmutable<ProjectsAPI, Error>("/api/projects")

    if (error) return <Layout>Error</Layout>
    if (!data || data.projects === undefined) return <Layout>Loading</Layout>

    return (
        <Layout>
            <h2>Ваши проекты</h2>
            {data.projects.map(project => (
                <Paper key={project.id}>
                    <Link href={`/overview/${project.id}`} passHref>
                        <h2>{project.name.toUpperCase()}</h2>
                    </Link>
                    <div>
                        Статус: {project.approved ? "одобрен" : "не одобрен"}
                    </div>
                </Paper>
            ))}
            {data.projects.length === 0 && <Paper>У вас нет проектов</Paper>}
            <NewProject />
        </Layout>
    )
}

const Layout = ({ children }: { children: ReactNode }) => (
    <div className={styles.container}>
        <Meta title="Ваши проекты" />
        {children}
    </div>
)

const NewProject = () => {
    const { mutate } = useSWRConfig()
    const [error, setError] = useState("")

    const setErrorMessage = (msg: string) => {
        setError(msg)
    }
    const onSuccess = () => {
        mutate("/api/projects")
    }

    return (
        <form onSubmit={e => submitForm(e, setErrorMessage, onSuccess)}>
            <h3>Добавить проект</h3>
            <div className={styles.list}>
                <input
                    required
                    name="projectName"
                    placeholder="Имя проекта"
                    type="text"
                />
                <button type="submit">Создать</button>
            </div>
            <div className={styles.error}>{error}</div>
        </form>
    )
}

interface ProjectForm extends HTMLFormElement {
    projectName: HTMLInputElement
}

const submitForm = async (
    e: FormEvent,
    setError: (arg0: string) => void,
    onSuccess: () => void
) => {
    e.preventDefault()
    setError("")
    const target = e.target as ProjectForm
    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ name: target.projectName.value }),
    }
    const response = await fetch("/api/projects", options)
    if (response.status !== 200) setError("Ошибка при создании проекта")
    else {
        target.reset()
        onSuccess()
    }
}

export default Overview
