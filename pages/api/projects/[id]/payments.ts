import { NextApiRequest, NextApiResponse } from "next"
import { withIronSessionApiRoute } from "iron-session/next"
import { Payment } from "@prisma/client"
import { prisma } from "../../../../lib/prisma"
import { sessionOptions } from "../../../../lib/session"
import { getErrorMessage } from "../../../../lib/error"

export default withIronSessionApiRoute(parseRequestMethod, sessionOptions)

export type PaymentsApi = {
    payments?: Payment[],
    isAdmin?: boolean
    msg?: string
}

async function parseRequestMethod(
    req: NextApiRequest,
    res: NextApiResponse<PaymentsApi>
) {
    if (req.method === "GET") await getPayments(req, res)
    else if (req.method === "POST") await addPayment(req, res)
    else if (req.method === "DELETE") await deletePayment(req, res)
    else res.status(400).json({ msg: "Request method is not supported" })
}

const getPayments = async (req: NextApiRequest, res: NextApiResponse<PaymentsApi>) => {
    try {
        if (!req.session.user) throw new Error("You are not authorized")
        if (!req.query.id) throw new Error("Id is undefined")

        const id = parseInt(req.query.id.toString())

        const project = await prisma.project.findUnique({
            where: {
                id
            },
            include: {
                owner: true
            }
        })
        if (project === null) throw new Error("Can't find project")

        if (!req.session.user.isAdmin && req.session.user.login !== project.owner.email) throw new Error("You are not the owner")
        const payments = await prisma.payment.findMany({
            where: {
                project: {
                    id
                }
            }
        })
        if (payments === null) throw new Error("Can't find payments")

        res.json({ payments: payments, isAdmin: req.session.user.isAdmin })
    }
    catch(err) {
        const msg = getErrorMessage(err)
        res.status(400).json({ msg })
    }
}

const addPayment = async (req: NextApiRequest, res: NextApiResponse<PaymentsApi>) => {
    try {
        if (!req.session.user) throw new Error("You are not authorized")
        if (!req.session.user.isAdmin) throw new Error("You are not the admin")
        if (!req.query.id) throw new Error("Id is undefined")
        if (!req.body.name) throw new Error("Name is undefined")
        if (!req.body.price) throw new Error("Price is undefined")

        const id = parseInt(req.query.id.toString())

        const project = await prisma.project.findUnique({
            where: {
                id
            }
        })
        if (project === null) throw new Error("Can't find project")

        const payment = await prisma.payment.create({
            data: {
                project: {
                    connect: {
                        id: id
                    }
                },
                serviceName: req.body.name,
                price: req.body.price
            }
        })
        if (payment === null) throw new Error("Can't create a payment")

        res.json({ payments: [payment] })
    }
    catch(err) {
        const msg = getErrorMessage(err)
        res.status(400).json({ msg })
    }
}

const deletePayment = async (req: NextApiRequest, res: NextApiResponse<PaymentsApi>) => {
    try {
        if (!req.session.user) throw new Error("You are not authorized")
        if (!req.session.user.isAdmin) throw new Error("You are not the admin")
        if (!req.body.id) throw new Error("Id is undefined")

        const payment = await prisma.payment.delete({
            where: {
                id: req.body.id
            }
        })
        if (payment === null) throw new Error("Can't delete payment")

        res.json({ payments: [payment] })
    }
    catch(err) {
        const msg = getErrorMessage(err)
        res.status(400).json({ msg })
    }
}
