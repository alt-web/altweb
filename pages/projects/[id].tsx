import type { NextPage } from "next"
import { useRouter } from "next/router"
import Head from "next/head"
import useSWR, { useSWRConfig } from "swr"
import Link from "next/link"
import { IconButton, Button, Flex, Box, Heading } from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { ProjectsAPI } from "../api/projects/[id]"
import Tasks from "../../lib/project/tasks"

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
        <Box p="1em">
            <Head>
                <title>Project | Alt Web</title>
            </Head>
            <Flex gap="1em" align="center">
                <Link href="/projects" passHref>
                    <a>
                        <IconButton
                            aria-label="Go back"
                            icon={<ArrowBackIcon />}
                        />
                    </a>
                </Link>
                <Heading>{data.project.name} - settings</Heading>
            </Flex>
            <Tasks
                projectId={data.project.id}
                taskList={data.project.tasks}
                onUpdate={update}
            />
        </Box>
    )
}

export default ProjectView
