import { NextApiRequest, NextApiResponse } from "next"
import { withIronSessionApiRoute } from "iron-session/next"
import { Task } from "@prisma/client"
import { prisma } from "../../../lib/prisma"
import { sessionOptions } from "../../../lib/session"

export default withIronSessionApiRoute(endpoint, sessionOptions)

export type TasksAPI = {
    msg?: string
    task?: Task
}

async function endpoint(req: NextApiRequest, res: NextApiResponse<TasksAPI>) {
    if (req.method === "GET") await getTask(req, res)
    else if (req.method === "DELETE") await deleteTask(req, res)
    else if (req.method === "PUT") await updateTask(req, res)
    else res.status(400).json({ msg: "Request method is not supported" })
}

const getTask = async (req: NextApiRequest, res: NextApiResponse<TasksAPI>) => {
    try {
        if (!req.query.id) throw new Error("Undefined id")
        if (!req.session.user) throw new Error("You are not authorized")
        const task = await prisma.task.findMany({
            where: {
                id: parseInt(req.query.id.toString()),
                project: {
                    users: {
                        some: {
                            user: { email: req.session.user.login },
                        },
                    },
                },
            },
        })
        if (!task || task.length !== 1) throw new Error("Can't find this task")
        res.status(200).json({ task: task[0] })
    } catch (err) {
        const msg =
            err instanceof Error && err.message ? err.message : "Unknown error"
        res.status(400).json({ msg })
    }
}

const deleteTask = async (
    req: NextApiRequest,
    res: NextApiResponse<TasksAPI>
) => {
    try {
        if (!req.query.id) throw new Error("Undefined id")
        if (!req.session.user) throw new Error("You are not authorized")
        const task = await prisma.task.deleteMany({
            where: {
                id: parseInt(req.query.id.toString()),
                project: {
                    users: {
                        some: {
                            user: {
                                email: req.session.user.login,
                            },
                        },
                    },
                },
            },
        })
        if (!task || task.count !== 1) throw new Error("Can't delete task")
        res.status(200).json({ msg: "ok" })
    } catch (err) {
        const msg =
            err instanceof Error && err.message ? err.message : "Unknown error"
        res.status(400).json({ msg })
    }
}

const updateTask = async (
    req: NextApiRequest,
    res: NextApiResponse<TasksAPI>
) => {
    try {
        if (!req.query.id) throw new Error("Undefined id")
        if (!req.session.user) throw new Error("You are not authorized")
        if (req.body.progress === undefined)
            throw new Error("Progress is undefined")
        const task = await prisma.task.updateMany({
            where: {
                id: parseInt(req.query.id.toString()),
                project: {
                    users: {
                        some: {
                            user: {
                                email: req.session.user.login,
                            },
                        },
                    },
                },
            },
            data: {
                progress: req.body.progress,
            },
        })
        if (!task || task.count !== 1) throw new Error("Can't update task")
        res.status(200).json({ msg: "ok" })
    } catch (err) {
        const msg =
            err instanceof Error && err.message ? err.message : "Unknown error"
        res.status(400).json({ msg })
    }
}
