import type { NextPage } from "next"
import Link from "next/link"
import Head from "next/head"
import useSWR from "swr"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { withIronSessionSsr } from "iron-session/next"
import { Heading, Flex, Button, Box } from "@chakra-ui/react"
import { sessionOptions } from "../../lib/session"
import { ProjectsAPI } from "../api/projects"

type PageProps = {
    isAuthorized: boolean
}

export const getServerSideProps = withIronSessionSsr(async context => {
    const user = context.req.session.user

    const props: PageProps = {
        isAuthorized: user !== undefined,
    }
    return { props }
}, sessionOptions)

const Projects: NextPage<PageProps> = props => {
    const { data, error } = useSWR<ProjectsAPI, Error>("/api/projects")
    const router = useRouter()

    useEffect(() => {
        if (!props.isAuthorized) {
            setTimeout(() => router.push("/login"), 1000)
        }
    }, [props.isAuthorized])

    const newProject = () => {
        router.push("/projects/new")
    }

    if (error) return <div>Error</div>
    if (!data) return <div>Loading</div>

    const listOfProjects = data.projects ? (
        data.projects.map(project => (
            <Project id={project.id} key={project.id}>
                {project.name}
            </Project>
        ))
    ) : (
        <div>Error</div>
    )

    return (
        <Flex
            justify="center"
            align="center"
            direction="column"
            gap="1em"
            w="100%"
            bgColor="#181720"
            minH="100vh"
            color="white">
            <Head>
                <title>Projects | Alt Web</title>
            </Head>
            <Heading>Your projects</Heading>
            {listOfProjects}
            {data.projects && data.projects.length === 0 && (
                <div>You have no projects</div>
            )}
            <Button onClick={newProject} color="black">
                Create project
            </Button>
        </Flex>
    )
}

const Project = (props: { id: number; children: string }) => {
    return (
        <Link href={`/projects/${props.id}`} passHref>
            <a>
                <Box>{props.children}</Box>
            </a>
        </Link>
    )
}

export default Projects
