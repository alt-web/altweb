import { NextApiRequest, NextApiResponse } from "next"
import { withIronSessionApiRoute } from "iron-session/next"
import { Project } from "@prisma/client"
import { prisma } from "../../../lib/prisma"
import { sessionOptions } from "../../../lib/session"

export default withIronSessionApiRoute(endpoint, sessionOptions)

export type ProjectsAPI = {
    msg?: string
    projects?: Project[]
}

async function endpoint(
    req: NextApiRequest,
    res: NextApiResponse<ProjectsAPI>
) {
    if (req.method === "GET") await getProjects(req, res)
    else if (req.method === "POST") await addProject(req, res)
    else res.status(400).json({ msg: "Request method is not supported" })
}

const getProjects = async (
    req: NextApiRequest,
    res: NextApiResponse<ProjectsAPI>
) => {
    try {
        if (!req.session.user) throw new Error("You are not authorized")
        const projects = await prisma.project.findMany({
            where: {
                owner: {
                    email: req.session.user.login,
                },
            },
        })
        if (projects === undefined)
            throw new Error("Can't get your list of projects")
        res.send({ projects: projects })
    } catch (err) {
        const msg =
            err instanceof Error && err.message ? err.message : "Unknown error"
        res.status(400).send({ msg })
    }
}

const addProject = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (!req.session.user) throw new Error("You are not authorized")
        if (!req.body.name) throw new Error("Please provide project name")
        const project = await prisma.project.create({
            data: {
                name: req.body.name,
                owner: {
                    connect: {
                        email: req.session.user.login,
                    },
                },
            },
        })
        if (!project) throw new Error("Can't create new project")
        res.status(200).send({ msg: "ok" })
    } catch (err) {
        const msg =
            err instanceof Error && err.message ? err.message : "Unknown error"
        res.status(400).send({ msg })
    }
}
