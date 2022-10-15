import type { NextPage } from "next"
import { useRouter } from "next/router"
import Head from "next/head"
import { Button } from "@chakra-ui/react"

const NewProject: NextPage = () => {
    const router = useRouter()
    const goBack = () => {
        router.push("/projects")
    }
    return (
        <div>
            <Head>
                <title>New project | Alt Web</title>
            </Head>
            <Button onClick={goBack}>Cancel</Button>
        </div>
    )
}

export default NewProject
