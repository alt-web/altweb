import type { NextPage } from "next"
import { useRouter } from "next/router"
import Head from "next/head"
import useSWR from "swr"
import Link from "next/link"
import { ProjectsAPI } from "../api/projects/[id]"

const ProjectView: NextPage = () => {
    const router = useRouter()
    const { data, error } = useSWR<ProjectsAPI>(
        router.query.id ? `/api/projects/${router.query.id}` : null
    )

    if (!router.query.id || error) return <div>Error</div>

    if (!data) return <div>Loading</div>

    if (!data.project) return <div>Project is undefined</div>

    return (
        <div>
            <Head>
                <title>Project | Alt Web</title>
            </Head>
            <div>Project id: {router.query.id}</div>
            <div>Project name: {data.project.name}</div>
            <Link href="/projects" passHref>
                <a>Go back</a>
            </Link>
        </div>
    )
}

export default ProjectView
