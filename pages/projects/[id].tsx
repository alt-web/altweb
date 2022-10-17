import type { NextPage } from "next"
import { useRouter } from "next/router"
import Head from "next/head"
import useSWR, { useSWRConfig } from "swr"
import Link from "next/link"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { ProjectsAPI } from "../api/projects/[id]"
import Tasks from "../../lib/project/tasks"
import styles from "../../styles/projects/id.module.css"

const ProjectView: NextPage = () => {
    const router = useRouter()
    const { data, error } = useSWR<ProjectsAPI>(
        router.query.id ? `/api/projects/${router.query.id}` : null
    )
    const { mutate } = useSWRConfig()
    const update = () => {
        if (router.query.id) mutate(`/api/projects/${router.query.id}`)
    }

    if (!router.query.id || error) return <div>Error</div>
    if (!data) return <div>Loading</div>
    if (!data.project) return <div>Project is undefined</div>

    return (
        <div className={styles.container}>
            <Head>
                <title>Project | Alt Web</title>
            </Head>
            <div className={styles.navigation}>
                <Link href="/projects" passHref>
                    <a>
                        <button>
                        <ArrowBackIcon />
                        </button>
                    </a>
                </Link>
                <h4>{data.project.name} - settings</h4>
            </div>
            <Tasks
                projectId={data.project.id}
                taskList={data.project.tasks}
                onUpdate={update}
            />
        </div>
    )
}

export default ProjectView
