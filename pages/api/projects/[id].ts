import { NextApiRequest, NextApiResponse } from "next"
import { withIronSessionApiRoute } from "iron-session/next"
import { Project } from "@prisma/client"
import { prisma } from "../../../lib/prisma"
import { sessionOptions } from "../../../lib/session"

export default withIronSessionApiRoute(endpoint, sessionOptions)

export type ProjectsAPI = {
    msg?: string
    project?: Project
}

async function endpoint(
    req: NextApiRequest,
    res: NextApiResponse<ProjectsAPI>
) {
    if (req.method === "GET") await getProjects(req, res)
    else res.status(400).json({ msg: "Request method is not supported" })
}

const getProjects = async (
    req: NextApiRequest,
    res: NextApiResponse<ProjectsAPI>
) => {
    try {
        if (!req.query.id) throw new Error("Undefined id")
        if (!req.session.user) throw new Error("You are not authorized")
        const project = await prisma.project.findMany({
            where: {
                id: parseInt(req.query.id.toString()),
                owner: {
                    email: req.session.user.login,
                },
            },
        })
        if (!project || project.length !== 1)
            throw new Error("Can't find this project")
        res.status(200).json({ project: project[0] })
    } catch (err) {
        const msg =
            err instanceof Error && err.message ? err.message : "Unknown error"
        res.status(400).json({ msg })
    }
}
