import type { NextPage } from "next"
import { useRouter } from "next/router"
import Head from "next/head"
import { FormEvent, useState } from "react"
import styles from "../../styles/projects/new.module.css"
import Link from "next/link"

const NewProject: NextPage = () => {
    const router = useRouter()
    const [error, setError] = useState("")
    const setErrorMessage = (msg: string) => {
        setError(msg)
    }
    const onSuccess = () => {
        router.push("/projects")
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>New project | Alt Web</title>
            </Head>
            <h2>
                <Link href="/projects" passHref>
                    <a>My projects</a>
                </Link>{" "}
                / New project
            </h2>
            <form onSubmit={e => submitForm(e, setErrorMessage, onSuccess)}>
                <div className={styles.list}>
                    <input
                        required
                        name="projectName"
                        placeholder="Project name"
                        type="text"
                    />
                    <button type="submit">Create</button>
                </div>
                <div className={styles.error}>{error}</div>
            </form>
        </div>
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
    if (response.status !== 200) setError("request failed")
    else onSuccess()
}

export default NewProject
