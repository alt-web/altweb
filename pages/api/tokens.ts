import { NextApiRequest, NextApiResponse } from "next"
import { withIronSessionApiRoute } from "iron-session/next"
import { Token } from "@prisma/client"
import { prisma } from "../../lib/prisma"
import { sessionOptions } from "../../lib/session"
import { getErrorMessage } from "../../lib/error"

export default withIronSessionApiRoute(parseRequestMethod, sessionOptions)

export type TokenApi = {
    tokens: Token[]
    msg?: string
}

async function parseRequestMethod(
    req: NextApiRequest,
    res: NextApiResponse<TokenApi>
) {
    if (req.method === "GET") await getTokens(req, res)
    else if (req.method === "POST") await addToken(req, res)
    else res.status(400).json({ tokens: [], msg: "Request method is not supported" })
}

const getTokens = async (req: NextApiRequest, res: NextApiResponse<TokenApi>) => {
    try {
        if (!req.session.user) throw new Error("You are not authorized")
        if (!req.session.user.isAdmin) throw new Error("You are not the admin")
        const tokens = await prisma.token.findMany({})
        res.json({ tokens })
    }
    catch(err) {
        const msg = getErrorMessage(err)
        res.status(400).json({ tokens: [], msg })
    }
}

const addToken = async(req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (!req.session.user) throw new Error("You are not authorized")
        if (!req.session.user.isAdmin) throw new Error("You are not the admin")
        if (!req.body.id) throw new Error("Token id is undefined")
        if (!req.body.value) throw new Error("Token value is undefined")
        const newToken = await prisma.token.create({
            data: {
                id: req.body.id,
                value: req.body.value
            }
        })
        if (!newToken) throw new Error("Can't create new token")
        res.json({ tokens: [newToken] })
    }
    catch(err) {
        const msg = getErrorMessage(err)
        res.status(400).json({ tokens: [], msg })
    }
}
