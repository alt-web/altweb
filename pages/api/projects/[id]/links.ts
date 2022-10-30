import { NextApiRequest, NextApiResponse } from "next"
import { withIronSessionApiRoute } from "iron-session/next"
import { Link } from "@prisma/client"
import { prisma } from "../../../../lib/prisma"
import { sessionOptions } from "../../../../lib/session"
import { getErrorMessage } from "../../../../lib/error"

export default withIronSessionApiRoute(parseRequestMethod, sessionOptions)

export type LinksApi = {
    links?: Link[]
    msg?: string
}

async function parseRequestMethod(
    req: NextApiRequest,
    res: NextApiResponse<LinksApi>
) {
    if (req.method === "GET") await getLinks(req, res)
    else if (req.method === "POST") await addLink(req, res)
    else if (req.method === "DELETE") await deleteLink(req, res)
    else res.status(400).json({ msg: "Request method is not supported" })
}

const getLinks = async (
    req: NextApiRequest,
    res: NextApiResponse<LinksApi>
) => {
    try {
        if (!req.session.user) throw new Error("You are not authorized")
        if (!req.query.id) throw new Error("Id is undefined")

        const id = parseInt(req.query.id.toString())

        const project = await prisma.project.findUnique({
            where: {
                id,
            },
            include: {
                owner: true,
            },
        })
        if (project === null) throw new Error("Can't find project")

        if (
            !req.session.user.isAdmin &&
            req.session.user.login !== project.owner.email
        )
            throw new Error("You are not the owner")
        const links = await prisma.link.findMany({
            where: {
                project: {
                    id,
                },
            },
        })
        if (links === null) throw new Error("Can't find links")

        res.json({ links })
    } catch (err) {
        const msg = getErrorMessage(err)
        res.status(400).json({ msg })
    }
}

const addLink = async (req: NextApiRequest, res: NextApiResponse<LinksApi>) => {
    try {
        if (!req.session.user) throw new Error("You are not authorized")
        if (!req.query.id) throw new Error("Id is undefined")
        if (!req.body.name) throw new Error("Name is undefined")
        if (!req.body.href) throw new Error("Href is undefined")

        const id = parseInt(req.query.id.toString())

        const project = await prisma.project.findUnique({
            where: {
                id,
            },
            include: {
                owner: true,
            },
        })
        if (project === null) throw new Error("Can't find project")
        if (
            !req.session.user.isAdmin &&
            req.session.user.login !== project.owner.email
        )
            throw new Error("You are not the owner")

        const link = await prisma.link.create({
            data: {
                project: {
                    connect: {
                        id: id,
                    },
                },
                name: req.body.name,
                href: req.body.href,
            },
        })
        if (link === null) throw new Error("Can't create a link")

        res.json({ links: [link] })
    } catch (err) {
        const msg = getErrorMessage(err)
        res.status(400).json({ msg })
    }
}

const deleteLink = async (
    req: NextApiRequest,
    res: NextApiResponse<LinksApi>
) => {
    try {
        if (!req.session.user) throw new Error("You are not authorized")
        if (!req.query.id) throw new Error("Id is undefined")

        const id = parseInt(req.query.id.toString())

        const project = await prisma.project.findUnique({
            where: {
                id,
            },
            include: {
                owner: true,
            },
        })
        if (project === null) throw new Error("Can't find project")
        if (
            !req.session.user.isAdmin &&
            req.session.user.login !== project.owner.email
        )
            throw new Error("You are not the owner")

        const link = await prisma.link.delete({
            where: {
                id: req.body.id,
            },
        })
        if (link === null) throw new Error("Can't delete link")

        res.json({ links: [link] })
    } catch (err) {
        const msg = getErrorMessage(err)
        res.status(400).json({ msg })
    }
}
