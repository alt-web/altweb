import { NextApiRequest, NextApiResponse } from "next"
import { withIronSessionApiRoute } from "iron-session/next"
import { prisma } from "../../../lib/prisma"
import { sessionOptions } from "../../../lib/session"

export default withIronSessionApiRoute(endpoint, sessionOptions)

export type TasksAPI = {
    msg?: string
}

async function endpoint(req: NextApiRequest, res: NextApiResponse<TasksAPI>) {
    if (req.method === "POST") await addTask(req, res)
    else res.status(400).json({ msg: "Request method is not supported" })
}

const addTask = async (req: NextApiRequest, res: NextApiResponse<TasksAPI>) => {
    try {
        if (!req.session.user) throw new Error("You are not authorized")
        if (!req.body.projectId) throw new Error("Please provide project id")
        if (!req.body.title) throw new Error("Please provide task title")

        const project = await prisma.project.findMany({
            where: {
                id: req.body.projectId,
                users: {
                    some: {
                        user: {
                            email: req.session.user.email,
                        },
                    },
                },
            },
        })
        if (!project || project.length !== 1)
            throw new Error("Can't find project")

        const task = await prisma.task.create({
            data: {
                title: req.body.title,
                project: {
                    connect: {
                        id: req.body.projectId,
                    },
                },
            },
        })
        if (!task) throw new Error("Can't create new task")
        res.status(200).send({ msg: "ok" })
    } catch (err) {
        const msg =
            err instanceof Error && err.message ? err.message : "Unknown error"
        res.status(400).send({ msg })
    }
}
