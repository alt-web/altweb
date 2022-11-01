import { NextApiRequest, NextApiResponse } from "next"
import { withIronSessionApiRoute } from "iron-session/next"
import { Project } from "@prisma/client"
import { prisma } from "../../../lib/prisma"
import { sessionOptions } from "../../../lib/session"
import { getErrorMessage } from "../../../lib/error"

export default withIronSessionApiRoute(endpoint, sessionOptions)

export type ProjectsAPI = {
    msg?: string
    project?: Project
    isAdmin?: boolean
}

async function endpoint(
    req: NextApiRequest,
    res: NextApiResponse<ProjectsAPI>
) {
    if (req.method === "GET") await getProjects(req, res)
    else if (req.method === "PUT") await updateProject(req, res)
    else res.status(405).json({ msg: "Method is not supported" })
}

const getProjects = async (
    req: NextApiRequest,
    res: NextApiResponse<ProjectsAPI>
) => {
    try {
        if (req.query.id === undefined) throw new Error("Id is undefined")
        if (!req.session.user) throw new Error("You are not authorized")
        const project = await prisma.project.findMany({
            where: {
                id: parseInt(req.query.id.toString()),
                owner: {
                    email: req.session.user.login,
                },
            },
            include: {
                links: true,
            },
        })
        if (!project || project.length !== 1)
            throw new Error("Can't find this project")
        res.status(200).json({
            project: project[0],
            isAdmin: req.session.user.isAdmin,
        })
    } catch (err) {
        const msg =
            err instanceof Error && err.message ? err.message : "Unknown error"
        res.status(400).json({ msg })
    }
}

const updateProject = async (
    req: NextApiRequest,
    res: NextApiResponse<ProjectsAPI>
) => {
    try {
        if (req.query.id === undefined) throw new Error("Id is undefined")
        if (!req.session.user) throw new Error("You are not authorized")
        if (!req.body.name) throw new Error("Please provide property name")
        if (!req.body.value) throw new Error("Please provide property value")

        const where = {
            id: parseInt(req.query.id.toString()),
            owner: {
                email: req.session.user.login,
            },
        }

        if (req.body.name === "name") {
            const updatedProject = await prisma.project.updateMany({
                where,
                data: {
                    name: req.body.value,
                },
            })
            if (!updatedProject) throw new Error("Can't update your project")
            res.status(200).json({})
            return
        }

        if (req.body.name === "description") {
            const updatedProject = await prisma.project.updateMany({
                where,
                data: {
                    description: req.body.value,
                },
            })
            if (!updatedProject) throw new Error("Can't update your project")
            res.status(200).json({})
            return
        }

        if (req.body.name === "approved") {
            const updatedProject = await prisma.project.updateMany({
                where,
                data: {
                    approved: req.body.value,
                },
            })
            if (!updatedProject) throw new Error("Can't update your project")
            res.status(200).json({})
            return
        }

        throw new Error("Unknown property name")
    } catch (err) {
        const msg = getErrorMessage(err)
        res.status(400).json({ msg })
    }
}
