import type { NextPage } from "next"
import { useRouter } from "next/router"
import Head from "next/head"
import { Button } from "@chakra-ui/react"
import { Heading, Input, FormControl, FormLabel } from "@chakra-ui/react"
import { FormEvent, useState } from "react"

const NewProject: NextPage = () => {
    const router = useRouter()
    const [error, setError] = useState("")
    const goBack = () => {
        router.push("/projects")
    }
    const setErrorMessage = (msg: string) => {
        setError(msg)
    }
    const onSuccess = () => {
        router.push("/projects")
    }
    return (
        <div>
            <Head>
                <title>New project | Alt Web</title>
            </Head>
            <Heading>New project</Heading>
            <form onSubmit={e => submitForm(e, setErrorMessage, onSuccess)}>
                <Input
                    required
                    name="projectName"
                    variant="filled"
                    placeholder="Project name"
                    type="text"
                />
                <Button onClick={goBack}>Cancel</Button>
                <Button type="submit" colorScheme="blue">
                    Create
                </Button>
                <div>{error}</div>
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
