import { useSWRConfig } from "swr"
import useSWRImmutable from "swr/immutable"
import Head from "next/head"
import Link from "next/link"
import { useState, ReactNode, FormEvent } from "react"
import Paper from "../../lib/paper"
import { ProjectsAPI } from "../api/projects"
import styles from "../../styles/overview/index.module.css"

const Overview = () => {
    const { data, error } = useSWRImmutable<ProjectsAPI, Error>("/api/projects")

    if (error) return <Layout>Error</Layout>
    if (!data || !data.projects) return <Layout>Loading</Layout>

    return (
        <Layout>
            <h2>Ваши проекты</h2>
            {data.projects.map(project => (
                <Paper key={project.id}>
                    <Link href={`/overview/${project.id}`} passHref>
                        <a>
                            <h2>{project.name.toUpperCase()}</h2>
                        </a>
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
        <Head>
            <title>Ваши проекты - Alt Web</title>
        </Head>
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
